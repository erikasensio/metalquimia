<?php
defined( 'ABSPATH' ) || exit;

add_action(
	'after_setup_theme',
	function () {
		register_nav_menus(
			array(
				'primary' => 'Menú principal',
				'top'     => 'Menú superior (barra negra)',
				'footer'  => 'Menú del pie (columnas)',
				'legal'   => 'Enlaces legales del pie',
			)
		);
	}
);

add_action(
	'rest_api_init',
	function () {
		$lang_arg = array(
			'type'              => 'string',
			'default'           => '',
			'sanitize_callback' => 'sanitize_key',
		);

		// GET /wp-json/mq/v1/page?lang=es&path=empresa/historia
		register_rest_route(
			'mq/v1',
			'/page',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'args'                => array(
					'lang' => $lang_arg,
					'path' => array(
						'type'              => 'string',
						'default'           => '',
						'sanitize_callback' => fn( $v ) => trim( sanitize_text_field( $v ), '/' ),
					),
				),
				'callback'            => 'mq_rest_page',
			)
		);

		// GET /wp-json/mq/v1/global?lang=es
		register_rest_route(
			'mq/v1',
			'/global',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'args'                => array( 'lang' => $lang_arg ),
				'callback'            => 'mq_rest_global',
			)
		);

		// GET /wp-json/mq/v1/paths → todas las páginas publicadas (sitemap / prerender).
		register_rest_route(
			'mq/v1',
			'/paths',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => 'mq_rest_paths',
			)
		);
	}
);

function mq_find_page( string $lang, string $path ): ?WP_Post {
	if ( '' === $path ) {
		$front = (int) get_option( 'page_on_front' );
		if ( ! $front ) {
			return null;
		}
		$id = function_exists( 'pll_get_post' ) ? pll_get_post( $front, $lang ) : $front;
		$post = $id ? get_post( $id ) : null;
		return ( $post && 'publish' === $post->post_status ) ? $post : null;
	}

	$args = array(
		'post_type'      => 'page',
		'post_status'    => 'publish',
		'pagename'       => $path,
		'posts_per_page' => 1,
		'no_found_rows'  => true,
	);
	if ( function_exists( 'pll_languages_list' ) ) {
		$args['lang'] = $lang;
	}
	$query = new WP_Query( $args );
	return $query->posts[0] ?? null;
}

function mq_rest_page( WP_REST_Request $request ) {
	$lang = $request['lang'] ?: mq_default_language();
	if ( ! in_array( $lang, mq_languages(), true ) ) {
		return new WP_Error( 'mq_lang', 'Idioma no válido', array( 'status' => 404 ) );
	}

	$post = mq_find_page( $lang, $request['path'] );
	if ( ! $post ) {
		return new WP_Error( 'mq_not_found', 'Página no encontrada', array( 'status' => 404 ) );
	}

	$sections = array();
	foreach ( (array) get_field( 'sections', $post->ID ) as $row ) {
		if ( empty( $row['acf_fc_layout'] ) || ! empty( $row['hidden'] ) ) {
			continue;
		}
		$type = $row['acf_fc_layout'];
		unset( $row['acf_fc_layout'], $row['hidden'] );
		$sections[] = array_merge( array( 'type' => $type ), mq_normalize( $row ) );
	}

	$translations = array();
	if ( function_exists( 'pll_get_post_translations' ) ) {
		foreach ( pll_get_post_translations( $post->ID ) as $tr_lang => $tr_id ) {
			if ( 'publish' === get_post_status( $tr_id ) ) {
				$translations[] = array( 'lang' => $tr_lang, 'path' => mq_page_path( $tr_id ) );
			}
		}
	}

	return array(
		'id'           => $post->ID,
		'lang'         => $lang,
		'title'        => get_the_title( $post ),
		'path'         => mq_page_path( $post->ID ),
		'seo'          => array(
			'title'       => (string) get_field( 'seo_title', $post->ID ),
			'description' => (string) get_field( 'seo_description', $post->ID ),
			'image'       => mq_normalize( get_field( 'seo_image', $post->ID ) ?: null ),
		),
		'sections'     => $sections,
		'translations' => $translations,
	);
}

function mq_menu_id( string $location, string $lang ): int {
	$pll = get_option( 'polylang' );
	$id  = $pll['nav_menus'][ get_stylesheet() ][ $location ][ $lang ] ?? 0;
	if ( ! $id ) {
		$id = get_nav_menu_locations()[ $location ] ?? 0;
	}
	return (int) $id;
}

/** Imagen del elemento de menú (campo "Imagen" del menú) o, si no tiene, la imagen destacada de la página enlazada. */
function mq_menu_item_image( $item ): ?array {
	$image = function_exists( 'get_field' ) ? get_field( 'menu_image', $item->ID ) : null;
	if ( ! $image && 'post_type' === $item->type && has_post_thumbnail( (int) $item->object_id ) && function_exists( 'acf_get_attachment' ) ) {
		$image = acf_get_attachment( get_post_thumbnail_id( (int) $item->object_id ) );
	}
	return $image ? mq_normalize( $image ) : null;
}

function mq_menu_tree( int $menu_id ): array {
	if ( ! $menu_id ) {
		return array();
	}
	$items = wp_get_nav_menu_items( $menu_id ) ?: array();
	$build = function ( $parent ) use ( &$build, $items ) {
		$out = array();
		foreach ( $items as $item ) {
			if ( (int) $item->menu_item_parent === $parent ) {
				$out[] = array(
					'label'       => $item->title,
					'url'         => mq_relative_url( $item->url ),
					'target'      => $item->target,
					'description' => (string) $item->description,
					'image'       => mq_menu_item_image( $item ),
					'children'    => $build( (int) $item->ID ),
				);
			}
		}
		return $out;
	};
	return $build( 0 );
}

function mq_rest_global( WP_REST_Request $request ) {
	$lang = $request['lang'] ?: mq_default_language();
	if ( ! in_array( $lang, mq_languages(), true ) ) {
		return new WP_Error( 'mq_lang', 'Idioma no válido', array( 'status' => 404 ) );
	}

	$options = function_exists( 'get_fields' ) ? ( get_fields( mq_options_id( $lang ) ) ?: array() ) : array();
	$strings = array();
	foreach ( (array) ( $options['strings'] ?? array() ) as $row ) {
		if ( ! empty( $row['key'] ) ) {
			$strings[ $row['key'] ] = (string) $row['value'];
		}
	}
	unset( $options['strings'] );

	return array(
		'lang'    => $lang,
		'menus'   => array(
			'primary' => mq_menu_tree( mq_menu_id( 'primary', $lang ) ),
			'top'     => mq_menu_tree( mq_menu_id( 'top', $lang ) ),
			'footer'  => mq_menu_tree( mq_menu_id( 'footer', $lang ) ),
			'legal'   => mq_menu_tree( mq_menu_id( 'legal', $lang ) ),
		),
		'options' => (object) mq_normalize( $options ),
		'strings' => (object) $strings,
	);
}

function mq_rest_paths() {
	$ids = get_posts(
		array(
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'lang'           => '',
		)
	);
	return array_map(
		fn( $id ) => array(
			'lang'     => mq_post_language( $id ),
			'path'     => mq_page_path( $id ),
			'modified' => get_post_modified_time( 'c', true, $id ),
		),
		$ids
	);
}
