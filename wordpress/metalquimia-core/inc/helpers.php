<?php
defined( 'ABSPATH' ) || exit;

/** Idiomas activos (códigos de Polylang). Sin Polylang, el idioma del sitio. */
function mq_languages(): array {
	if ( function_exists( 'pll_languages_list' ) ) {
		$langs = pll_languages_list( array( 'fields' => 'slug' ) );
		if ( $langs ) {
			return $langs;
		}
	}
	return array( substr( get_locale(), 0, 2 ) );
}

function mq_default_language(): string {
	if ( function_exists( 'pll_default_language' ) && pll_default_language() ) {
		return pll_default_language();
	}
	return mq_languages()[0];
}

function mq_post_language( int $post_id ): string {
	if ( function_exists( 'pll_get_post_language' ) ) {
		return pll_get_post_language( $post_id ) ?: mq_default_language();
	}
	return mq_default_language();
}

/** Ruta de una página relativa a la home de su idioma, sin barras: "" para la portada, "empresa/historia"… */
function mq_page_path( int $post_id ): string {
	$front = (int) get_option( 'page_on_front' );
	if ( $front ) {
		$fronts = function_exists( 'pll_get_post_translations' ) ? pll_get_post_translations( $front ) : array( $front );
		if ( in_array( $post_id, array_map( 'intval', $fronts ), true ) ) {
			return '';
		}
	}
	return trim( get_page_uri( $post_id ), '/' );
}

/** post_id de ACF/SCF donde se guardan los ajustes globales de un idioma. */
function mq_options_id( string $lang ): string {
	return 'mq_global_' . $lang;
}

/**
 * Deja los valores de ACF en un formato limpio para el front:
 * imágenes → {url, alt, width, height}; enlaces internos → ruta relativa; resto tal cual.
 */
function mq_normalize( $value ) {
	if ( ! is_array( $value ) ) {
		return $value;
	}
	if ( isset( $value['type'], $value['mime_type'], $value['url'] ) ) {
		return array(
			'url'    => $value['url'],
			'alt'    => $value['alt'] ?? '',
			'width'  => (int) ( $value['width'] ?? 0 ),
			'height' => (int) ( $value['height'] ?? 0 ),
			'mime'   => $value['mime_type'],
		);
	}
	if ( isset( $value['url'], $value['title'] ) && array_key_exists( 'target', $value ) ) {
		$value['url'] = mq_relative_url( $value['url'] );
		return $value;
	}
	return array_map( 'mq_normalize', $value );
}

/** Convierte una URL del propio WordPress en ruta relativa para que el front la sirva. */
function mq_relative_url( string $url ): string {
	$parts = wp_parse_url( $url );
	if ( empty( $parts['host'] ) || str_contains( $url, '/wp-content/' ) || ! in_array( strtolower( $parts['host'] ), mq_own_hosts(), true ) ) {
		return $url;
	}
	$path = '/' . trim( $parts['path'] ?? '', '/' );
	return $path . ( isset( $parts['query'] ) ? '?' . $parts['query'] : '' ) . ( isset( $parts['fragment'] ) ? '#' . $parts['fragment'] : '' );
}

/**
 * Dominios del propio WordPress. Además del de home_url() se lee el guardado en la base de datos sin filtros:
 * con Live Link (u otro proxy) home_url() devuelve el dominio público, pero los enlaces guardados en los campos
 * siguen llevando el original (p. ej. metalquimia.local).
 */
function mq_own_hosts(): array {
	static $hosts = null;
	if ( null === $hosts ) {
		global $wpdb;
		$stored = $wpdb->get_col( "SELECT option_value FROM {$wpdb->options} WHERE option_name IN ('home', 'siteurl')" );
		$hosts  = array_values( array_unique( array_filter( array_map(
			fn( $u ) => strtolower( (string) wp_parse_url( $u, PHP_URL_HOST ) ),
			array_merge( array( home_url(), site_url() ), $stored )
		) ) ) );
	}
	return $hosts;
}
