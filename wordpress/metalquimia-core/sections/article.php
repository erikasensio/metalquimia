<?php
// Cuerpo de un artículo (detalle de caso de éxito o de insight): cabecera con imagen y contenido por bloques.
$l = 'article';

$is = fn( $types ) => array_map(
	fn( $type ) => array( array( 'field' => 'field_mq_' . $l . '_blocks_type', 'operator' => '==', 'value' => $type ) ),
	(array) $types
);

return array(
	'name'       => $l,
	'label'      => 'Artículo (caso de éxito / insight)',
	'sub_fields' => array(
		mq_tab( $l, 'Cabecera' ),
		mq_f( $l, 'category', 'text', 'Categoría', array( 'instructions' => 'Texto corto en rojo encima del título (p. ej. CASE STUDY).', 'wrapper' => array( 'width' => 50 ) ) ),
		mq_f( $l, 'date', 'text', 'Fecha de publicación', array( 'placeholder' => '18.01.2026', 'wrapper' => array( 'width' => 50 ) ) ),
		mq_f( $l, 'title', 'textarea', 'Título', array( 'rows' => 2 ) ),
		mq_f( $l, 'intro', 'textarea', 'Entradilla', array( 'instructions' => 'Párrafo de introducción, en letra más grande.' ) ),
		mq_f( $l, 'author', 'text', 'Autor', array( 'wrapper' => array( 'width' => 50 ) ) ),
		mq_f( $l, 'image', 'image', 'Imagen principal', array( 'instructions' => 'Horizontal 4:3, ≈ 1400 × 1050 px.' ) ),
		mq_f( $l, 'author_label', 'text', 'Texto "Autor"', array( 'placeholder' => 'Author', 'wrapper' => array( 'width' => 50 ) ) ),
		mq_f( $l, 'date_label', 'text', 'Texto "Publicado"', array( 'placeholder' => 'Published', 'wrapper' => array( 'width' => 50 ) ) ),
		mq_tab( $l, 'Contenido' ),
		mq_f(
			$l,
			'blocks',
			'repeater',
			'Bloques de contenido',
			array(
				'button_label' => 'Añadir bloque',
				'instructions' => 'El artículo se construye con bloques en orden: elige el tipo de cada uno y rellena solo sus campos.',
				'sub_fields'   => array(
					mq_f(
						$l,
						'type',
						'select',
						'Tipo de bloque',
						array(
							'choices'       => array(
								'heading' => 'Título de apartado',
								'text'    => 'Texto',
								'image'   => 'Imagen',
								'quote'   => 'Cita destacada',
							),
							'default_value' => 'text',
						),
						'blocks'
					),
					mq_f( $l, 'title', 'text', 'Título', array( 'conditional_logic' => $is( 'heading' ) ), 'blocks' ),
					mq_f( $l, 'subtitle', 'text', 'Subtítulo', array( 'instructions' => 'Opcional, en gris debajo del título.', 'conditional_logic' => $is( 'heading' ) ), 'blocks' ),
					mq_f(
						$l,
						'text',
						'wysiwyg',
						'Texto',
						array(
							'tabs'              => 'all',
							'toolbar'           => 'basic',
							'media_upload'      => 0,
							'conditional_logic' => $is( 'text' ),
						),
						'blocks'
					),
					mq_f( $l, 'image', 'image', 'Imagen', array( 'instructions' => 'Horizontal 16:9, ≈ 1600 × 900 px.', 'conditional_logic' => $is( 'image' ) ), 'blocks' ),
					mq_f( $l, 'caption', 'text', 'Pie de foto / autor de la cita', array( 'conditional_logic' => $is( array( 'image', 'quote' ) ) ), 'blocks' ),
					mq_f( $l, 'quote', 'textarea', 'Cita', array( 'conditional_logic' => $is( 'quote' ) ), 'blocks' ),
				),
			)
		),
	),
);
