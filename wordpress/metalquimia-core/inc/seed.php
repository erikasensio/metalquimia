<?php
defined( 'ABSPATH' ) || exit;

/**
 * Importa el contenido inicial de la web (páginas del Figma en todos los idiomas, menús,
 * ajustes globales e imágenes) desde seed/site.json y seed/images/.
 *
 *   wp mq seed            → crea lo que falta y actualiza las páginas importadas antes
 *   wp mq seed --only=home,contacto
 *   wp mq seed --lang=ca,de   → solo esos idiomas (los demás se buscan para enlazar las traducciones, sin tocarlos)
 *
 * También hay un botón en Herramientas → Contenido inicial.
 * Las páginas creadas a mano (sin la marca _mq_seed_key) nunca se tocan.
 */
final class MQ_Seed {
	private array $site;
	private array $ids = array(); // [key][lang] => post_id
	private array $log = array();

	public function __construct() {
		$json = file_get_contents( MQ_CORE_DIR . '/seed/site.json' );
		$this->site = json_decode( (string) $json, true ) ?: array();
	}

	public function run( array $only = array(), array $only_langs = array() ): array {
		if ( ! function_exists( 'pll_set_post_language' ) || ! function_exists( 'update_field' ) ) {
			return array( 'Faltan Polylang o Secure Custom Fields.' );
		}
		$langs = array_intersect( $this->site['languages'] ?? array(), mq_languages() );
		if ( ! $langs ) {
			return array( 'Crea antes los idiomas (' . implode( ', ', $this->site['languages'] ?? array() ) . ') en Idiomas → Idiomas.' );
		}

		// 1. Páginas vacías primero (para poder enlazarlas entre sí), luego su contenido.
		$pages = $this->site['pages'] ?? array();
		// Con --only=menus u options las páginas no se tocan: solo se buscan para poder enlazarlas.
		$touch = ! $only || array_diff( $only, array( 'menus', 'options' ) );
		$all   = $langs;
		if ( $only_langs ) {
			$langs = array_values( array_intersect( $langs, $only_langs ) );
		}
		foreach ( $pages as $page ) {
			foreach ( $all as $lang ) {
				if ( isset( $page[ $lang ] ) ) {
					$this->ids[ $page['key'] ][ $lang ] = $touch && in_array( $lang, $langs, true ) ? $this->ensure_page( $page, $lang ) : $this->find_page( $page['key'], $lang );
				}
			}
			$this->ids[ $page['key'] ] = array_filter( $this->ids[ $page['key'] ] ?? array() );
			if ( $touch && count( $this->ids[ $page['key'] ] ?? array() ) > 1 ) {
				pll_save_post_translations( $this->ids[ $page['key'] ] );
			}
		}
		foreach ( $pages as $page ) {
			if ( $only && ! in_array( $page['key'], $only, true ) ) {
				continue;
			}
			foreach ( $langs as $lang ) {
				$id = $this->ids[ $page['key'] ][ $lang ] ?? 0;
				if ( ! $id ) {
					continue;
				}
				$data     = $page[ $lang ];
				$sections = array();
				foreach ( $data['sections'] ?? array() as $section ) {
					$layout = $section['type'];
					unset( $section['type'] );
					$sections[] = array_merge( array( 'acf_fc_layout' => $layout ), $this->resolve( $section, $lang ) );
				}
				update_field( 'field_mq_sections', $sections, $id );
				update_field( 'field_mq_seo_title', $data['seo_title'] ?? '', $id );
				update_field( 'field_mq_seo_description', $data['seo_description'] ?? '', $id );
				if ( ! empty( $page['image'] ) ) {
					$thumb = $this->image_id( $page['image'], $lang );
					if ( $thumb ) {
						set_post_thumbnail( $id, $thumb );
					}
				}
				$this->log[] = "Página {$page['key']} ({$lang}): #{$id}";
			}
		}

		// 2. Portada.
		foreach ( $touch && ! $only_langs ? $pages : array() as $page ) {
			if ( ! empty( $page['front'] ) ) {
				$front = $this->ids[ $page['key'] ][ mq_default_language() ] ?? 0;
				if ( $front ) {
					update_option( 'show_on_front', 'page' );
					update_option( 'page_on_front', $front );
				}
			}
		}

		// --only=menus / --only=options importan solo eso (las claves que no son de página no casan con ninguna).
		if ( ! $only || in_array( 'options', $only, true ) ) {
			$this->options( $langs );
		}
		if ( ! $only || in_array( 'menus', $only, true ) ) {
			$this->menus( $langs );
		}
		return $this->log;
	}

	private function find_page( string $key, string $lang ): int {
		$found = get_posts(
			array(
				'post_type'      => 'page',
				'post_status'    => 'any',
				'posts_per_page' => 1,
				'fields'         => 'ids',
				'lang'           => $lang,
				'meta_key'       => '_mq_seed_key', // phpcs:ignore WordPress.DB.SlowDBQuery
				'meta_value'     => $key, // phpcs:ignore WordPress.DB.SlowDBQuery
			)
		);
		return (int) ( $found[0] ?? 0 );
	}

