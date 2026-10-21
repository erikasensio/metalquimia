<?php
// Listado de noticias / recursos / casos de éxito con filtros y "Cargar más" (Figma Casos de éxito / Recursos 459:27939).
$l = 'insights_grid';
return array(
	'name'       => $l,
	'label'      => 'Listado de noticias / recursos',
	'sub_fields' => array(
		mq_tab( $l, 'Cabecera' ),
		mq_f( $l, 'title', 'text', 'Título', array( 'placeholder' => 'Latest Insights', 'instructions' => 'Título grande de la cabecera negra (va arriba del todo de la página).' ) ),
		mq_f( $l, 'subtitle', 'textarea', 'Subtítulo', array( 'rows' => 2, 'instructions' => 'Opcional; en el diseño no hay.' ) ),
		mq_tab( $l, 'Listado' ),
		mq_f( $l, 'all_label', 'text', 'Texto de la pestaña "Todas"', array( 'placeholder' => 'ALL', 'wrapper' => array( 'width' => 50 ) ) ),
		mq_f( $l, 'load_more_label', 'text', 'Texto del botón "Cargar más"', array( 'placeholder' => 'LOAD MORE', 'wrapper' => array( 'width' => 50 ) ) ),
		mq_f(
			$l,
			'items',
			'repeater',
			'Artículos',
			array(
				'collapsed'    => 'field_mq_' . $l . '_items_title',
				'button_label' => 'Añadir artículo',
				'instructions' => 'Se muestran 12 al principio y el resto con el botón "Cargar más". Ordénalos del más reciente al más antiguo. Los filtros salen de las categorías que escribas.',
				'sub_fields'   => array(
					mq_f( $l, 'image', 'image', 'Imagen', array( 'preview_size' => 'thumbnail', 'instructions' => 'Vertical, ≈ 952 × 1400 px.' ), 'items' ),
					mq_f( $l, 'category', 'text', 'Categoría', array( 'instructions' => 'Escríbela siempre igual (p. ej. COOKED, MARINATED) para que se agrupe en el mismo filtro.', 'wrapper' => array( 'width' => 50 ) ), 'items' ),
					mq_f( $l, 'date', 'text', 'Fecha', array( 'placeholder' => '12.03.2026', 'wrapper' => array( 'width' => 50 ) ), 'items' ),
					mq_f( $l, 'title', 'textarea', 'Título', array( 'rows' => 2 ), 'items' ),
					mq_f( $l, 'link', 'link', 'Enlace', array(), 'items' ),
				),
			)
		),
	),
);
