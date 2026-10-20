<?php
// Lista de características principales de una máquina, en dos columnas sobre negro (ficha de máquina › "Main characteristics").
$l = 'characteristics';
return array(
	'name'       => $l,
	'label'      => 'Características principales',
	'sub_fields' => array(
		mq_f( $l, 'eyebrow', 'text', 'Antetítulo', array( 'instructions' => 'Texto pequeño rojo encima del título. Opcional.' ) ),
		mq_f( $l, 'title', 'text', 'Título', array( 'placeholder' => 'Main characteristics' ) ),
		mq_f(
			$l,
			'items',
			'repeater',
			'Características',
			array(
				'layout'       => 'table',
				'button_label' => 'Añadir característica',
				'instructions' => 'Una frase por fila. Se reparten en dos columnas en escritorio.',
				'sub_fields'   => array(
					mq_f( $l, 'text', 'text', 'Texto', array(), 'items' ),
				),
			)
		),
		mq_f( $l, 'button', 'link', 'Botón', array( 'instructions' => 'Opcional (p. ej. REQUEST INFORMATION).', 'wrapper' => array( 'width' => 50 ) ) ),
		mq_f( $l, 'file', 'file', 'Ficha técnica (PDF)', array( 'instructions' => 'Opcional. Añade un botón de descarga.', 'mime_types' => 'pdf', 'wrapper' => array( 'width' => 50 ) ) ),
		mq_f( $l, 'button_label', 'text', 'Texto del botón de descarga', array( 'placeholder' => 'DOWNLOAD DATASHEET' ) ),
	),
);
