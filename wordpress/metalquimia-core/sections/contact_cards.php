<?php
// Tarjetas de contacto de la página Contacto: una negra destacada + teléfono, email, WhatsApp, dirección…
$l = 'contact_cards';
return array(
	'name'       => $l,
	'label'      => 'Tarjetas de contacto',
	'sub_fields' => array(
		mq_tab( $l, 'Cabecera' ),
		...mq_heading_fields(
			$l,
			array(
				'subtitle' => false,
				'button'   => false,
			)
		),
		mq_tab( $l, 'Tarjeta negra' ),
		mq_f( $l, 'highlight_title', 'text', 'Título', array( 'instructions' => 'Primera tarjeta, en negro (p. ej. Send us an inquiry).' ) ),
		mq_f( $l, 'highlight_text', 'textarea', 'Texto', array( 'rows' => 2 ) ),
		mq_f( $l, 'highlight_button', 'link', 'Botón', array( 'instructions' => 'Para bajar al formulario de la misma página escribe #form como URL.' ) ),
		mq_tab( $l, 'Tarjetas' ),
		mq_f(
			$l,
			'items',
			'repeater',
			'Tarjetas',
			array(
				'collapsed'    => 'field_mq_' . $l . '_items_label',
				'button_label' => 'Añadir tarjeta',
				'instructions' => 'Tarjetas grises que van después de la negra (de tres en tres).',
				'sub_fields'   => array(
					mq_f(
						$l,
						'icon',
						'select',
						'Icono',
						array(
							'choices'       => array(
								'phone'    => 'Teléfono',
								'email'    => 'Email',
								'whatsapp' => 'WhatsApp',
								'location' => 'Ubicación',
							),
							'default_value' => 'phone',
						),
						'items'
					),
					mq_f( $l, 'label', 'text', 'Título', array( 'placeholder' => 'Call us' ), 'items' ),
					mq_f( $l, 'value', 'text', 'Dato', array( 'instructions' => 'El teléfono, el email o la dirección tal y como se tiene que ver.' ), 'items' ),
					mq_f( $l, 'link', 'link', 'Enlace', array( 'instructions' => 'Opcional. Si el icono es Teléfono o Email y lo dejas vacío, la tarjeta llama o abre el correo automáticamente. Para WhatsApp usa https://wa.me/34600000000.' ), 'items' ),
				),
			)
		),
	),
);