	private function ensure_page( array $page, string $lang ): int {
		$found = get_posts(
			array(
				'post_type'      => 'page',
				'post_status'    => 'any',
				'posts_per_page' => 1,
				'fields'         => 'ids',
				'lang'           => $lang,
				'meta_key'       => '_mq_seed_key', // phpcs:ignore WordPress.DB.SlowDBQuery
				'meta_value'     => $page['key'], // phpcs:ignore WordPress.DB.SlowDBQuery
			)
		);
		$data   = $page[ $lang ];
		$parent = ! empty( $page['parent'] ) ? ( $this->ids[ $page['parent'] ][ $lang ] ?? 0 ) : 0;
		$args   = array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => $data['title'],
			'post_name'   => $data['slug'] ?? sanitize_title( $data['title'] ),
			'post_parent' => $parent,
			'menu_order'  => (int) ( $page['order'] ?? 0 ),
		);
		if ( $found ) {
			$args['ID'] = $found[0];
			wp_update_post( $args );
			$id = $found[0];
		} else {
			$id = wp_insert_post( $args );
			update_post_meta( $id, '_mq_seed_key', $page['key'] );
		}
		pll_set_post_language( $id, $lang );
		// Al crearla aún no tenía idioma y WordPress le habrá puesto "-2" si la otra traducción usa el mismo slug.
		if ( get_post_field( 'post_name', $id ) !== $args['post_name'] ) {
			wp_update_post( array( 'ID' => $id, 'post_name' => $args['post_name'] ) );
		}
		return (int) $id;
	}

	/** Sustituye las referencias "@img:clave" y "@page:clave" por adjuntos y enlaces reales. */
	private function resolve( $value, string $lang ) {
		if ( is_string( $value ) ) {
			if ( str_starts_with( $value, '@img:' ) ) {
				return $this->image_id( substr( $value, 5 ), $lang ) ?: '';
			}
			if ( str_starts_with( $value, '@page:' ) ) {
				return $this->page_url( substr( $value, 6 ), $lang );
			}
			return $value;
		}
		if ( is_array( $value ) ) {
			return array_map( fn( $v ) => $this->resolve( $v, $lang ), $value );
		}
		return $value;
	}

	private function page_url( string $ref, string $lang ): string {
		[ $key, $hash ] = array_pad( explode( '#', $ref, 2 ), 2, '' );
		$id = $this->ids[ $key ][ $lang ] ?? 0;
		return $id ? get_permalink( $id ) . ( $hash ? '#' . $hash : '' ) : '#';
	}

	/** Sube a la biblioteca la imagen seed/images/<archivo> (una sola vez) y devuelve su ID. */
	private function image_id( string $slot, string $lang ): int {
		$def = $this->site['images'][ $slot ] ?? null;
		if ( ! $def ) {
			return 0;
		}
		$map = (array) get_option( 'mq_seed_images', array() );
		if ( ! empty( $map[ $slot ] ) && get_post( $map[ $slot ] ) ) {
			return (int) $map[ $slot ];
		}
		$file = MQ_CORE_DIR . '/seed/images/' . $def['file'];
		if ( ! file_exists( $file ) ) {
			return 0;
		}
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';
		$tmp = wp_tempnam( $def['file'] );
		copy( $file, $tmp );
		$id = media_handle_sideload( array( 'name' => $def['file'], 'tmp_name' => $tmp ), 0 );
		if ( is_wp_error( $id ) ) {
			$this->log[] = "Imagen {$slot}: " . $id->get_error_message();
			return 0;
		}
		$alt = $def['alt'][ $lang ] ?? $def['alt'][ mq_default_language() ] ?? '';
		update_post_meta( $id, '_wp_attachment_image_alt', $alt );
		if ( ! empty( $def['credit'] ) ) {
			wp_update_post( array( 'ID' => $id, 'post_excerpt' => $def['credit'] ) );
		}
		$map[ $slot ] = $id;
		update_option( 'mq_seed_images', $map, false );
		return (int) $id;
	}

	private function options( array $langs ): void {
		foreach ( $langs as $lang ) {
			foreach ( $this->site['options'][ $lang ] ?? array() as $name => $value ) {
				update_field( $name, $this->resolve( $value, $lang ), mq_options_id( $lang ) );
			}
			$this->log[] = "Ajustes globales ({$lang})";
		}
	}

	private function menus( array $langs ): void {
		$pll       = get_option( 'polylang', array() );
		$theme     = get_stylesheet();
		$locations = get_theme_mod( 'nav_menu_locations', array() );
		foreach ( $this->site['menus'] ?? array() as $location => $by_lang ) {
			foreach ( $langs as $lang ) {
				$name = 'Web ' . $location . ' (' . strtoupper( $lang ) . ')';
				$menu = wp_get_nav_menu_object( $name );
				$id   = $menu ? $menu->term_id : wp_create_nav_menu( $name );
				foreach ( wp_get_nav_menu_items( $id ) ?: array() as $old ) {
					wp_delete_post( $old->ID, true );
				}
				$this->menu_items( $id, $by_lang[ $lang ] ?? array(), 0, $lang );
				$pll['nav_menus'][ $theme ][ $location ][ $lang ] = $id;
				if ( mq_default_language() === $lang ) {
					$locations[ $location ] = $id;
				}
				$this->log[] = "Menú {$name}";
			}
		}
		update_option( 'polylang', $pll );
		set_theme_mod( 'nav_menu_locations', $locations );
		// Reutilizar menús no dispara wp_update_nav_menu: se avisa al front a mano.
		if ( function_exists( 'mq_revalidate' ) ) {
			mq_revalidate( array( 'wp' ) );
		}
	}

	private function menu_items( int $menu_id, array $items, int $parent, string $lang ): void {
		foreach ( $items as $i => $item ) {
			$args = array(
				'menu-item-title'       => $item['label'],
				'menu-item-description' => $item['description'] ?? '',
				'menu-item-parent-id'   => $parent,
				'menu-item-position'    => $i + 1,
				'menu-item-status'      => 'publish',
			);
			$url  = $item['url'] ?? '#';
			$page = str_starts_with( $url, '@page:' ) ? explode( '#', substr( $url, 6 ), 2 ) : array();
			if ( $page && ! isset( $page[1] ) && ( $this->ids[ $page[0] ][ $lang ] ?? 0 ) ) {
				$args['menu-item-type']      = 'post_type';
				$args['menu-item-object']    = 'page';
				$args['menu-item-object-id'] = $this->ids[ $page[0] ][ $lang ];
			} else {
				// Un enlace con ancla (@page:contact#form) va como enlace personalizado a la URL de la página.
				$args['menu-item-type'] = 'custom';
				$args['menu-item-url']  = $page ? $this->page_url( substr( $url, 6 ), $lang ) : $url;
			}
			$item_id = wp_update_nav_menu_item( $menu_id, 0, $args );
			if ( ! is_wp_error( $item_id ) ) {
				// Campos del desplegable (ver group_mq_menu_item en fields.php).
				$fields = array(
					'image'       => 'field_mq_menu_image',
					'icon'        => 'field_mq_menu_icon',
					'highlight'   => 'field_mq_menu_highlight',
					'muted'       => 'field_mq_menu_muted',
					'layout'      => 'field_mq_menu_layout',
					'eyebrow'     => 'field_mq_menu_eyebrow',
					'title_muted' => 'field_mq_menu_title_muted',
					'title'       => 'field_mq_menu_title',
					'link'        => 'field_mq_menu_link',
				);
				foreach ( $fields as $name => $key ) {
					$value = isset( $item[ $name ] ) ? $this->resolve( $item[ $name ], $lang ) : null;
					if ( $value ) {
						update_field( $key, $value, $item_id );
					}
				}
			}
			if ( ! empty( $item['children'] ) && ! is_wp_error( $item_id ) ) {
				$this->menu_items( $menu_id, $item['children'], (int) $item_id, $lang );
			}
		}
	}
}

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command(
		'mq seed',
		function ( $args, $assoc ) {
			$only  = ! empty( $assoc['only'] ) ? array_map( 'trim', explode( ',', $assoc['only'] ) ) : array();
			$langs = ! empty( $assoc['lang'] ) ? array_map( 'trim', explode( ',', $assoc['lang'] ) ) : array();
			foreach ( ( new MQ_Seed() )->run( $only, $langs ) as $line ) {
				WP_CLI::log( $line );
			}
			WP_CLI::success( 'Contenido importado.' );
		}
	);
}

add_action(
	'admin_menu',
	function () {
		add_submenu_page(
			'tools.php',
			'Contenido inicial',
			'Contenido inicial',
			'manage_options',
			'mq-seed',
			function () {
				echo '<div class="wrap"><h1>Contenido inicial</h1>';
				if ( isset( $_POST['mq_seed'] ) && check_admin_referer( 'mq_seed' ) ) {
					echo '<pre>' . esc_html( implode( "\n", ( new MQ_Seed() )->run() ) ) . '</pre>';
				}
				echo '<p>Crea o actualiza las páginas del diseño, los menús y los ajustes globales en todos los idiomas. Las páginas creadas a mano no se tocan.</p>';
				echo '<form method="post">';
				wp_nonce_field( 'mq_seed' );
				echo '<p><button class="button button-primary" name="mq_seed" value="1">Importar contenido</button></p></form></div>';
			}
		);
	}
);
