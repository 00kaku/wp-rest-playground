<?php
/**
 * Plugin Name: Posts-Api
 * description: A plugin to create custom end point for posts in rest api
 * Version: 1.0
 * Author: Akash Sharma
 * Author URI: http://github.com/00kaku

 * @package rest-playground
 */

/**
 * Function to return navbar to rest api call.

 * @param  WP_REST_Request $params Options for the function.
 * @return 'Posts'
 */
function fetch_posts( $params ) {

	$category    = $params['category'];
	$category_id = get_cat_ID( $category );
	if ( $category_id ) {
		$posts = get_posts(
			array(
				'category'       => $category_id,
				'posts_per_page' => '100',
			)
		);

		if ( empty( $posts ) ) {
			return 'oops';
		}

		$data  = array();
		$index = 0;

		foreach ( $posts as $post ) {
			$data[ $index ] = array(
				'id'             => $post->ID,
				'title'          => $post->post_title,
				'content'        => $post->post_content,
				'featured_image' => array(
					'thumbnail' => get_the_post_thumbnail_url( $post->ID, 'thumbnail' ),
					'large'     => get_the_post_thumbnail_url( $post->ID, 'large' ),
				),
			);
			$index++;
		}

		return $data;
	} else {
		return 'category does not exist';
	}
}
	add_action(
		'rest_api_init',
		function() {
			register_rest_route(
				'wc/v1',
				'posts',
				array(
					'methods'  => 'GET',
					'callback' => 'fetch_posts',
				)
			);
		}
	);
