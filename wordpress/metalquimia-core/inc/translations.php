<?php
defined( 'ABSPATH' ) || exit;

/**
 * Al crear una traducción con el "+" de Polylang, el editor se abre con las secciones,
 * el SEO y sus textos copiados del idioma original, listos para traducir.
 * Solo rellena campos vacíos de la página nueva; la original no se toca.
 */
add_filter(
	'acf/load_value',
	function ( $value, $post_id, $field ) {
		static $copying = false;
		global $pagenow;

		if ( $copying || 'post-new.php' !== $pagenow || empty( $_GET['from_post'] ) || empty( $_GET['new_lang'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
			return $value;
		}
		if ( null !== $value && '' !== $value && false !== $value && array() !== $value ) {
			return $value;
		}

		$from = absint( $_GET['from_post'] ); // phpcs:ignore WordPress.Security.NonceVerification
		if ( ! $from || ! current_user_can( 'edit_post', $from ) ) {
			return $value;
		}

		$copying = true;
		$copied  = acf_get_value( $from, $field );
		$copying = false;

		return $copied;
	},
	10,
	3
);
