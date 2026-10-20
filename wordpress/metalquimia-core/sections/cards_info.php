<?php
// Rejilla de tarjetas con imagen, título y texto (Figma Modulos › 22. Cards Info).
$l = 'cards_info';
return array(
	'name'       => $l,
	'label'      => 'Tarjetas informativas',
	'sub_fields' => array_merge(
		array(
			mq_tab( $l, 'Cabecera' ),
			mq_f(
				$l,
				'columns',
				'button_group',
				'Columnas en escritorio',
				array(
					'choices'       => array(
						'3' => '3',
						'4' => '4',
					),
					'default_value' => '3',
				)
			),
		),
		mq_heading_fields( $l ),
		array(
			mq_tab( $l, 'Tarjetas' ),
			mq_f(
				$l,
				'items',
				'repeater',
				'Tarjetas',
				array(
					'collapsed'    => 'field_mq_' . $l . '_items_title',
					'button_label' => 'Añadir tarjeta',
					'sub_fields'   => array(
						mq_f( $l, 'image', 'image', 'Imagen', array( 'instructions' => 'Horizontal 4:3, mínimo 1000 × 750 px (JPG o WebP).' ), 'items' ),
						mq_f( $l, 'title', 'text', 'Título', array(), 'items' ),
						mq_f( $l, 'text', 'textarea', 'Texto', array(), 'items' ),
						mq_f( $l, 'link', 'link', 'Enlace', array( 'instructions' => 'Opcional: toda la tarjeta lleva a esta página.' ), 'items' ),
					),
				)
			),
		)
	),
);
