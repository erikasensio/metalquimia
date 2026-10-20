<?php
// Dos imágenes una al lado de la otra (Figma Modulos › 18. Two Column Media).
$l = 'two_column_media';
return array(
	'name'       => $l,
	'label'      => 'Dos imágenes',
	'sub_fields' => array(
		mq_theme_field( $l, 'dark' ),
		mq_f(
			$l,
			'items',
			'repeater',
			'Imágenes',
			array(
				'layout'       => 'table',
				'max'          => 2,
				'button_label' => 'Añadir imagen',
				'sub_fields'   => array(
					mq_f( $l, 'image', 'image', 'Imagen', array( 'preview_size' => 'thumbnail', 'instructions' => 'Horizontal, ≈ 1400 × 960 px. También acepta un vídeo MP4 corto.' ), 'items' ),
					mq_f( $l, 'caption', 'text', 'Pie de foto', array( 'instructions' => 'Opcional.' ), 'items' ),
				),
			)
		),
	),
);
