<?php
// Línea del tiempo en carrusel (Figma Modulos › 12. Timeline, "Our history").
$l = 'timeline';
return array(
	'name'       => $l,
	'label'      => 'Línea del tiempo',
	'sub_fields' => array_merge(
		array( mq_tab( $l, 'Cabecera' ) ),
		mq_heading_fields( $l ),
		array(
			mq_tab( $l, 'Hitos' ),
			mq_f(
				$l,
				'items',
				'repeater',
				'Hitos',
				array(
					'collapsed'    => 'field_mq_' . $l . '_items_title',
					'button_label' => 'Añadir hito',
					'instructions' => 'En orden cronológico. Se numeran solos ([01], [02]…).',
					'sub_fields'   => array(
						mq_f( $l, 'title', 'text', 'Año y título', array( 'placeholder' => '1974 · Founding' ), 'items' ),
						mq_f( $l, 'text', 'textarea', 'Texto', array(), 'items' ),
						mq_f( $l, 'image', 'image', 'Imagen', array( 'preview_size' => 'thumbnail', 'instructions' => 'Opcional. Cuadrada, 300 × 300 px.' ), 'items' ),
					),
				)
			),
		)
	),
);
