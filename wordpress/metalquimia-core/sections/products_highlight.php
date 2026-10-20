<?php
// Carrusel de máquinas con filtros por categoría (Figma Modulos › 21. Products Highlight).
$l = 'products_highlight';
return array(
	'name'       => $l,
	'label'      => 'Máquinas destacadas (carrusel con filtros)',
	'sub_fields' => array(
		mq_tab( $l, 'Cabecera' ),
		...mq_heading_fields( $l ),
		mq_tab( $l, 'Máquinas' ),
		mq_f( $l, 'show_filters', 'true_false', 'Mostrar filtros por categoría', array( 'default_value' => 1, 'instructions' => 'Añade encima del carrusel una pestaña por cada categoría distinta que hayas escrito en las máquinas.' ) ),
		mq_f(
			$l,
			'all_label',
			'text',
			'Texto de la pestaña "Todas"',
			array(
				'placeholder'       => 'ALL',
				'conditional_logic' => array( array( array( 'field' => 'field_mq_' . $l . '_show_filters', 'operator' => '==', 'value' => '1' ) ) ),
			)
		),
		mq_f(
			$l,
			'items',
			'repeater',
			'Máquinas',
			array(
				'collapsed'    => 'field_mq_' . $l . '_items_name',
				'button_label' => 'Añadir máquina',
				'sub_fields'   => array(
					mq_f( $l, 'image', 'image', 'Imagen', array( 'preview_size' => 'thumbnail', 'instructions' => 'PNG recortado con fondo transparente, vertical (≈ 700 × 760 px).' ), 'items' ),
					mq_f( $l, 'name', 'text', 'Nombre', array( 'required' => 1 ), 'items' ),
					mq_f( $l, 'category', 'text', 'Categoría', array( 'instructions' => 'Escríbela siempre igual (p. ej. INJECTORS): las máquinas con el mismo texto se agrupan en el mismo filtro.' ), 'items' ),
					mq_f( $l, 'description', 'textarea', 'Descripción', array( 'rows' => 2, 'instructions' => 'Máximo 3 líneas; lo que sobre se corta.' ), 'items' ),
					mq_f( $l, 'link', 'link', 'Enlace', array( 'instructions' => 'Página de la máquina. Opcional.' ), 'items' ),
				),
			)
		),
	),
);
