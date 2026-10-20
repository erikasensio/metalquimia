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
				'layout'       => 'table',
				'max'          => 6,
				'button_label' => 'Añadir etiqueta',
				'instructions' => 'Hasta 6 etiquetas cortas que flotan sobre la imagen (p. ej. PARTNERSHIP FOR LIFE). Lo ideal son 3. En móvil no se muestran.',
				'sub_fields'   => array(
					mq_f( $l, 'label', 'text', 'Texto', array(), 'tags' ),
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
		mq_tab( $l, 'Ventana emergente' ),
		mq_f( $l, 'overlay_title', 'text', 'Título', array( 'instructions' => 'Si rellenas esta pestaña, al pulsar cualquier etiqueta se abre una tarjeta blanca con esta información. Déjala vacía para que las etiquetas sean solo decorativas.' ) ),
		mq_f( $l, 'overlay_text', 'textarea', 'Texto' ),
		mq_f( $l, 'overlay_image', 'image', 'Imagen', array( 'instructions' => 'Vertical u horizontal, ≈ 600 × 600 px.' ) ),
		mq_f( $l, 'overlay_button', 'link', 'Botón' ),
	),
);
