<?php
// Tarjetas de casos de éxito en tres columnas (Figma Modulos › 25. Case Studies).
$l = 'case_studies';
return array(
	'name'       => $l,
	'label'      => 'Casos de éxito',
	'sub_fields' => array(
		mq_tab( $l, 'Cabecera' ),
		...mq_heading_fields( $l ),
		mq_tab( $l, 'Casos' ),
		mq_f( $l, 'read_label', 'text', 'Texto de la etiqueta de cada tarjeta', array( 'placeholder' => 'READ CASE', 'instructions' => 'Aparece abajo en todas las tarjetas.' ) ),
		mq_f(
			$l,
			'items',
			'repeater',
			'Casos',
			array(
				'collapsed'    => 'field_mq_' . $l . '_items_title',
				'button_label' => 'Añadir caso',
				'instructions' => 'Se colocan de tres en tres.',
				'sub_fields'   => array(
					mq_f( $l, 'category', 'text', 'Categoría', array( 'instructions' => 'Texto corto en rojo (p. ej. COOKED HAM).' ), 'items' ),
					mq_f( $l, 'title', 'textarea', 'Título', array( 'rows' => 2 ), 'items' ),
					mq_f( $l, 'link', 'link', 'Enlace', array( 'instructions' => 'Página del caso de éxito.' ), 'items' ),
				),
			)
		),
	),
);
