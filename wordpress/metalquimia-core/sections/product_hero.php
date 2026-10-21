<?php
// Hero de la página de una máquina (Figma Páginas › Página de máquina 193:4073 › product-hero). Va el primero; la cabecera queda encima.
$l = 'product_hero';
return array(
	'name'       => $l,
	'label'      => 'Hero de producto (máquina)',
	'sub_fields' => array(
		mq_tab( $l, 'Máquina' ),
		mq_f( $l, 'image', 'image', 'Imagen de la máquina', array( 'required' => 1, 'instructions' => 'PNG o WebP recortado con fondo transparente, apaisado (≈ 1800 × 1350 px). Se ve centrado sobre el fondo gris oscuro.' ) ),
		mq_f( $l, 'title', 'text', 'Nombre', array( 'placeholder' => 'Movistick Triplex', 'instructions' => 'Abajo a la izquierda.' ) ),
		mq_f( $l, 'subtitle', 'textarea', 'Frase', array( 'rows' => 2, 'instructions' => 'Frase corta debajo del nombre (máximo 2 líneas).' ) ),
		mq_tab( $l, 'Tarjeta' ),
		mq_f( $l, 'card_image', 'image', 'Miniatura', array( 'preview_size' => 'thumbnail', 'instructions' => 'Opcional. Cuadrada, se ve a 64 × 64 px sobre blanco. Si está vacía se usa la imagen de la máquina.' ) ),
		mq_f( $l, 'card_text', 'textarea', 'Texto de la tarjeta', array( 'rows' => 2, 'instructions' => 'P. ej. «Get more information about this product».' ) ),
		mq_f( $l, 'card_button', 'link', 'Botón de la tarjeta', array( 'instructions' => 'Botón rojo (p. ej. REQUEST INFORMATION). Si el botón y el texto están vacíos, la tarjeta no se muestra.' ) ),
	),
);
