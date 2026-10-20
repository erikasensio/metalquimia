<?php
// Mapa del mundo con oficinas / representantes (Figma Modulos › 20. Interactive Map; también "Our offices" y "Representatives").
$l = 'interactive_map';
return array(
	'name'       => $l,
	'label'      => 'Mapa interactivo (oficinas / representantes)',
	'sub_fields' => array(
		mq_tab( $l, 'Cabecera' ),
		...mq_heading_fields( $l, array( 'button' => false ) ),
		mq_tab( $l, 'Mapa' ),
		mq_f(
			$l,
			'focus',
			'button_group',
			'Zona del mapa',
			array(
				'choices'       => array(
					'world'  => 'Mundo',
					'europe' => 'Europa',
				),
				'default_value' => 'world',
				'instructions'  => '"Europa" amplía Europa y el norte de África; los puntos fuera de esa zona no se verán.',
			)
		),
		mq_f( $l, 'show_list', 'true_false', 'Mostrar listado con buscador', array( 'instructions' => 'Añade a la izquierda del mapa un panel con todas las ubicaciones y un buscador (útil con muchos representantes).' ) ),
		mq_f(
			$l,
			'search_placeholder',
			'text',
			'Texto del buscador',
			array(
				'placeholder'       => 'Search by country or city',
				'conditional_logic' => array( array( array( 'field' => 'field_mq_' . $l . '_show_list', 'operator' => '==', 'value' => '1' ) ) ),
			)
		),
		mq_tab( $l, 'Ubicaciones' ),
		mq_f(
			$l,
			'locations',
			'repeater',
			'Ubicaciones',
			array(
				'collapsed'    => 'field_mq_' . $l . '_locations_name',
				'button_label' => 'Añadir ubicación',
				'instructions' => 'Cada ubicación es un punto rojo en el mapa. Para sacar las coordenadas: en Google Maps, clic derecho sobre el sitio y pulsa los números que aparecen (el primero es la latitud y el segundo la longitud).',
				'sub_fields'   => array(
					mq_f( $l, 'name', 'text', 'Nombre', array( 'required' => 1, 'instructions' => 'P. ej. Metalquimia Spain o el país del representante.' ), 'locations' ),
					mq_f( $l, 'subtitle', 'text', 'Subtítulo', array( 'instructions' => 'P. ej. Headquarters, Representative…' ), 'locations' ),
					mq_f( $l, 'lat', 'number', 'Latitud', array( 'required' => 1, 'step' => 'any', 'placeholder' => '41.9794' ), 'locations' ),
					mq_f( $l, 'lng', 'number', 'Longitud', array( 'required' => 1, 'step' => 'any', 'placeholder' => '2.8214' ), 'locations' ),
					mq_f( $l, 'address', 'textarea', 'Dirección', array( 'instructions' => 'Puedes usar varias líneas.' ), 'locations' ),
					mq_f( $l, 'phone', 'text', 'Teléfono', array( 'placeholder' => '+34 972 21 22 23' ), 'locations' ),
					mq_f( $l, 'email', 'email', 'Email', array(), 'locations' ),
					mq_f( $l, 'image', 'image', 'Foto', array( 'preview_size' => 'thumbnail', 'instructions' => 'Opcional. Horizontal, ≈ 800 × 450 px.' ), 'locations' ),
					mq_f( $l, 'hours', 'textarea', 'Horario', array( 'instructions' => 'Opcional. Una línea por franja (p. ej. Mon–Fri 8:00–17:00).' ), 'locations' ),
				),
			)
		),
	),
);
