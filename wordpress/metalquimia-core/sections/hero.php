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
			'key'           => 'field_mq_hero_video',
			'label'         => 'Vídeo de fondo (opcional)',
			'name'          => 'video',
			'type'          => 'file',
			'return_format' => 'array',
			'mime_types'    => 'mp4',
			'instructions'  => 'MP4 sin sonido que avanza y retrocede con el scroll (el hero se queda fijo mientras tanto). La imagen de fondo sirve de portada mientras carga. Para que vaya fino, exportar con keyframes muy seguidos: ffmpeg -i entrada.mp4 -an -c:v libx264 -crf 23 -g 3 -keyint_min 3 -movflags +faststart salida.mp4',
		),
		array(
			'key'          => 'field_mq_hero_title',
			'label'        => 'Título',
			'name'         => 'title',
			'type'         => 'textarea',
			'rows'         => 2,
			'new_lines'    => '',
			'instructions' => 'Pulsa Intro para forzar un salto de línea. Si hay vídeo de fondo, cada línea es una frase que aparece con el scroll (la primera al empezar, la siguiente a mitad del vídeo, junto con el botón).',
		),
		array( 'key' => 'field_mq_hero_button', 'label' => 'Botón', 'name' => 'button', 'type' => 'link' ),
	),
);
