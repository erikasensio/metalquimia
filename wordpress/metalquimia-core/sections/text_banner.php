<?php
// Banner negro con una frase grande centrada (Figma Modulos › 5. Text Banner).
$l = 'text_banner';
return array(
	'name'       => $l,
	'label'      => 'Banner de texto',
	'sub_fields' => array(
		mq_f( $l, 'eyebrow', 'text', 'Antetítulo', array( 'instructions' => 'Opcional. Texto pequeño en rojo encima de la frase.' ) ),
		mq_f( $l, 'title_muted', 'textarea', 'Frase (parte en gris)', array( 'rows' => 2, 'instructions' => 'Primera parte de la frase, en gris.' ) ),
		mq_f( $l, 'title', 'textarea', 'Frase (parte destacada)', array( 'rows' => 2, 'instructions' => 'Continúa la frase, en blanco. Entre las dos partes, máximo unas 25 palabras.' ) ),
	),
);
