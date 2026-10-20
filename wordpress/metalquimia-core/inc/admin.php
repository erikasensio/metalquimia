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
