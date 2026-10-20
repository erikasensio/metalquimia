<?php
// Texto + imagen a dos columnas (Figma Modulos › 15. Combo Text+Media).
$l = 'media_text';
return array(
	'name'       => $l,
	'label'      => 'Texto + imagen',
	'sub_fields' => array_merge(
		array(
			mq_tab( $l, 'Contenido' ),
			mq_theme_field( $l, 'light' ),
			mq_f(
				$l,
				'image_position',
				'button_group',
				'Posición de la imagen',
				array(
					'choices'       => array(
						'right' => 'Derecha',
						'left'  => 'Izquierda',
					),
					'default_value' => 'right',
					'instructions'  => 'En móvil la imagen siempre va arriba.',
				)
			),
		),
		mq_heading_fields( $l, array( 'subtitle' => false, 'button' => false ) ),
		array(
			mq_f( $l, 'text', 'wysiwyg', 'Texto', array( 'media_upload' => 0, 'toolbar' => 'basic', 'tabs' => 'visual' ) ),
			mq_f( $l, 'details', 'textarea', 'Datos adicionales', array( 'rows' => 3, 'instructions' => 'Opcional. Líneas cortas como dirección o teléfono; cada línea se respeta tal cual.' ) ),
			mq_f( $l, 'button', 'link', 'Botón' ),
			mq_f( $l, 'image', 'image', 'Imagen', array( 'instructions' => 'Horizontal, mínimo 1600 × 1280 px (JPG o WebP). Las esquinas se recortan en diagonal. También admite vídeo MP4 corto sin sonido.' ) ),
		)
	),
);
