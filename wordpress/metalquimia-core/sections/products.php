<?php
// Bloque de soluciones por categoría con pestañas (Figma "products").
return array(
	'name'       => 'products',
	'label'      => 'Soluciones por categoría',
	'sub_fields' => array(
		array( 'key' => 'field_mq_products_eyebrow', 'label' => 'Antetítulo', 'name' => 'eyebrow', 'type' => 'text', 'placeholder' => 'OUR SOLUTIONS' ),
		array(
			'key'          => 'field_mq_products_title_muted',
			'label'        => 'Título (parte en degradado gris)',
			'name'         => 'title_muted',
			'type'         => 'textarea',
			'rows'         => 2,
			'new_lines'    => '',
			'instructions' => 'Primera parte del título, que se ve en degradado de negro a gris.',
		),
		array(
			'key'          => 'field_mq_products_title',
			'label'        => 'Título (parte en negro)',
			'name'         => 'title',
			'type'         => 'textarea',
			'rows'         => 2,
			'new_lines'    => '',
		),
		array( 'key' => 'field_mq_products_button', 'label' => 'Botón', 'name' => 'button', 'type' => 'link' ),
		array(
			'key'          => 'field_mq_products_categories',
			'label'        => 'Categorías',
			'name'         => 'categories',
			'type'         => 'repeater',
			'layout'       => 'block',
			'collapsed'    => 'field_mq_products_cat_name',
			'button_label' => 'Añadir categoría',
			'instructions' => 'Cada categoría es una pestaña ([01] COOKED…). La primera se ve al cargar.',
			'sub_fields'   => array(
				array( 'key' => 'field_mq_products_cat_name', 'label' => 'Nombre', 'name' => 'name', 'type' => 'text', 'required' => 1, 'instructions' => 'Palabra corta: se ve en grande de fondo.' ),
				array(
					'key'           => 'field_mq_products_cat_image',
					'label'         => 'Imagen del producto',
					'name'          => 'image',
					'type'          => 'image',
					'return_format' => 'array',
					'instructions'  => 'PNG recortado con fondo transparente, vertical (≈ 930 × 1260 px).',
				),
				array(
					'key'          => 'field_mq_products_cat_processes',
					'label'        => 'Procesos',
					'name'         => 'processes',
					'type'         => 'repeater',
					'layout'       => 'table',
					'button_label' => 'Añadir proceso',
					'sub_fields'   => array(
						array( 'key' => 'field_mq_products_proc_label', 'label' => 'Texto', 'name' => 'label', 'type' => 'text' ),
						array( 'key' => 'field_mq_products_proc_link', 'label' => 'Enlace', 'name' => 'link', 'type' => 'link' ),
						array(
							'key'           => 'field_mq_products_proc_thumb',
							'label'         => 'Miniatura',
							'name'          => 'thumbnail',
							'type'          => 'image',
							'return_format' => 'array',
							'preview_size'  => 'thumbnail',
							'instructions'  => 'Aparece al pasar el ratón.',
						),
					),
				),
			),
		),
	),
);
