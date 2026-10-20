<?php
// Lista de enlaces: personas u ofertas de empleo (Figma Modulos › 17. List w links).
$l = 'link_list';
return array(
	'name'       => $l,
	'label'      => 'Lista con enlaces (personas / ofertas)',
	'sub_fields' => array_merge(
		array(
			mq_tab( $l, 'Cabecera' ),
			mq_f(
				$l,
				'align',
				'button_group',
				'Alineación',
				array(
					'choices'       => array(
						'left'   => 'Izquierda',
						'center' => 'Centrada',
					),
					'default_value' => 'left',
				)
			),
		),
		mq_heading_fields( $l, array( 'button' => false ) ),
		array(
			mq_tab( $l, 'Elementos' ),
			mq_f(
				$l,
				'items',
				'repeater',
				'Elementos',
				array(
					'layout'       => 'table',
					'collapsed'    => 'field_mq_' . $l . '_items_name',
					'button_label' => 'Añadir elemento',
					'sub_fields'   => array(
						mq_f( $l, 'avatar', 'image', 'Foto', array( 'preview_size' => 'thumbnail', 'instructions' => 'Opcional. Cuadrada, 200 × 200 px.' ), 'items' ),
						mq_f( $l, 'name', 'text', 'Nombre o puesto', array(), 'items' ),
						mq_f( $l, 'role', 'text', 'Detalle', array( 'instructions' => 'Cargo, ubicación…' ), 'items' ),
						mq_f( $l, 'link', 'link', 'Enlace', array(), 'items' ),
					),
				)
			),
		)
	),
);
