<?php
// Hero a pantalla completa (Figma "hero-full-screen"). Va siempre la primera de la página.
return array(
	'name'       => 'hero',
	'label'      => 'Hero (portada)',
	'sub_fields' => array(
		array(
			'key'           => 'field_mq_hero_image',
			'label'         => 'Imagen de fondo',
			'name'          => 'image',
			'type'          => 'image',
			'return_format' => 'array',
			'required'      => 1,
			'instructions'  => 'Imagen horizontal, mínimo 2400 × 1500 px. Oscura en la parte de abajo para que se lea el título.',
		),
		array(
			'key'           => 'field_mq_hero_image_mobile',
			'label'         => 'Imagen para móvil',
			'name'          => 'image_mobile',
			'type'          => 'image',
			'return_format' => 'array',
			'instructions'  => 'Opcional. Imagen vertical para móvil (1080 × 1600 px). Si no se pone, se usa la de escritorio.',
		),
		array(
			'key'          => 'field_mq_hero_title',
			'label'        => 'Título',
			'name'         => 'title',
			'type'         => 'textarea',
			'rows'         => 2,
			'new_lines'    => '',
			'instructions' => 'Pulsa Intro para forzar un salto de línea.',
		),
		array( 'key' => 'field_mq_hero_button', 'label' => 'Botón', 'name' => 'button', 'type' => 'link' ),
	),
);
