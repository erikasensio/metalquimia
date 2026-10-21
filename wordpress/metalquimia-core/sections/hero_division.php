<?php
// Hero de las páginas de solución: Cooked, Marinated, Cured… (Figma Modulos › 3. Hero Division Carousel).
$l = 'hero_division';
return array(
	'name'       => $l,
	'label'      => 'Hero de solución (carrusel de productos flotando)',
	'sub_fields' => array(
		mq_tab( $l, 'Imágenes' ),
		mq_f( $l, 'word', 'text', 'Palabra de fondo', array( 'instructions' => 'Una palabra corta que se ve enorme en gris claro detrás de los productos (p. ej. Cooked).' ) ),
		mq_f(
			$l,
			'images',
			'repeater',
			'Productos',
			array(
				'layout'       => 'table',
				'min'          => 0,
				'max'          => 12,
				'button_label' => 'Añadir producto',
				'instructions' => 'Entre 4 y 12 productos: pasan solos en bucle, flotando. Arrastra para cambiar el orden.',
				'sub_fields'   => array(
					mq_f( $l, 'image', 'image', 'Imagen', array( 'preview_size' => 'thumbnail', 'instructions' => 'PNG o WebP recortado con fondo transparente, vertical ≈ 760 × 950 px.' ), 'images' ),
				),
			)
		),
		mq_tab( $l, 'Texto' ),
		mq_f( $l, 'title_muted', 'textarea', 'Título (parte en gris)', array( 'rows' => 2, 'instructions' => 'Primera parte del título, en gris. Puede quedar vacía.' ) ),
		mq_f( $l, 'title', 'textarea', 'Título (parte en negro)', array( 'rows' => 2 ) ),
		mq_f( $l, 'text', 'textarea', 'Texto', array( 'rows' => 4, 'instructions' => 'Párrafo corto debajo del título.' ) ),
		mq_f( $l, 'button', 'link', 'Botón', array( 'instructions' => 'P. ej. REQUEST INFO.' ) ),
	),
);
