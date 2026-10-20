<?php
// Transición decorativa con franjas entre una sección clara y una oscura (Figma "gradient").
return array(
	'name'       => 'gradient_divider',
	'label'      => 'Transición blanco / negro',
	'sub_fields' => array(
		array(
			'key'           => 'field_mq_gradient_divider_direction',
			'label'         => 'Dirección',
			'name'          => 'direction',
			'type'          => 'button_group',
			'choices'       => array(
				'down' => 'De blanco a negro',
				'up'   => 'De negro a blanco',
			),
			'default_value' => 'down',
		),
	),
);
