<?php
defined( 'ABSPATH' ) || exit;

// Aviso si faltan los plugins de los que depende.
add_action(
	'admin_notices',
	function () {
		$missing = array();
		if ( ! function_exists( 'acf_add_local_field_group' ) ) {
			$missing[] = 'Secure Custom Fields (o ACF Pro)';
		}
		if ( ! function_exists( 'pll_languages_list' ) ) {
			$missing[] = 'Polylang';
		}
		if ( ! defined( 'MQ_FRONT_URL' ) ) {
			$missing[] = 'la constante MQ_FRONT_URL en wp-config.php';
		}
		if ( $missing ) {
			printf(
				'<div class="notice notice-warning"><p><strong>Metalquimia Core</strong> necesita: %s.</p></div>',
				esc_html( implode( ', ', $missing ) )
			);
		}
	}
);

// Las páginas se montan solo con el campo "Secciones": fuera el editor de bloques (y su ventana de patrones)
// y el cuadro de contenido, que el front no usa.
add_filter( 'use_block_editor_for_post_type', fn( $use, $post_type ) => 'page' === $post_type ? false : $use, 10, 2 );
add_action( 'init', fn() => remove_post_type_support( 'page', 'editor' ) );
