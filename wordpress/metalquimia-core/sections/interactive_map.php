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
		mq_f( $l, 'show_filters', 'true_false', 'Filtros por continente y país (representantes)', array( 'instructions' => 'Diseño de la página de Representantes: mapa a la derecha y, a la izquierda, dos desplegables (continente y país) con la ficha del representante elegido. Sustituye al listado con buscador.' ) ),
		mq_f( $l, 'continent_label', 'text', 'Texto sobre el desplegable de continente', array( 'placeholder' => 'Ver representantes por continente', 'conditional_logic' => array( array( array( 'field' => 'field_mq_' . $l . '_show_filters', 'operator' => '==', 'value' => '1' ) ) ) ) ),
		mq_f( $l, 'country_label', 'text', 'Texto sobre el desplegable de país', array( 'placeholder' => 'Ver representante por país', 'conditional_logic' => array( array( array( 'field' => 'field_mq_' . $l . '_show_filters', 'operator' => '==', 'value' => '1' ) ) ) ) ),
		mq_f( $l, 'all_label', 'text', 'Opción «todos» de los desplegables', array( 'placeholder' => 'View All', 'conditional_logic' => array( array( array( 'field' => 'field_mq_' . $l . '_show_filters', 'operator' => '==', 'value' => '1' ) ) ) ) ),
		mq_f( $l, 'map_link_label', 'text', 'Texto del enlace a Google Maps', array( 'placeholder' => 'View on the map', 'conditional_logic' => array( array( array( 'field' => 'field_mq_' . $l . '_show_filters', 'operator' => '==', 'value' => '1' ) ) ) ) ),
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
					mq_f( $l, 'subtitle', 'text', 'Subtítulo', array( 'instructions' => 'P. ej. Headquarters, Representative… En representantes, la persona de contacto.' ), 'locations' ),
					mq_f( $l, 'continent', 'text', 'Continente', array( 'placeholder' => 'Europa', 'instructions' => 'Solo con los filtros de representantes. Escríbelo igual en todas las ubicaciones del mismo continente.' ), 'locations' ),
					mq_f( $l, 'country', 'text', 'País', array( 'placeholder' => 'Tailandia', 'instructions' => 'Solo con los filtros de representantes.' ), 'locations' ),
					mq_f( $l, 'lat', 'number', 'Latitud', array( 'required' => 1, 'step' => 'any', 'placeholder' => '41.9794' ), 'locations' ),
					mq_f( $l, 'lng', 'number', 'Longitud', array( 'required' => 1, 'step' => 'any', 'placeholder' => '2.8214' ), 'locations' ),
					mq_f( $l, 'address', 'textarea', 'Dirección', array( 'instructions' => 'Puedes usar varias líneas.' ), 'locations' ),
					mq_f( $l, 'phone', 'text', 'Teléfono', array( 'placeholder' => '+34 972 21 22 23' ), 'locations' ),
					mq_f( $l, 'fax', 'text', 'Fax', array( 'placeholder' => '+34 972 21 22 24' ), 'locations' ),
					mq_f( $l, 'email', 'email', 'Email', array(), 'locations' ),
					mq_f( $l, 'website', 'url', 'Web', array( 'placeholder' => 'https://www.ejemplo.com' ), 'locations' ),
					mq_f( $l, 'image', 'image', 'Foto o logo', array( 'preview_size' => 'thumbnail', 'instructions' => 'Opcional. Oficinas: horizontal, ≈ 800 × 450 px. Representantes: el logo, cuadrado (≈ 128 × 128 px).' ), 'locations' ),
					mq_f( $l, 'hours', 'textarea', 'Horario', array( 'instructions' => 'Opcional. Una línea por franja (p. ej. Mon–Fri 8:00–17:00).' ), 'locations' ),
				),
			)
		),
	),
);
