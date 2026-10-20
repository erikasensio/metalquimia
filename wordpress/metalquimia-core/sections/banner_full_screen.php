<?php
// Foto a sangre con titular grande abajo a la izquierda (Figma Modulos › 4. Banner Full Screen).
$l = 'banner_full_screen';
return array(
	'name'       => $l,
	'label'      => 'Banner a pantalla completa',
	'sub_fields' => array(
		mq_f( $l, 'image', 'image', 'Imagen de fondo', array( 'required' => 1, 'instructions' => 'Foto horizontal, mínimo 2800 × 1700 px. Mejor oscura abajo a la izquierda, donde va el texto.' ) ),
		mq_f(
			$l,
			'lines',
			'repeater',
			'Líneas del titular',
			array(
				'layout'       => 'table',
				'max'          => 4,
				'button_label' => 'Añadir línea',
				'instructions' => 'Cada fila es una línea del titular (p. ej. «Our patents.», «Our process.», «Our advantage.»). La última se desvanece.',
				'sub_fields'   => array( mq_f( $l, 'text', 'text', 'Texto', array(), 'lines' ) ),
			)
		),
		mq_f( $l, 'button', 'link', 'Botón', array( 'instructions' => 'Opcional (p. ej. LEARN MORE).' ) ),
		mq_f(
			$l,
			'corner_color',
			'button_group',
			'Color de las esquinas',
			array(
				'choices'       => array(
					'white' => 'Blanco',
					'black' => 'Negro',
				),
				'default_value' => 'white',
				'instructions'  => 'Las esquinas recortadas deben ser del mismo color que el fondo de las secciones de arriba y de abajo.',
			)
		),
	),
);
