<?php
// Hero de la página de una máquina (Figma Modulos › 6. Product Hero). Va el primero; la cabecera queda encima.
$l = 'product_hero';
return array(
	'name'       => $l,
	'label'      => 'Hero de producto (máquina)',
	'sub_fields' => array(
		mq_tab( $l, 'Fondo y título' ),
		mq_f( $l, 'image', 'image', 'Imagen de fondo', array( 'required' => 1, 'instructions' => 'Foto oscura de la máquina, horizontal, mínimo 2800 × 1800 px.' ) ),
		mq_f( $l, 'image_mobile', 'image', 'Imagen para móvil', array( 'instructions' => 'Opcional. Vertical, 1080 × 1600 px. Si no se pone, se usa la de escritorio.' ) ),
		mq_f( $l, 'title_top', 'text', 'Título (arriba)', array( 'instructions' => 'Primera palabra del nombre (p. ej. MOVIstick). Se ve arriba a la izquierda.' ) ),
		mq_f( $l, 'title_bottom', 'text', 'Título (abajo)', array( 'instructions' => 'Segunda parte del nombre (p. ej. Plus). Se ve abajo a la izquierda.' ) ),
		mq_f( $l, 'subtitle', 'textarea', 'Subtítulo', array( 'rows' => 2, 'instructions' => 'Frase corta debajo del título.' ) ),
		mq_tab( $l, 'Tarjeta' ),
		mq_f( $l, 'card_image', 'image', 'Miniatura', array( 'preview_size' => 'thumbnail', 'instructions' => 'Foto pequeña de la tarjeta blanca (abajo a la derecha), 4:3, ≈ 300 × 225 px.' ) ),
		mq_f( $l, 'card_text', 'textarea', 'Texto de la tarjeta', array( 'rows' => 2, 'instructions' => 'P. ej. «Get more information about this product».' ) ),
		mq_f( $l, 'card_button', 'link', 'Botón de la tarjeta', array( 'instructions' => 'Botón rojo (p. ej. REQUEST INFORMATION). Si está vacío, la tarjeta no se muestra.' ) ),
	),
);
