<?php
// Formulario de contacto sobre fondo negro (página Contacto, "Send an inquiry"). Los envíos llegan por email (inc/contact.php).
$l = 'contact_form';

$texts = array(
	'name'         => array( 'Nombre', 'Name', 'Your name' ),
	'company'      => array( 'Empresa', 'Company', 'Company name' ),
	'address'      => array( 'Dirección', 'Address', 'Company address' ),
	'home_address' => array( 'Población', 'Home address', 'City' ),
	'postal_code'  => array( 'Código postal', 'Postal code', '00000' ),
	'country'      => array( 'País', 'Country', 'Select a country' ),
	'phone'        => array( 'Teléfono', 'Phone', '+34 000 000 000' ),
	'email'        => array( 'Email', 'Email', 'name@company.com' ),
	'message'      => array( 'Mensaje', 'Message', 'How can we help you?' ),
);

$label_fields = array( mq_tab( $l, 'Textos de los campos' ) );
foreach ( $texts as $key => $t ) {
	$label_fields[] = mq_f( $l, 'label_' . $key, 'text', 'Etiqueta: ' . $t[0], array( 'placeholder' => $t[1], 'wrapper' => array( 'width' => 50 ) ) );
	$label_fields[] = mq_f( $l, 'ph_' . $key, 'text', 'Texto de ejemplo: ' . $t[0], array( 'placeholder' => $t[2], 'wrapper' => array( 'width' => 50 ) ) );
}

$wysiwyg = array(
	'tabs'         => 'visual',
	'toolbar'      => 'basic',
	'media_upload' => 0,
);

return array(
	'name'       => $l,
	'label'      => 'Formulario de contacto',
	'sub_fields' => array_merge(
		array(
			mq_tab( $l, 'Formulario' ),
			mq_f( $l, 'title', 'text', 'Título', array( 'placeholder' => 'Send an inquiry' ) ),
			mq_f(
				$l,
				'countries',
				'textarea',
				'Países del desplegable',
				array(
					'rows'         => 8,
					'instructions' => 'Un país por línea, en el orden en que deben aparecer. Si lo dejas vacío, el país se escribe a mano.',
				)
			),
			mq_f( $l, 'terms_label', 'wysiwyg', 'Texto de la casilla de privacidad (obligatoria)', array_merge( $wysiwyg, array( 'instructions' => 'Una sola línea. Enlaza la política de privacidad con el botón de enlace (p. ej. "I accept the privacy policy").' ) ) ),
			mq_f( $l, 'marketing_label', 'text', 'Texto de la casilla de comunicaciones (opcional)', array( 'placeholder' => 'I want to receive news and commercial information' ) ),
			mq_f( $l, 'legal_text', 'wysiwyg', 'Información legal', array_merge( $wysiwyg, array( 'instructions' => 'Recuadro gris con la información básica de protección de datos (responsable, finalidad, derechos…).' ) ) ),
			mq_f( $l, 'submit_label', 'text', 'Texto del botón', array( 'placeholder' => 'SEND' ) ),
			mq_tab( $l, 'Mensajes' ),
			mq_f( $l, 'error_required', 'text', 'Aviso de campo obligatorio', array( 'placeholder' => 'This field is required' ) ),
			mq_f( $l, 'success_message', 'textarea', 'Mensaje de envío correcto', array( 'rows' => 2, 'placeholder' => 'Thank you! We have received your message and will get back to you soon.' ) ),
			mq_f( $l, 'error_message', 'textarea', 'Mensaje de error', array( 'rows' => 2, 'placeholder' => 'Something went wrong. Please try again or write to us by email.' ) ),
		),
		$label_fields
	),
);
