<?php
// Cifras destacadas con contador animado (Figma Modulos › 8. Data Highlights).
$l = 'data_highlights';
return array(
	'name'       => $l,
	'label'      => 'Cifras destacadas',
	'sub_fields' => array_merge(
		array( mq_tab( $l, 'Cabecera' ) ),
		mq_heading_fields( $l ),
		array(
			mq_tab( $l, 'Cifras' ),
			mq_f(
				$l,
				'items',
				'repeater',
				'Cifras',
				array(
					'max'          => 4,
					'layout'       => 'table',
					'collapsed'    => 'field_mq_' . $l . '_items_value',
					'button_label' => 'Añadir cifra',
					'instructions' => 'Hasta 4 cifras. El número cuenta hacia arriba al aparecer en pantalla; se respetan los símbolos de delante y detrás (p. ej. "50+", "+100", "30%").',
					'sub_fields'   => array(
						mq_f( $l, 'value', 'text', 'Cifra', array( 'placeholder' => '50+' ), 'items' ),
						mq_f( $l, 'description', 'textarea', 'Descripción', array( 'rows' => 2 ), 'items' ),
					),
				)
			),
		)
	),
);
