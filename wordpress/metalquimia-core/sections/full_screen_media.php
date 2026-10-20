<?php
// Imagen o vídeo a sangre con botón para ver un vídeo (Figma Modulos › 19. Full Screen Media).
$l = 'full_screen_media';
return array(
	'name'       => $l,
	'label'      => 'Imagen / vídeo a pantalla completa',
	'sub_fields' => array(
		mq_f( $l, 'image', 'image', 'Imagen de fondo', array( 'instructions' => 'Foto horizontal, mínimo 2800 × 1600 px. También sirve de portada mientras carga el vídeo de fondo.' ) ),
		mq_f(
			$l,
			'video',
			'file',
			'Vídeo de fondo (opcional)',
			array(
				'mime_types'   => 'mp4',
				'instructions' => 'MP4 corto y sin sonido (10–20 s, menos de 10 MB) que se reproduce en bucle en lugar de la foto.',
			)
		),
		mq_f( $l, 'video_url', 'url', 'Vídeo completo', array( 'instructions' => 'Enlace de YouTube, Vimeo o un .mp4 que se abre al pulsar el botón. Si no se pone (ni hay vídeo de fondo), no aparece el botón.' ) ),
		mq_f( $l, 'button_label', 'text', 'Texto del botón', array( 'placeholder' => 'WATCH VIDEO' ) ),
	),
);
