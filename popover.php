<?php
/*
Plugin Name: Popover
*/

function my_custom_block_register_block()
{

	// Register JavasScript File build/index.js
	wp_register_script(
		'popover',
		plugins_url('build/index.js', __FILE__),
		array('wp-blocks', 'wp-element', 'wp-editor'),
		filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
	);

	// Register editor style src/editor.css
	wp_register_style(
		'popover-editor-style',
		plugins_url('src/editor.css', __FILE__),
		array('wp-edit-blocks'),
		filemtime(plugin_dir_path(__FILE__) . 'src/editor.css')
	);

	// Register front end block style src/style.css
	wp_register_style(
		'popover-frontend-style',
		plugins_url('src/style.css', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'src/style.css')
	);

	// Register your block
	register_block_type('myguten-block/test-block', array(
		'editor_script' => 'popover',
		'editor_style' => 'popover-editor-style',
		'style' => 'popover-frontend-style',
	));
}

add_action('init', 'my_custom_block_register_block');

function popover_frontend_scripts()
{
	wp_enqueue_script(
		'blockgallery-masonry',
		plugins_url('src/plugins/popper.js', __FILE__),
		array('jquery', 'masonry', 'imagesloaded'),
		filemtime(plugin_dir_path(__FILE__) . 'src/plugins/popper.js'),
		true
	);
}

add_action('wp_enqueue_scripts', 'popover_frontend_scripts');
