<?php
// Imagen + lista de ventajas con icono (Figma Modulos › 9. Feature Highlights). Fondo negro.
$l = 'feature_highlights';
return array(
	'name'       => $l,
	'label'      => 'Ventajas con imagen (fondo negro)',
	'sub_fields' => array_merge(
		array( mq_tab( $l, 'Cabecera' ) ),
		mq_heading_fields( $l ),
		array(
			mq_tab( $l, 'Contenido' ),
			mq_f( $l, 'image', 'image', 'Imagen', array( 'instructions' => 'Imagen vertical o cuadrada, mínimo 1400 × 1750 px (JPG o WebP). También admite vídeo MP4 corto sin sonido.' ) ),
			mq_f(
				$l,
				'items',
				'repeater',
				'Ventajas',
				array(
					'max'          => 4,
					'collapsed'    => 'field_mq_' . $l . '_items_lead',
					'button_label' => 'Añadir ventaja',
					'instructions' => 'Recomendado: 3. El texto destacado se ve en blanco y negrita y el resto sigue en gris en el mismo párrafo.',
					'sub_fields'   => array(
						mq_f( $l, 'icon', 'image', 'Icono', array( 'preview_size' => 'thumbnail', 'instructions' => 'SVG o PNG transparente de 64 × 64 px, en blanco o claro.' ), 'items' ),
						mq_f( $l, 'lead', 'text', 'Texto destacado', array( 'placeholder' => 'Expert support.' ), 'items' ),
						mq_f( $l, 'text', 'textarea', 'Texto', array(), 'items' ),
					),
				)
			),
		)
	),
);
