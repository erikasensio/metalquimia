<?php
// Rejilla de soluciones con producto recortado (página Soluciones, mismo estilo que el megamenú).
$l = 'solutions_grid';
return array(
	'name'       => $l,
	'label'      => 'Rejilla de soluciones',
	'sub_fields' => array(
		mq_tab( $l, 'Cabecera' ),
		...mq_heading_fields( $l ),
		mq_tab( $l, 'Soluciones' ),
		mq_f(
			$l,
			'items',
			'repeater',
			'Soluciones',
			array(
				'collapsed'    => 'field_mq_' . $l . '_items_name',
				'button_label' => 'Añadir solución',
				'instructions' => 'Dos por fila en móvil y tres en escritorio.',
				'sub_fields'   => array(
					mq_f( $l, 'image', 'image', 'Imagen del producto', array( 'preview_size' => 'thumbnail', 'instructions' => 'PNG recortado con fondo transparente, cuadrado (≈ 800 × 800 px).' ), 'items' ),
					mq_f( $l, 'name', 'text', 'Nombre', array( 'required' => 1, 'placeholder' => 'Cooked' ), 'items' ),
					mq_f( $l, 'text', 'textarea', 'Texto', array( 'rows' => 2, 'instructions' => 'Corto. No se muestra en móvil.' ), 'items' ),
					mq_f( $l, 'link', 'link', 'Enlace', array(), 'items' ),
				),
			)
		),
	),
);
