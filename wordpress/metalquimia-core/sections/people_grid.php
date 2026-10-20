<?php
// Rejilla de personas con foto (página About, "Presidency").
$l = 'people_grid';
return array(
	'name'       => $l,
	'label'      => 'Equipo (rejilla de personas)',
	'sub_fields' => array_merge(
		array( mq_tab( $l, 'Cabecera' ) ),
		mq_heading_fields( $l ),
		array(
			mq_tab( $l, 'Personas' ),
			mq_f(
				$l,
				'items',
				'repeater',
				'Personas',
				array(
					'collapsed'    => 'field_mq_' . $l . '_items_name',
					'button_label' => 'Añadir persona',
					'sub_fields'   => array(
						mq_f( $l, 'photo', 'image', 'Foto', array( 'preview_size' => 'thumbnail', 'instructions' => 'Vertical 4:5, mínimo 800 × 1000 px (JPG o WebP).' ), 'items' ),
						mq_f( $l, 'name', 'text', 'Nombre', array(), 'items' ),
						mq_f( $l, 'role', 'text', 'Cargo', array(), 'items' ),
						mq_f( $l, 'link', 'link', 'Perfil de LinkedIn', array( 'instructions' => 'Opcional.' ), 'items' ),
					),
				)
			),
		)
	),
);
