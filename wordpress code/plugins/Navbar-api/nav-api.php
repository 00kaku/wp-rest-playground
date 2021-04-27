<?php
/**
 * Plugin Name: Nav-Api
 * description: A plugin to create custom end point for nav in rest api
 * Version: 1.0
 * Author: Akash Sharma
 * Author URI: http://github.com/00kaku

 * @package rest-playground
 */

/**
 * Function to return navbar to rest api call.

 * @return 'Navbar'
 */
function add_nav() {
	return wp_nav_menu( array( 'menu' ) );
}
	add_action(
		'rest_api_init',
		function() {
			register_rest_route(
				'wc/v1',
				'nav',
				array(
					'methods'  => 'GET',
					'callback' => 'add_nav',
				)
			);
		}
	);
