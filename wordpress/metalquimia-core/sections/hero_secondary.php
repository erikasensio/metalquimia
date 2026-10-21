<?php
// Hero secundario de páginas interiores (Figma Modulos › 2. Secondary Hero). Va el primero de la página, con fondo blanco.
$l = 'hero_secondary';
return array(
	'name'       => $l,
	'label'      => 'Hero secundario (páginas interiores)',
	'sub_fields' => array(
		mq_tab( $l, 'Texto' ),
		mq_f(
			$l,
			'layout',
			'button_group',
			'Disposición',
			array(
				'choices'       => array(
					'split'   => 'Título a la izquierda y texto a la derecha',
					'stacked' => 'Frase en una columna con el botón debajo',
				),
				'default_value' => 'split',
				'instructions'  => '«Frase en una columna» es para una frase larga, como el propósito de la página About.',
			)
		),
		mq_f( $l, 'title_lead', 'text', 'Entradilla del título', array( 'instructions' => 'Opcional. Línea corta encima del título (p. ej. «Our purpose:»).', 'conditional_logic' => array( array( array( 'field' => 'field_mq_' . $l . '_layout', 'operator' => '==', 'value' => 'stacked' ) ) ) ) ),
		mq_f( $l, 'title', 'textarea', 'Título', array( 'rows' => 2, 'required' => 1, 'instructions' => 'Mejor una o dos palabras (p. ej. «Pet care», «Facilities»): se ve muy grande. Si es una frase larga, la letra se reduce sola.' ) ),
		mq_f( $l, 'subtitle_muted', 'textarea', 'Texto (parte en gris)', array( 'rows' => 2, 'instructions' => 'Primera parte del texto de la derecha, en gris.' ) ),
		mq_f( $l, 'subtitle', 'textarea', 'Texto (parte en negro)', array( 'rows' => 3, 'instructions' => 'Continúa el texto anterior, en negro. Máximo 2–3 líneas.' ) ),
		mq_f( $l, 'subtitle_end', 'textarea', 'Texto (final en gris)', array( 'rows' => 2, 'instructions' => 'Opcional. Cierra el texto otra vez en gris (p. ej. «using Metalquimia\'s equipment and technology.»).' ) ),
		mq_f( $l, 'scroll_highlight', 'true_false', 'Texto que se ilumina con el scroll', array( 'instructions' => 'Sí: el hero ocupa la pantalla y se queda fijo mientras el scroll ilumina el texto de la derecha palabra a palabra; cuando está todo, entra el botón y la página sigue. El texto va más grande.' ) ),
		mq_f( $l, 'lines', 'true_false', 'Fondo de líneas', array( 'instructions' => 'Dibujo de líneas gris muy suave detrás del título (solo en escritorio).' ) ),
		mq_f( $l, 'button', 'link', 'Botón', array( 'instructions' => 'Opcional (p. ej. LEARN MORE).' ) ),
		mq_tab( $l, 'Imagen' ),
		mq_f( $l, 'image', 'image', 'Imagen', array( 'instructions' => 'Opcional. Si no se pone, el hero queda solo con el texto. Para máquinas: PNG con fondo transparente (≈ 2400 × 1300 px). Para fotos: JPG horizontal de 2800 × 1200 px.' ) ),
		mq_f(
			$l,
			'image_fit',
			'button_group',
			'Ajuste de la imagen',
			array(
				'choices'       => array(
					'contain' => 'Completa (máquinas recortadas)',
					'cover'   => 'Rellenar (fotos)',
					'full'    => 'Foto a todo el ancho',
				),
				'default_value' => 'contain',
				'instructions'  => '«Completa» muestra la imagen entera sobre el degradado gris; «Rellenar» la recorta para ocupar todo el hueco; «Foto a todo el ancho» la lleva de borde a borde de la pantalla (JPG de 2800 × 1200 px) con el texto de la derecha más grande.',
			)
		),
	),
);
