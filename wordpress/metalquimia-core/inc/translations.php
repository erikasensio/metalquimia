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

/**
 * Las traducciones de una página pueden compartir slug ("partnership" en español y en inglés).
 * WordPress añadiría "-2" a la segunda; solo lo hace si la otra página con ese slug es del mismo idioma.
 */
add_filter(
	'wp_unique_post_slug',
	function ( $slug, $post_id, $post_status, $post_type, $post_parent, $original_slug ) {
		if ( 'page' !== $post_type || $slug === $original_slug || ! function_exists( 'pll_get_post_language' ) ) {
			return $slug;
		}
		// Al guardar por primera vez desde el editor, Polylang aún no ha asignado el idioma: se toma del formulario.
		$lang = pll_get_post_language( $post_id ) ?: sanitize_key( wp_unslash( $_REQUEST['post_lang_choice'] ?? $_REQUEST['new_lang'] ?? '' ) ); // phpcs:ignore WordPress.Security.NonceVerification
		if ( ! $lang ) {
			return $slug;
		}
		global $wpdb;
		$taken = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT ID FROM {$wpdb->posts} WHERE post_name = %s AND post_type = 'page' AND post_parent = %d AND ID != %d AND post_status NOT IN ('trash', 'auto-draft', 'inherit')",
				$original_slug,
				$post_parent,
				$post_id
			)
		);
		foreach ( $taken as $id ) {
			if ( pll_get_post_language( (int) $id ) === $lang ) {
				return $slug;
			}
		}
		return $original_slug;
	},
	10,
	6
);
