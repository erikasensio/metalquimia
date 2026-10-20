<?php
defined( 'ABSPATH' ) || exit;

/**
 * Formulario de contacto: Next.js (/api/contact) reenvía aquí cada envío y se manda por email
 * a la dirección "contact_email" de los ajustes globales del idioma (o al email del administrador).
 *
 * POST /wp-json/mq/v1/contact  { lang, name, company, address, home_address, postal_code, country, phone, email, message, marketing, website }
 */
add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'mq/v1',
			'/contact',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => 'mq_rest_contact',
			)
		);
	}
);

function mq_rest_contact( WP_REST_Request $request ) {
	$data = $request->get_json_params();
	if ( ! is_array( $data ) ) {
		$data = $request->get_body_params();
	}

	// Trampa para bots: el campo oculto "website" debe llegar vacío. Se responde ok para no darles pistas.
	if ( ! empty( $data['website'] ) ) {
		return new WP_REST_Response( array( 'ok' => true ), 200 );
	}

	$text   = fn( $key ) => isset( $data[ $key ] ) ? sanitize_text_field( wp_unslash( (string) $data[ $key ] ) ) : '';
	$fields = array(
		'name'         => $text( 'name' ),
		'company'      => $text( 'company' ),
		'address'      => $text( 'address' ),
		'home_address' => $text( 'home_address' ),
		'postal_code'  => $text( 'postal_code' ),
		'country'      => $text( 'country' ),
		'phone'        => $text( 'phone' ),
		'email'        => isset( $data['email'] ) ? sanitize_email( wp_unslash( (string) $data['email'] ) ) : '',
		'message'      => isset( $data['message'] ) ? sanitize_textarea_field( wp_unslash( (string) $data['message'] ) ) : '',
	);
	$marketing = ! empty( $data['marketing'] );

	if ( '' === $fields['name'] || '' === $fields['message'] || ! is_email( $fields['email'] ) || empty( $data['terms'] ) ) {
		return new WP_REST_Response( array( 'ok' => false, 'error' => 'invalid' ), 400 );
	}

	$lang = isset( $data['lang'] ) ? sanitize_key( (string) $data['lang'] ) : '';
	if ( ! in_array( $lang, mq_languages(), true ) ) {
		$lang = mq_default_language();
	}

	$to = function_exists( 'get_field' ) ? (string) get_field( 'contact_email', mq_options_id( $lang ) ) : '';
	if ( ! is_email( $to ) ) {
		$to = get_option( 'admin_email' );
	}

	$labels = array(
		'name'         => 'Nombre',
		'company'      => 'Empresa',
		'address'      => 'Dirección',
		'home_address' => 'Población',
		'postal_code'  => 'Código postal',
		'country'      => 'País',
		'phone'        => 'Teléfono',
		'email'        => 'Email',
		'message'      => 'Mensaje',
	);
	$lines = array();
	foreach ( $labels as $key => $label ) {
		if ( '' !== $fields[ $key ] ) {
			$lines[] = $label . ': ' . ( 'message' === $key ? "\n" : '' ) . $fields[ $key ];
		}
	}
	$lines[] = 'Acepta comunicaciones comerciales: ' . ( $marketing ? 'Sí' : 'No' );
	$lines[] = 'Idioma: ' . $lang;

	$subject = sprintf( '[%s] Nueva consulta de %s', wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ), $fields['name'] );
	$headers = array( sprintf( 'Reply-To: %s <%s>', str_replace( array( '<', '>', '"', "\r", "\n" ), '', $fields['name'] ), $fields['email'] ) );

	if ( ! wp_mail( $to, $subject, implode( "\n\n", $lines ), $headers ) ) {
		return new WP_REST_Response( array( 'ok' => false, 'error' => 'mail' ), 500 );
	}
	return new WP_REST_Response( array( 'ok' => true ), 200 );
}
