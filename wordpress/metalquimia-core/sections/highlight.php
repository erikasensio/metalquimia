<?php
// Producto destacado entre dos palabras gigantes con etiquetas flotantes (Figma Modulos › 23. Highlight, "Meat. / The Next.").
$l = 'highlight';
return array(
	'name'       => $l,
	'label'      => 'Producto destacado (palabras gigantes)',
	'sub_fields' => array(
		mq_tab( $l, 'Escenario' ),
		mq_f( $l, 'eyebrow', 'text', 'Antetítulo', array( 'instructions' => 'Texto pequeño rojo centrado encima (p. ej. INNOVATION).' ) ),
		mq_f( $l, 'word_top', 'text', 'Palabra de arriba', array( 'placeholder' => 'Meat.', 'instructions' => 'Muy corta: se ve gigante en gris oscuro, arriba, fundida con la imagen. En móvil se une a la de abajo en una sola línea.' ) ),
		mq_f( $l, 'word_bottom', 'text', 'Palabra de abajo', array( 'placeholder' => 'The Next.', 'instructions' => 'Muy corta: se ve gigante en gris oscuro, abajo, fundida con la imagen.' ) ),
		mq_f( $l, 'image', 'image', 'Imagen del producto', array( 'instructions' => 'Foto sobre fondo negro o PNG recortado, apaisada (≈ 1400 × 1000 px). Ocupa casi todo el ancho, entre las dos palabras. En móvil no se muestra.' ) ),
		mq_f(
			$l,
			'tags',
			'repeater',
			'Etiquetas flotantes',
			array(
				'layout'       => 'block',
				'collapsed'    => 'field_mq_' . $l . '_tags_label',
				'max'          => 6,
				'button_label' => 'Añadir etiqueta',
				'instructions' => 'Hasta 6 etiquetas cortas de cristal que flotan sobre la imagen (p. ej. PARTNERSHIP FOR LIFE). Lo ideal son 3. Al pulsar una se abre su ventana con título, texto, botón e imagen. En móvil no se muestran.',
				'sub_fields'   => array(
					mq_f( $l, 'label', 'text', 'Texto de la etiqueta', array( 'required' => 1 ), 'tags' ),
					mq_f( $l, 'title', 'text', 'Título de la ventana', array( 'instructions' => 'Si dejas vacía la ventana de esta etiqueta, se usa la de la pestaña "Ventana por defecto". Si las dos están vacías, la etiqueta es solo decorativa.' ), 'tags' ),
					mq_f( $l, 'text', 'textarea', 'Texto de la ventana', array( 'rows' => 4, 'instructions' => 'Deja una línea en blanco para separar párrafos.' ), 'tags' ),
					mq_f( $l, 'button', 'link', 'Botón de la ventana', array(), 'tags' ),
					mq_f( $l, 'image', 'image', 'Imagen de la ventana', array( 'preview_size' => 'thumbnail', 'instructions' => 'Horizontal 4:3 (≈ 840 × 630 px). Va abajo del todo.' ), 'tags' ),
				),
			)
		),
		mq_tab( $l, 'Características' ),
		mq_f(
			$l,
			'items',
			'repeater',
			'Características',
			array(
				'collapsed'    => 'field_mq_' . $l . '_items_title',
				'button_label' => 'Añadir característica',
				'instructions' => 'Se muestran numeradas ([01], [02]…) en dos columnas debajo de la imagen. Lo ideal son 4.',
				'sub_fields'   => array(
					mq_f( $l, 'title', 'text', 'Título', array(), 'items' ),
					mq_f( $l, 'text', 'textarea', 'Texto', array(), 'items' ),
				),
			)
		),
		mq_tab( $l, 'Ventana por defecto' ),
		mq_f( $l, 'overlay_title', 'text', 'Título', array( 'instructions' => 'Ventana para las etiquetas que no tengan la suya propia. Déjala vacía si cada etiqueta lleva su contenido.' ) ),
		mq_f( $l, 'overlay_text', 'textarea', 'Texto' ),
		mq_f( $l, 'overlay_image', 'image', 'Imagen', array( 'instructions' => 'Horizontal 4:3 (≈ 840 × 630 px).' ) ),
		mq_f( $l, 'overlay_button', 'link', 'Botón' ),
	),
);
