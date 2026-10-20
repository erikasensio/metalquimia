<?php
// Rejilla de tarjetas con icono (Figma Modulos › 16. Bullet Points).
$l = 'bullet_points';
return array(
	'name'       => $l,
	'label'      => 'Puntos clave (tarjetas con icono)',
	'sub_fields' => array_merge(
		array( mq_tab( $l, 'Cabecera' ) ),
		mq_heading_fields( $l, array( 'button' => false ) ),
		array(
			mq_tab( $l, 'Tarjeta destacada' ),
			mq_f( $l, 'highlight_title', 'textarea', 'Título', array( 'rows' => 2, 'instructions' => 'Opcional. Tarjeta negra que aparece la primera. Si se deja vacía, no se muestra.' ) ),
			mq_f( $l, 'highlight_text', 'textarea', 'Texto' ),
			mq_f( $l, 'highlight_button', 'link', 'Botón (rojo)' ),
			mq_tab( $l, 'Tarjetas' ),
			mq_f(
				$l,
				'items',
				'repeater',
				'Tarjetas',
				array(
					'collapsed'    => 'field_mq_' . $l . '_items_title',
					'button_label' => 'Añadir tarjeta',
					'sub_fields'   => array(
						mq_f( $l, 'icon', 'image', 'Icono', array( 'preview_size' => 'thumbnail', 'instructions' => 'SVG o PNG transparente de 80 × 80 px, en color oscuro.' ), 'items' ),
						mq_f( $l, 'title', 'text', 'Título', array(), 'items' ),
						mq_f( $l, 'text', 'textarea', 'Texto', array(), 'items' ),
					),
				)
			),
		)
	),
);
