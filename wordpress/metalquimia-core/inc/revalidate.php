<?php
defined( 'ABSPATH' ) || exit;

/** Avisa al front para que regenere lo que ha cambiado. */
function mq_revalidate( array $tags ): void {
	if ( ! defined( 'MQ_FRONT_URL' ) || ! defined( 'MQ_REVALIDATE_SECRET' ) ) {
		return;
	}
	wp_remote_post(
		untrailingslashit( MQ_FRONT_URL ) . '/api/revalidate',
		array(
			'blocking' => false,
			'timeout'  => 5,
			'headers'  => array( 'Content-Type' => 'application/json' ),
			'body'     => wp_json_encode(
				array(
					'secret' => MQ_REVALIDATE_SECRET,
					'tags'   => array_values( array_unique( $tags ) ),
				)
			),
		)
	);
}

// Páginas: se invalida la propia página. Si cambia el slug o se borra, todo (afecta a enlaces y menús).
add_action(
	'acf/save_post',
	function ( $post_id ) {
		if ( is_string( $post_id ) && str_starts_with( $post_id, 'mq_global_' ) ) {
			mq_revalidate( array( 'global:' . substr( $post_id, strlen( 'mq_global_' ) ) ) );
			return;
		}
		if ( ! is_numeric( $post_id ) || 'page' !== get_post_type( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}
		$path = mq_page_path( (int) $post_id );
		mq_revalidate( array( 'page:' . mq_post_language( (int) $post_id ) . ':' . ( '' === $path ? '/' : $path ) ) );
	},
	20
);

add_action(
	'post_updated',
	function ( $post_id, $after, $before ) {
		if ( 'page' === $after->post_type && ( $after->post_name !== $before->post_name || $after->post_status !== $before->post_status ) ) {
			mq_revalidate( array( 'wp' ) );
		}
	},
	10,
	3
);
add_action( 'wp_update_nav_menu', fn() => mq_revalidate( array( 'wp' ) ) );
add_action( 'trashed_post', fn() => mq_revalidate( array( 'wp' ) ) );
