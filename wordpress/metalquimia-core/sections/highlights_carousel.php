<?php
// Carrusel de tarjetas altas con imagen y texto (Figma Modulos › 11. Highlights Carousel).
$l = 'highlights_carousel';
return array(
	'name'       => $l,
	'label'      => 'Carrusel de tarjetas con imagen',
	'sub_fields' => array_merge(
		array( mq_tab( $l, 'Cabecera' ), mq_theme_field( $l, 'dark' ) ),
		mq_heading_fields( $l ),
		array(
			mq_tab( $l, 'Tarjetas' ),
			mq_f(
				$l,
				'items',
				'repeater',
				'Tarjetas',
				array(
					'collapsed'    => 'field_mq_' . $l . '_items_lead',
					'button_label' => 'Añadir tarjeta',
					'sub_fields'   => array(
						mq_f( $l, 'image', 'image', 'Imagen', array( 'instructions' => 'Vertical ≈ 9:10, mínimo 960 × 1080 px (JPG o WebP). Si la tarjeta lleva texto, va arriba sobre un degradado oscuro.' ), 'items' ),
						mq_f(
							$l,
							'tone',
							'select',
							'Imagen',
							array(
								'choices'       => array(
									'dark'  => 'Oscura (texto claro sobre degradado negro)',
									'light' => 'Clara, blanca arriba (texto destacado en negro)',
								),
								'default_value' => 'dark',
							),
							'items'
						),
						mq_f( $l, 'lead', 'text', 'Texto destacado', array(), 'items' ),
						mq_f( $l, 'text', 'textarea', 'Texto', array(), 'items' ),						mq_f( $l, 'link', 'link', 'Enlace', array( 'instructions' => 'Opcional: toda la tarjeta lleva a esta página.' ), 'items' ),
					),
				)
			),
		)
	),
);
