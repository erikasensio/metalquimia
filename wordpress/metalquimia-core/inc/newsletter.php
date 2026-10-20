<?php
defined( 'ABSPATH' ) || exit;

/**
 * POST /wp-json/mq/v1/newsletter {email, lang}
 * Guarda el alta (se ven en Herramientas → Altas newsletter)
 * y avisa por email al correo de formularios de ese idioma.
 */
add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'mq/v1',
			'/newsletter',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => 'mq_rest_newsletter',
			)
		);
	}
);

function mq_rest_newsletter( WP_REST_Request $request ) {
	$email = sanitize_email( (string) $request->get_param( 'email' ) );
	$lang  = sanitize_key( (string) $request->get_param( 'lang' ) );
	if ( ! is_email( $email ) ) {
		return new WP_Error( 'mq_email', 'Email no válido', array( 'status' => 400 ) );
	}
	if ( ! in_array( $lang, mq_languages(), true ) ) {
		$lang = mq_default_language();
	}

	$list = (array) get_option( 'mq_newsletter', array() );
	if ( ! isset( $list[ $email ] ) ) {
		$list[ $email ] = array(
			'lang' => $lang,
			'date' => current_time( 'mysql' ),
		);
		update_option( 'mq_newsletter', $list, false );
	}

	$to = function_exists( 'get_field' ) ? get_field( 'contact_email', mq_options_id( $lang ) ) : '';
	wp_mail( $to ?: get_option( 'admin_email' ), '[Web] Nueva alta en la newsletter', "Email: {$email}\nIdioma: {$lang}" );

	return array( 'ok' => true );
}

// Listado de altas en el escritorio de WordPress (solo lectura) para poder exportarlas.
add_action(
	'admin_menu',
	function () {
		add_submenu_page(
			'tools.php',
			'Altas newsletter',
			'Altas newsletter',
			'manage_options',
			'mq-newsletter',
			function () {
				$list = (array) get_option( 'mq_newsletter', array() );
				echo '<div class="wrap"><h1>Altas newsletter</h1><p>Copia la lista para importarla en tu herramienta de email.</p>';
				echo '<textarea readonly rows="20" style="width:100%;font-family:monospace">';
				foreach ( $list as $email => $row ) {
					echo esc_textarea( $email . ',' . ( $row['lang'] ?? '' ) . ',' . ( $row['date'] ?? '' ) ) . "\n";
				}
				echo '</textarea></div>';
			}
		);
	}
);
