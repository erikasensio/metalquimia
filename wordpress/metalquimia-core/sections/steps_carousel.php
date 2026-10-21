<?php
// Carrusel de pasos numerados con imagen (Figma Modulos › 13. Steps Carousel).
$l = 'steps_carousel';
return array(
	'name'       => $l,
	'label'      => 'Carrusel de pasos',
	'sub_fields' => array_merge(
		array( mq_tab( $l, 'Cabecera' ), mq_theme_field( $l, 'light' ) ),
		mq_heading_fields( $l ),
		array(
			mq_tab( $l, 'Pasos' ),
			mq_f(
				$l,
				'items',
				'repeater',
				'Pasos',
				array(
					'collapsed'    => 'field_mq_' . $l . '_items_lead',
					'button_label' => 'Añadir paso',
					'instructions' => 'Se numeran solos ([01], [02]…).',
					'sub_fields'   => array(
						mq_f( $l, 'image', 'image', 'Imagen', array( 'instructions' => 'Horizontal 3:2, mínimo 1000 × 670 px (JPG o WebP).' ), 'items' ),
						mq_f( $l, 'lead', 'text', 'Texto destacado', array(), 'items' ),
						mq_f( $l, 'text', 'textarea', 'Texto', array(), 'items' ),
					),
				)
			),
		)
	),
);
