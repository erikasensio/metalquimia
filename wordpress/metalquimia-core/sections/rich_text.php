<?php
// Sección de ejemplo para probar el flujo. Los módulos reales del Figma se añaden como archivos hermanos.
return array(
	'name'       => 'rich_text',
	'label'      => 'Texto',
	'sub_fields' => array(
		array( 'key' => 'field_mq_rich_text_title', 'label' => 'Título', 'name' => 'title', 'type' => 'text' ),
		array( 'key' => 'field_mq_rich_text_content', 'label' => 'Contenido', 'name' => 'content', 'type' => 'wysiwyg', 'media_upload' => 0 ),
	),
);
