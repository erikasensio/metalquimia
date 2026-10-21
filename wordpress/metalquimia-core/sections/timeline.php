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
						mq_f( $l, 'title', 'text', 'Año o título', array( 'placeholder' => '1985' ), 'items' ),
						mq_f( $l, 'lead', 'text', 'Frase destacada', array( 'instructions' => 'Abre el texto, en negro (p. ej. «The beginning of Metalquimia»).' ), 'items' ),
						mq_f( $l, 'text', 'textarea', 'Texto', array(), 'items' ),
						mq_f( $l, 'image', 'image', 'Imagen', array( 'preview_size' => 'thumbnail', 'instructions' => 'Opcional. Cuadrada, 320 × 320 px.' ), 'items' ),
					),
				)
			),
		)
	),
);
