<?php
defined( 'ABSPATH' ) || exit;

/**
 * Layouts del campo "Secciones". Cada archivo de /sections devuelve un layout de ACF:
 *   return array( 'name' => 'rich_text', 'label' => 'Texto', 'sub_fields' => array( ... ) );
 * Añadir un módulo nuevo = añadir un archivo ahí y su componente en el front (src/sections/registry.ts).
 */
function mq_section_layouts(): array {
	$layouts = array();
	foreach ( glob( MQ_CORE_DIR . '/sections/*.php' ) as $file ) {
		$layout = require $file;
		$name   = $layout['name'];

		// Campos comunes a todas las secciones, en una pestaña aparte.
		$layout['sub_fields'][] = array( 'key' => "field_mq_{$name}_tab_opts", 'label' => 'Opciones', 'name' => '', 'type' => 'tab' );
		$layout['sub_fields'][] = array(
			'key'          => "field_mq_{$name}_hidden",
			'label'        => 'Ocultar sección',
			'name'         => 'hidden',
			'type'         => 'true_false',
			'ui'           => 1,
			'instructions' => 'La sección se guarda pero no se muestra en la web.',
		);
		$layout['sub_fields'][] = array(
			'key'          => "field_mq_{$name}_anchor",
			'label'        => 'Ancla',
			'name'         => 'anchor',
			'type'         => 'text',
			'instructions' => 'Opcional. Permite enlazar a la sección con #ancla.',
		);

		$layouts[ "layout_mq_{$name}" ] = array_merge( array( 'key' => "layout_mq_{$name}", 'display' => 'block' ), $layout );
	}
	return $layouts;
}

