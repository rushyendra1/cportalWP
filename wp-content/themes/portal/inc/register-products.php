<?php
add_action('init', 'product_register');

function product_register() 
{
	
	$labels = array(
		'name' => _x('Products', 'post type general name'),
		'singular_name' => _x('Product', 'post type singular name'),
		'add_new' => _x('Add New', 'val_pack'),
		'add_new_item' => __('Add New Product'),
		'edit_item' => __('Edit Product'),
		'new_item' => __('New Product'),
		'view_item' => __('View Product'),
		'search_items' => __('Search Products'),
		'not_found' =>  __('No products found'),
		'not_found_in_trash' => __('No products found in Trash'), 
		'parent_item_colon' => ''
	);
	
	$args = array(
		'labels' => $labels,
		'public' => true,
		'show_ui' => true,
		'capability_type' => 'page',
		'hierarchical' => false,
		'rewrite' => array( 'slug'=>'product' ),
		'query_var' => true,
		'show_in_nav_menus' => false,
		'supports' => array( 'title','thumbnail','excerpt','page-attributes','editor','comments')
	);
	
	register_post_type( 'product' , $args );
	
	
	$lbls_taxonomy = array(
		'name'              => _x( 'Product Types', 'taxonomy general name' ),
		'singular_name'     => _x( 'Product Type', 'taxonomy singular name' ),
		'search_items'      => __( 'Search Product Types' ),
		'all_items'         => __( 'All Product Types' ),		
		'edit_item'         => __( 'Edit Product Type' ),
		'update_item'       => __( 'Update Product Type' ),
		'add_new_item'      => __( 'Add New Product Type' ),
		'new_item_name'     => __( 'New Product Type' ),
		'menu_name'         => __( 'Product Types' )
	);
	
	register_taxonomy("product_type", 
		array( "product" ), 
		array(	"hierarchical" => true, 
		"labels" => $lbls_taxonomy, 
		"singular_label" => "Product Type", 
		"show_admin_column" => true,
		"single_value" => true,
		"rewrite" => true,
		"query_var" => true		
	));
	
	flush_rewrite_rules();
}

#portfolio_columns, <-  register_post_type then append _columns
//add_filter("manage_edit-portfolio_columns", "prod_edit_columns");
//add_action("manage_posts_custom_column",  "prod_custom_columns");

function prod_edit_columns($columns)
{
	$newcolumns = array(
		"cb" => "<input type=\"checkbox\" />",
		"thumb column-comments" => "Image",
		"title" => "Title",
		"portfolio_entries" => "Categories"
	);
	
	$columns= array_merge($newcolumns, $columns);
	
	return $columns;
}

function prod_custom_columns($column)
{
	global $post;
	switch ($column)
	{
		case "thumb column-comments":
		if (has_post_thumbnail($post->ID)){
				echo get_the_post_thumbnail($post->ID, 'widget');
			}
		break;
	
		case "description":
		#the_excerpt();
		break;
		case "price":
		#$custom = get_post_custom();
		#echo $custom["price"][0];
		break;
		case "portfolio_entries":
		echo get_the_term_list($post->ID, 'portfolio_entries', '', ', ','');
		break;
	}
}
?>