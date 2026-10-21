<?php
// Presentación de una máquina: foto grande a la izquierda y texto con icono a la derecha (Figma Página de máquina › feature-highlight). Fondo negro.
$l = 'product_intro';
return array(
	'name'       => $l,
	'label'      => 'Presentación de producto (foto + texto)',
	'sub_fields' => array(
		mq_f( $l, 'image', 'image', 'Imagen', array( 'instructions' => 'Foto horizontal 5:4 (mínimo 1720 × 1364 px, JPG o WebP). También admite vídeo MP4 corto sin sonido.' ) ),
		mq_f( $l, 'text', 'textarea', 'Texto', array( 'rows' => 8, 'instructions' => 'Presentación de la máquina. Deja una línea en blanco para separar párrafos. Recomendado: 2 párrafos, unas 90 palabras en total.' ) ),
	),
);
