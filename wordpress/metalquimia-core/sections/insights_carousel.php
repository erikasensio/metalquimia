<?php
// Carrusel de noticias / recursos (Figma Modulos › 14. Insights Carousel).
$l = 'insights_carousel';
return array(
	'name'       => $l,
	'label'      => 'Carrusel de noticias o recursos',
	'sub_fields' => array(
		mq_tab( $l, 'Cabecera' ),
		mq_f( $l, 'title', 'text', 'Título', array( 'placeholder' => 'Latest Insights' ) ),
		mq_f( $l, 'button', 'link', 'Botón', array( 'instructions' => 'Por ejemplo "VER TODOS", enlazando al listado completo.' ) ),
		mq_tab( $l, 'Tarjetas' ),
		mq_f(
			$l,
			'items',
			'repeater',
			'Tarjetas',
			array(
				'collapsed'    => 'field_mq_' . $l . '_items_title',
				'button_label' => 'Añadir tarjeta',
				'sub_fields'   => array(
					mq_f( $l, 'image', 'image', 'Imagen', array( 'instructions' => 'Vertical 4:5, mínimo 900 × 1125 px (JPG o WebP).' ), 'items' ),
					mq_f( $l, 'category', 'text', 'Categoría', array( 'placeholder' => 'NEWS' ), 'items' ),
					mq_f( $l, 'date', 'text', 'Fecha', array( 'placeholder' => '12.03.2025' ), 'items' ),
					mq_f( $l, 'title', 'textarea', 'Título', array( 'rows' => 2 ), 'items' ),
					mq_f( $l, 'link', 'link', 'Enlace', array(), 'items' ),
				),
			)
		),
	),
);
