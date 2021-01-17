<?php
/*
Plugin Name: Gutenberg Popover
*/

function gutenberg_popover_register_block()
{

	// Register JavasScript File build/index.js
	wp_register_script(
		'gutenberg-popover',
		plugins_url('build/index.js', __FILE__),
		array('wp-blocks', 'wp-element', 'wp-editor'),
		filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
	);

	// Register editor style build/index.css
	wp_register_style(
		'gutenberg-popover-editor-style',
		plugins_url('build/index.css', __FILE__),
		array('wp-edit-blocks'),
		filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
	);

	// Register front end block style build/style-index.css
	wp_register_style(
		'gutenberg-popover-frontend-style',
		plugins_url('build/style-index.css', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
	);

	// Register your block
	register_block_type('gutenberg-popover/example', array(
		'editor_script' => 'gutenberg-popover',
		'editor_style' => 'gutenberg-popover-editor-style',
		'style' => 'gutenberg-popover-frontend-style',
	));
}

add_action('init', 'gutenberg_popover_register_block');


function gutenberg_popover_frontend_scripts()
{
	wp_enqueue_script(
		'gutenberg-popover-popper',
		plugins_url('src/plugins/popper.js', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'src/plugins/popper.js'),
		true
	);
}

add_action('wp_enqueue_scripts', 'gutenberg_popover_frontend_scripts');
