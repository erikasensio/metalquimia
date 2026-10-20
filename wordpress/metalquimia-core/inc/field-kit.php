<?php
defined( 'ABSPATH' ) || exit;

/**
 * Atajos para declarar los campos de los módulos de /sections sin repetir claves.
 * La clave de cada campo es field_mq_{layout}_{ruta}, única en todo el sitio.
 *
 *   mq_f( 'media_text', 'title', 'textarea', 'Título', array( 'rows' => 2 ) )
 */
function mq_f( string $layout, string $name, string $type, string $label, array $extra = array(), string $parent = '' ): array {
	$defaults = array();
	switch ( $type ) {
		case 'image':
			$defaults = array( 'return_format' => 'array', 'preview_size' => 'medium', 'library' => 'all' );
			break;
		case 'file':
			$defaults = array( 'return_format' => 'array' );
			break;
		case 'textarea':
			$defaults = array( 'rows' => 3, 'new_lines' => '' );
			break;
		case 'repeater':
			$defaults = array( 'layout' => 'block', 'button_label' => 'Añadir' );
			break;
		case 'true_false':
			$defaults = array( 'ui' => 1 );
			break;
	}
	return array_merge(
		array(
			'key'   => 'field_mq_' . $layout . '_' . ( $parent ? $parent . '_' : '' ) . $name,
			'label' => $label,
			'name'  => $name,
			'type'  => $type,
		),
		$defaults,
		$extra
	);
}

/** Antetítulo + título en dos tonos + subtítulo (+ botón): la cabecera que comparten casi todos los módulos. */
function mq_heading_fields( string $layout, array $opts = array() ): array {
	$fields = array(
		mq_f( $layout, 'eyebrow', 'text', 'Antetítulo', array( 'instructions' => 'Texto pequeño en mayúsculas encima del título (p. ej. OUR SOLUTIONS).' ) ),
		mq_f( $layout, 'title_muted', 'textarea', 'Título (parte en gris)', array( 'rows' => 2, 'instructions' => 'Primera parte del título, en gris. Puede quedar vacía.' ) ),
		mq_f( $layout, 'title', 'textarea', 'Título (parte destacada)', array( 'rows' => 2 ) ),
	);
	if ( $opts['subtitle'] ?? true ) {
		$fields[] = mq_f( $layout, 'subtitle', 'textarea', 'Subtítulo' );
	}
	if ( $opts['button'] ?? true ) {
		$fields[] = mq_f( $layout, 'button', 'link', 'Botón' );
	}
	return $fields;
}

/** Pestaña del editor para agrupar campos ("Contenido", "Elementos"…). */
function mq_tab( string $layout, string $label ): array {
	return array(
		'key'   => 'field_mq_' . $layout . '_tab_' . sanitize_key( $label ),
		'label' => $label,
		'name'  => '',
		'type'  => 'tab',
	);
}

/** Selector de tema claro / oscuro de la sección. */
function mq_theme_field( string $layout, string $default = 'light' ): array {
	return mq_f(
		$layout,
		'theme',
		'button_group',
		'Fondo',
		array(
			'choices'       => array(
				'light' => 'Blanco',
				'dark'  => 'Negro',
			),
			'default_value' => $default,
		)
	);
}
