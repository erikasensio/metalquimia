<?php
// Testimonios de clientes en acordeón (Figma Modulos › 10. Testimonial). Fondo negro.
$l = 'testimonial';
return array(
	'name'       => $l,
	'label'      => 'Testimonios',
	'sub_fields' => array(
		mq_tab( $l, 'Cabecera' ),
		mq_f( $l, 'title_muted', 'textarea', 'Título (parte en gris)', array( 'rows' => 2, 'instructions' => 'Primera parte del título, en gris. Puede quedar vacía.' ) ),
		mq_f( $l, 'title', 'textarea', 'Título (parte destacada)', array( 'rows' => 2 ) ),
		mq_f( $l, 'label', 'text', 'Etiqueta sobre los testimonios', array( 'placeholder' => 'TRUSTED BY INDUSTRY LEADERS' ) ),
		mq_tab( $l, 'Testimonios' ),
		mq_f(
			$l,
			'items',
			'repeater',
			'Testimonios',
			array(
				'collapsed'    => 'field_mq_' . $l . '_items_name',
				'button_label' => 'Añadir testimonio',
				'instructions' => 'El primero aparece abierto. Al pulsar otro cliente se abre su testimonio.',
				'sub_fields'   => array(
					mq_f( $l, 'logo', 'image', 'Logo del cliente', array( 'preview_size' => 'thumbnail', 'instructions' => 'SVG o PNG transparente, en color oscuro (se aclara automáticamente sobre la barra negra). Alto recomendado 80 px.' ), 'items' ),
					mq_f( $l, 'name', 'text', 'Nombre del cliente', array( 'instructions' => 'Se usa si no hay logo y como texto alternativo.' ), 'items' ),
					mq_f( $l, 'quote', 'textarea', 'Cita', array( 'rows' => 4 ), 'items' ),
					mq_f( $l, 'author', 'text', 'Autor', array(), 'items' ),
					mq_f( $l, 'role', 'text', 'Cargo', array(), 'items' ),
				),
			)
		),
	),
);
