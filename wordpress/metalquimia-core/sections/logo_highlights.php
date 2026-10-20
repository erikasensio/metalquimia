<?php
// Fila de logos de clientes en movimiento (Figma "logo-highlights").
return array(
	'name'       => 'logo_highlights',
	'label'      => 'Logos de clientes',
	'sub_fields' => array(
		array( 'key' => 'field_mq_logo_highlights_title', 'label' => 'Título', 'name' => 'title', 'type' => 'text' ),
		array(
			'key'          => 'field_mq_logo_highlights_logos',
			'label'        => 'Logos',
			'name'         => 'logos',
			'type'         => 'repeater',
			'layout'       => 'table',
			'button_label' => 'Añadir logo',
			'instructions' => 'Arrastra las filas para cambiar el orden.',
			'sub_fields'   => array(
				array(
					'key'           => 'field_mq_logo_highlights_logo_image',
					'label'         => 'Logo',
					'name'          => 'image',
					'type'          => 'image',
					'return_format' => 'array',
					'preview_size'  => 'thumbnail',
					'instructions'  => 'PNG con fondo transparente o SVG, en gris. Máx. 140 × 67 px visibles.',
				),
				array( 'key' => 'field_mq_logo_highlights_logo_name', 'label' => 'Nombre', 'name' => 'name', 'type' => 'text' ),
				array( 'key' => 'field_mq_logo_highlights_logo_url', 'label' => 'Web (opcional)', 'name' => 'url', 'type' => 'url' ),
			),
		),
	),
);
