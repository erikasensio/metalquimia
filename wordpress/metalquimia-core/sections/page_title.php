<?php
// Título sencillo de página (p. ej. Careers).
$l = 'page_title';
return array(
	'name'       => $l,
	'label'      => 'Título de página',
	'sub_fields' => array(
		mq_f( $l, 'eyebrow', 'text', 'Antetítulo', array( 'instructions' => 'Opcional. Texto pequeño en rojo encima del título.' ) ),
		mq_f( $l, 'title', 'text', 'Título', array( 'required' => 1, 'instructions' => 'Mejor una o dos palabras: se ve muy grande.' ) ),
		mq_f( $l, 'subtitle', 'textarea', 'Subtítulo', array( 'instructions' => 'Opcional. Párrafo corto debajo del título.' ) ),
	),
);