add_action(
	'acf/init',
	function () {
		if ( ! function_exists( 'acf_add_local_field_group' ) ) {
			return;
		}

		// Secciones reordenables de cada página.
		acf_add_local_field_group(
			array(
				'key'                   => 'group_mq_sections',
				'title'                 => 'Secciones',
				'fields'                => array(
					array(
						'key'          => 'field_mq_sections',
						'label'        => 'Secciones',
						'name'         => 'sections',
						'type'         => 'flexible_content',
						'button_label' => 'Añadir sección',
						'instructions' => 'Arrastra las secciones para cambiar su orden.',
						'layouts'      => mq_section_layouts(),
					),
				),
				'location'              => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'page' ) ) ),
				'position'              => 'acf_after_title',
				'hide_on_screen'        => array( 'the_content' ),
				'menu_order'            => 0,
			)
		);

		// SEO básico por página.
		acf_add_local_field_group(
			array(
				'key'      => 'group_mq_seo',
				'title'    => 'SEO',
				'fields'   => array(
					array( 'key' => 'field_mq_seo_title', 'label' => 'Título SEO', 'name' => 'seo_title', 'type' => 'text' ),
					array( 'key' => 'field_mq_seo_description', 'label' => 'Descripción', 'name' => 'seo_description', 'type' => 'textarea', 'rows' => 3 ),
					array( 'key' => 'field_mq_seo_image', 'label' => 'Imagen para compartir', 'name' => 'seo_image', 'type' => 'image', 'return_format' => 'array' ),
				),
				'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'page' ) ) ),
				'position' => 'side',
			)
		);

		// Menú desplegable (Figma "Menús" 305:5989). Los campos del panel se rellenan en los elementos de primer nivel
		// y los de tarjeta / icono en los de dentro; los que no aplican a un elemento se ignoran.
		acf_add_local_field_group(
			array(
				'key'      => 'group_mq_menu_item',
				'title'    => 'Menú desplegable',
				'fields'   => array(
					array(
						'key'   => 'field_mq_menu_tab_panel',
						'label' => 'Panel (elementos de primer nivel)',
						'type'  => 'tab',
					),
					array(
						'key'          => 'field_mq_menu_layout',
						'label'        => 'Diseño del panel',
						'name'         => 'menu_layout',
						'type'         => 'select',
						'choices'      => array(
							''         => 'Automático (según el contenido)',
							'icons'    => 'Lista con iconos en tres columnas (Productos)',
							'cards'    => 'Fila de tarjetas con imagen (Soluciones)',
							'featured' => 'Dos tarjetas grandes y lista de enlaces (Nuestro método)',
							'links'    => 'Enlaces grandes en columnas de seis (Servicio, Empresa)',
						),
						'default_value' => '',
						'allow_null'   => 0,
						'instructions' => 'Cómo se muestran los elementos de dentro al abrir el desplegable.',
					),
					array(
						'key'          => 'field_mq_menu_eyebrow',
						'label'        => 'Antetítulo',
						'name'         => 'menu_eyebrow',
						'type'         => 'text',
						'instructions' => 'Texto pequeño en mayúsculas arriba del panel (p. ej. "NUESTROS PRODUCTOS").',
					),
					array(
						'key'          => 'field_mq_menu_title_muted',
						'label'        => 'Título (parte en gris)',
						'name'         => 'menu_title_muted',
						'type'         => 'text',
						'instructions' => 'Opcional. Primera línea del título, en gris.',
					),
					array(
						'key'          => 'field_mq_menu_title',
						'label'        => 'Título',
						'name'         => 'menu_title',
						'type'         => 'text',
						'instructions' => 'Opcional. Segunda línea del título, en negro.',
					),
					array(
						'key'           => 'field_mq_menu_link',
						'label'         => 'Enlace al pie del panel',
						'name'          => 'menu_link',
						'type'          => 'link',
						'return_format' => 'array',
						'instructions'  => 'Opcional (p. ej. "Descubre todas las soluciones").',
					),
					array(
						'key'   => 'field_mq_menu_tab_item',
						'label' => 'Elemento del panel',
						'type'  => 'tab',
					),
					array(
						'key'           => 'field_mq_menu_image',
						'label'         => 'Imagen',
						'name'          => 'menu_image',
						'type'          => 'image',
						'return_format' => 'array',
						'preview_size'  => 'thumbnail',
						'instructions'  => 'Para los diseños con tarjetas. PNG recortado (Soluciones, 600 × 600 px) o foto (Nuestro método, 800 × 1000 px). Si no hay, se usa la imagen destacada de la página enlazada. La "Descripción" del elemento (Opciones de pantalla → Descripción) aparece debajo del título en la lista con iconos.',
					),
					array(
						'key'           => 'field_mq_menu_icon',
						'label'         => 'Icono',
						'name'          => 'menu_icon',
						'type'          => 'image',
						'return_format' => 'array',
						'preview_size'  => 'thumbnail',
						'instructions'  => 'Para la lista con iconos. PNG transparente cuadrado de 96 × 96 px (se ve a 24 px), con el dibujo centrado.',
					),
					array(
						'key'          => 'field_mq_menu_highlight',
						'label'        => 'Destacar en rojo',
						'name'         => 'menu_highlight',
						'type'         => 'true_false',
						'ui'           => 1,
						'instructions' => 'P. ej. "Pedir recambios".',
					),
				),
				'location' => array( array( array( 'param' => 'nav_menu_item', 'operator' => '==', 'value' => 'all' ) ) ),
			)
		);

		// Ajustes globales: una página de opciones por idioma.
		if ( ! function_exists( 'acf_add_options_page' ) ) {
			return;
		}
		acf_add_options_page(
			array(
				'page_title' => 'Ajustes globales',
				'menu_title' => 'Ajustes globales',
				'menu_slug'  => 'mq-global',
				'icon_url'   => 'dashicons-admin-site-alt3',
				'redirect'   => true,
			)
		);

		$locations = array();
		foreach ( mq_languages() as $lang ) {
			acf_add_options_sub_page(
				array(
					'page_title'  => 'Ajustes globales (' . strtoupper( $lang ) . ')',
					'menu_title'  => strtoupper( $lang ),
					'menu_slug'   => 'mq-global-' . $lang,
					'parent_slug' => 'mq-global',
					'post_id'     => mq_options_id( $lang ),
				)
			);
			$locations[] = array( array( 'param' => 'options_page', 'operator' => '==', 'value' => 'mq-global-' . $lang ) );
		}

		acf_add_local_field_group(
			array(
				'key'      => 'group_mq_global',
				'title'    => 'Ajustes globales',
				'fields'   => array(
					array( 'key' => 'field_mq_g_tab_header', 'label' => 'Cabecera', 'name' => '', 'type' => 'tab' ),
					array(
						'key'           => 'field_mq_g_logo',
						'label'         => 'Logo',
						'name'          => 'logo',
						'type'          => 'image',
						'return_format' => 'array',
						'instructions'  => 'PNG en blanco con fondo transparente (va sobre fondo oscuro), 346 × 52 px.',
					),
					array(
						'key'           => 'field_mq_g_logo_dark',
						'label'         => 'Logo (versión oscura)',
						'name'          => 'logo_dark',
						'type'          => 'image',
						'return_format' => 'array',
						'instructions'  => 'PNG o SVG en negro/color para la cabecera blanca, 346 × 52 px.',
					),
					array( 'key' => 'field_mq_g_header_cta', 'label' => 'Botón de la cabecera', 'name' => 'header_cta', 'type' => 'link', 'instructions' => 'Por ejemplo "CONTACT".' ),
					array( 'key' => 'field_mq_g_tab_footer', 'label' => 'Pie', 'name' => '', 'type' => 'tab' ),
					array( 'key' => 'field_mq_g_footer_image', 'label' => 'Foto de fondo del pie', 'name' => 'footer_image', 'type' => 'image', 'return_format' => 'array', 'preview_size' => 'medium', 'instructions' => 'Horizontal, mínimo 2400 px de ancho. Se oscurece automáticamente. Vacío = foto por defecto.' ),
					array( 'key' => 'field_mq_g_prefooter_title_muted', 'label' => 'Llamada final: título (parte en gris)', 'name' => 'prefooter_title_muted', 'type' => 'text', 'instructions' => 'Bloque negro encima del pie, p. ej. "Where the industry stops,". Déjalo vacío para no mostrarlo.' ),
					array( 'key' => 'field_mq_g_prefooter_title', 'label' => 'Llamada final: título (parte en blanco)', 'name' => 'prefooter_title', 'type' => 'text' ),
					array( 'key' => 'field_mq_g_prefooter_button', 'label' => 'Llamada final: botón', 'name' => 'prefooter_button', 'type' => 'link', 'instructions' => 'Botón rojo, p. ej. "TALK TO AN EXPERT".' ),
					array( 'key' => 'field_mq_g_footer_claim', 'label' => 'Frase del pie', 'name' => 'footer_claim', 'type' => 'textarea', 'rows' => 2, 'new_lines' => '' ),
					array( 'key' => 'field_mq_g_newsletter_label', 'label' => 'Newsletter: título', 'name' => 'newsletter_label', 'type' => 'text', 'instructions' => 'P. ej. "JOIN OUR NEWSLETTER". Vacío = sin formulario.' ),
					array( 'key' => 'field_mq_g_newsletter_placeholder', 'label' => 'Newsletter: texto de ejemplo del campo', 'name' => 'newsletter_placeholder', 'type' => 'text' ),
					array( 'key' => 'field_mq_g_newsletter_terms', 'label' => 'Newsletter: texto de aceptación', 'name' => 'newsletter_terms', 'type' => 'wysiwyg', 'toolbar' => 'basic', 'media_upload' => 0, 'instructions' => 'Puedes enlazar la política de privacidad.' ),
					array( 'key' => 'field_mq_g_newsletter_success', 'label' => 'Newsletter: mensaje de gracias', 'name' => 'newsletter_success', 'type' => 'text' ),
					array( 'key' => 'field_mq_g_contact_title', 'label' => 'Columna de contacto: título', 'name' => 'contact_title', 'type' => 'text', 'instructions' => 'P. ej. "CONTACT US". Las otras columnas salen del menú "Menú del pie (columnas)".' ),
					array( 'key' => 'field_mq_g_phone', 'label' => 'Teléfono', 'name' => 'phone', 'type' => 'text' ),
					array( 'key' => 'field_mq_g_email', 'label' => 'Email público', 'name' => 'email', 'type' => 'email' ),
					array(
						'key'          => 'field_mq_g_socials',
						'label'        => 'Redes sociales',
						'name'         => 'socials',
						'type'         => 'repeater',
						'layout'       => 'table',
						'button_label' => 'Añadir red',
						'sub_fields'   => array(
							array(
								'key'     => 'field_mq_g_social_network',
								'label'   => 'Red',
								'name'    => 'network',
								'type'    => 'select',
								'choices' => array(
									'linkedin'  => 'LinkedIn',
									'x'         => 'X (Twitter)',
									'instagram' => 'Instagram',
									'youtube'   => 'YouTube',
									'facebook'  => 'Facebook',
								),
							),
							array( 'key' => 'field_mq_g_social_url', 'label' => 'Enlace', 'name' => 'url', 'type' => 'url' ),
						),
					),
					array( 'key' => 'field_mq_g_footer_text', 'label' => 'Copyright', 'name' => 'footer_text', 'type' => 'text', 'instructions' => 'P. ej. "© Copyright 2026". Los enlaces legales salen del menú "Enlaces legales del pie".' ),
					array( 'key' => 'field_mq_g_tab_forms', 'label' => 'Formularios', 'name' => '', 'type' => 'tab' ),
					array( 'key' => 'field_mq_g_contact_email', 'label' => 'Email que recibe los formularios', 'name' => 'contact_email', 'type' => 'email', 'instructions' => 'A este correo llegan el formulario de contacto y las altas a la newsletter de este idioma. Vacío = email del administrador.' ),
					array( 'key' => 'field_mq_g_tab_loader', 'label' => 'Pantalla de carga', 'name' => '', 'type' => 'tab' ),
					array( 'key' => 'field_mq_g_loader_enabled', 'label' => 'Mostrar pantalla de carga', 'name' => 'loader_enabled', 'type' => 'true_false', 'ui' => 1, 'default_value' => 1, 'instructions' => 'Se ve una vez por visita, al entrar en la web.' ),
					array( 'key' => 'field_mq_g_loader_text_muted', 'label' => 'Texto (parte en gris)', 'name' => 'loader_text_muted', 'type' => 'text', 'default_value' => 'Meat.' ),
					array( 'key' => 'field_mq_g_loader_text', 'label' => 'Texto (parte en blanco)', 'name' => 'loader_text', 'type' => 'text', 'default_value' => 'The next.' ),
					array( 'key' => 'field_mq_g_tab_strings', 'label' => 'Textos de la interfaz', 'name' => '', 'type' => 'tab' ),
					array(
						'key'          => 'field_mq_g_strings',
						'label'        => 'Textos de la interfaz',
						'name'         => 'strings',
						'type'         => 'group',
						'layout'       => 'block',
						'instructions' => 'Textos pequeños que se repiten en toda la web. Si dejas uno vacío se usa el texto por defecto.',
						'sub_fields'   => array_map(
							fn( $s ) => array( 'key' => 'field_mq_g_str_' . $s[0], 'label' => $s[1], 'name' => $s[0], 'type' => 'text', 'instructions' => $s[2], 'wrapper' => array( 'width' => 50 ) ),
							array(
								array( 'discover_all', 'Menú: enlace al pie del desplegable', 'Si el desplegable no tiene enlace propio. P. ej. "Ver todas las soluciones".' ),
								array( 'menu', 'Menú: botón en el móvil', 'P. ej. "Menú".' ),
								array( 'nav_label', 'Menú: nombre para lectores de pantalla', 'No se ve; lo leen los lectores de pantalla. P. ej. "Menú principal".' ),
								array( 'newsletter_submit', 'Newsletter: botón de enviar', 'No se ve; lo leen los lectores de pantalla. P. ej. "Suscribirme".' ),
								array( 'newsletter_error', 'Newsletter: mensaje si falla', 'P. ej. "No se ha podido enviar. Inténtalo de nuevo."' ),
								array( 'prev', 'Carruseles: flecha anterior', 'No se ve; lo leen los lectores de pantalla. P. ej. "Anterior".' ),
								array( 'next', 'Carruseles: flecha siguiente', 'No se ve; lo leen los lectores de pantalla. P. ej. "Siguiente".' ),
								array( 'carousel', 'Carruseles: nombre', 'No se ve; lo leen los lectores de pantalla. P. ej. "Carrusel".' ),
								array( 'close', 'Botón de cerrar (ventanas y fichas)', 'No se ve; lo leen los lectores de pantalla. P. ej. "Cerrar".' ),
								array( 'close_video', 'Botón de cerrar el vídeo', 'No se ve; lo leen los lectores de pantalla. P. ej. "Cerrar vídeo".' ),
								array( 'not_found_title', 'Página no encontrada (404): título', 'P. ej. "Página no encontrada".' ),
								array( 'not_found_text', 'Página no encontrada (404): texto', 'P. ej. "La página que buscas no existe o ha cambiado de dirección."' ),
								array( 'not_found_button', 'Página no encontrada (404): botón', 'P. ej. "Volver al inicio".' ),
							)
						),
					),
				),
				'location' => $locations,
			)
		);
	}
);
