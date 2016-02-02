<?php
/**
 * Portal functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 * 
 * @package WordPress
 * @subpackage Portal
 * @since Portal 1.0
 */

define("LOGIN_URL", get_option("wc_sf_login_url"));
define("CLIENT_ID",get_option("wc_sf_client_id"));
define("CLIENT_SECRET",get_option("wc_sf_client_secret"));
define("REDIRECT_URI",get_option("wc_sf_client_redirect_uri"));
define ("PUBLIC_URL",get_option("wc_sf_public_site_url"));
define("REFRESH_TOKEN",get_option("wc_sf_refresh_token"));
define("INSTANCE_URL",get_option("wc_sf_instance_url"));

 /*$current_user = wp_get_current_user();
 $user_id = $current_user->ID;
 $username = $current_user->user_login;
  $name = $username;
 */
    
$sales_url = "/services/apexrest/CustomerPortal/";
$sales = $sales_url."/RegisterDetails";
$login_time_url = $sales."?method=LoginLogoutDetails";
$tab_url = $sales."?method=GetTabDetails";

/**
 * Set up the content width value based on the theme's design.
 *
 * @see twentyfourteen_content_width()
 *
 * @since Twenty Fourteen 1.0
 */
if ( ! isset( $content_width ) ) {
	$content_width = 474;
}

/**
 * Twenty Fourteen only works in WordPress 3.6 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '3.6', '<' ) ) {
	//require get_template_directory() . '/inc/back-compat.php';
}

if ( ! function_exists( 'twentyfourteen_setup' ) ) :
/**
 * Portal setup.
 *
 * Set up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support post thumbnails.
 *
 * @since Twenty Fourteen 1.0
 */
function twentyfourteen_setup() {

	/*
	 * Make Twenty Fourteen available for translation.
	 *
	 * Translations can be added to the /languages/ directory.
	 * If you're building a theme based on Twenty Fourteen, use a find and
	 * replace to change 'twentyfourteen' to the name of your theme in all
	 * template files.
	 */
	load_theme_textdomain( 'twentyfourteen', get_template_directory() . '/languages' );

	// This theme styles the visual editor to resemble the theme style.
	add_editor_style( array( 'css/editor-style.css', twentyfourteen_font_url() ) );

	// Add RSS feed links to <head> for posts and comments.
	add_theme_support( 'automatic-feed-links' );

	// Enable support for Post Thumbnails, and declare two sizes.
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 672, 372, true );
	add_image_size( 'twentyfourteen-full-width', 1038, 576, true );

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(		
		'primary'   => __( 'Header menu', 'twentyfourteen' ),		
		'footer' => __( 'Footer Menu', 'twentyfourteen' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'audio', 'quote', 'link', 'gallery',
	) );

	// This theme allows users to set a custom background.
	add_theme_support( 'custom-background', apply_filters( 'twentyfourteen_custom_background_args', array(
		'default-color' => 'f5f5f5',
	) ) );

	// Add support for featured content.
	add_theme_support( 'featured-content', array(
		'featured_content_filter' => 'twentyfourteen_get_featured_posts',
		'max_posts' => 6,
	) );

	// This theme uses its own gallery styles.
	add_filter( 'use_default_gallery_style', '__return_false' );
}
endif; // twentyfourteen_setup
add_action( 'after_setup_theme', 'twentyfourteen_setup' );



require_once( 'inc/register-products.php' );			// register custom post types for products
require_once( 'inc/register-wc-settings.php' );			// register waste collection settings



/**
 * Adjust content_width value for image attachment template.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_content_width() {
	if ( is_attachment() && wp_attachment_is_image() ) {
		$GLOBALS['content_width'] = 810;
	}
}
add_action( 'template_redirect', 'twentyfourteen_content_width' );

/**
 * Getter function for Featured Content Plugin.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return array An array of WP_Post objects.
 */
function twentyfourteen_get_featured_posts() {
	/**
	 * Filter the featured posts to return in Twenty Fourteen.
	 *
	 * @since Twenty Fourteen 1.0
	 *
	 * @param array|bool $posts Array of featured posts, otherwise false.
	 */
	return apply_filters( 'twentyfourteen_get_featured_posts', array() );
}

/**
 * A helper conditional function that returns a boolean value.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return bool Whether there are featured posts.
 */
function twentyfourteen_has_featured_posts() {
	return ! is_paged() && (bool) twentyfourteen_get_featured_posts();
}

/**
 * Register three Twenty Fourteen widget areas.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_widgets_init() {
	require get_template_directory() . '/inc/widgets.php';
	register_widget( 'Twenty_Fourteen_Ephemera_Widget' );

	register_sidebar( array(
		'name'          => __( 'Primary Sidebar', 'twentyfourteen' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Main sidebar that appears on the left.', 'twentyfourteen' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	register_sidebar( array(
		'name'          => __( 'Content Sidebar', 'twentyfourteen' ),
		'id'            => 'sidebar-2',
		'description'   => __( 'Additional sidebar that appears on the right.', 'twentyfourteen' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	register_sidebar( array(
		'name'          => __( 'Footer Widget Area', 'twentyfourteen' ),
		'id'            => 'sidebar-3',
		'description'   => __( 'Appears in the footer section of the site.', 'twentyfourteen' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	register_sidebar( array(
		'name'          => __( 'Page Sidebar', 'twentyfourteen' ),
		'id'            => 'sidebar-4',
		'description'   => __( 'A sidebar that appears on the right of pages.', 'twentyfourteen' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'twentyfourteen_widgets_init' );

/**
 * Register Lato Google font for Twenty Fourteen.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return string
 */
function twentyfourteen_font_url() {
	$font_url = '';
	/*
	 * Translators: If there are characters in your language that are not supported
	 * by Lato, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' !== _x( 'on', 'Lato font: on or off', 'twentyfourteen' ) ) {
		$font_url = add_query_arg( 'family', urlencode( 'Lato:300,400,700,900,300italic,400italic,700italic' ), "//fonts.googleapis.com/css" );
	}

	return $font_url;
}

/**
 * Enqueue scripts and styles for the front end.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_scripts() {
	// Add Lato font, used in the main stylesheet.
	// wp_enqueue_style( 'twentyfourteen-lato', twentyfourteen_font_url(), array(), null );

	// wp_enqueue_style( 'wc-montserrat', "//fonts.googleapis.com/css?family=Montserrat", array(), null );
	// wp_enqueue_style( 'wc-droid', "//fonts.googleapis.com/css?family=Droid+Sans|Montserrat", array(), null );
	// wp_enqueue_style( 'wc-muli', "//fonts.googleapis.com/css?family=Muli", array(), null );

	// Add Genericons font, used in the main stylesheet.
	//wp_enqueue_style( 'genericons', get_template_directory_uri() . '/genericons/genericons.css', array(), '3.0.2' );

	// Load the Internet Explorer specific stylesheet.
	//wp_enqueue_style( 'twentyfourteen-ie', get_template_directory_uri() . '/css/ie.css', array( 'twentyfourteen-style', 'genericons' ), '20131205' );
	//wp_style_add_data( 'twentyfourteen-ie', 'conditional', 'lt IE 9' );
	
	
	
	//wp_enqueue_style( 'wc-jquery-ui', get_template_directory_uri() . '/css/jquery-ui-1.9.2.custom.min.css', array(), '20140215' );
        //wp_enqueue_style( 'wc-jquery-ui', get_template_directory_uri() . '/css/jquery-ui-1.9.2.custom.min.css', array(), '20140215' );
	//wp_enqueue_style( 'wc-bootstrap', get_template_directory_uri() . '/css/bootstrap.min.css', array( 'wc-jquery-ui' ), '20140215' );
	//wp_enqueue_style( 'wc-bootstrap-responsive', get_template_directory_uri() . '/css/bootstrap-responsive.min.css', array( 'wc-bootstrap' ), '20140215' );		
	
	
	// Load our main stylesheet.
	//wp_enqueue_style( 'twentyfourteen-style', get_stylesheet_uri(), array( 'wc-bootstrap-responsive' ) );
	
	
	wp_enqueue_script( 'wc-jquery-ui', get_template_directory_uri() . '/js/jquery-ui-1.10.4.min.js', array( 'jquery' ), '20140513' );

	//wp_enqueue_script( 'bootstrap', get_template_directory_uri() . '/js/bootstrap.min.js', array( 'jquery' ), '20141105', true );

	/*if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && wp_attachment_is_image() ) {
		wp_enqueue_script( 'twentyfourteen-keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '20130402' );
	}*/

	if ( is_active_sidebar( 'sidebar-3' ) ) {
		wp_enqueue_script( 'jquery-masonry' );
	}

	/*if ( is_front_page() && 'slider' == get_theme_mod( 'featured_content_layout' ) ) {
		wp_enqueue_script( 'twentyfourteen-slider', get_template_directory_uri() . '/js/slider.js', array( 'jquery' ), '20131205', true );
		wp_localize_script( 'twentyfourteen-slider', 'featuredSliderDefaults', array(
			'prevText' => __( 'Previous', 'twentyfourteen' ),
			'nextText' => __( 'Next', 'twentyfourteen' )
		) );
	}*/

	//wp_enqueue_script( 'twentyfourteen-script', get_template_directory_uri() . '/js/functions.js', array( 'jquery' ), '20131209' );

	//wp_enqueue_script( 'wc-jquery-slides', get_template_directory_uri() . '/js/jquery.slides.min.js', array( 'jquery' ), '20131209' );

	//wp_enqueue_script( 'wc-jquery-cookie', get_template_directory_uri() . '/js/jquery.cookie.js', array( 'jquery' ), '20150624' );

	//wp_enqueue_script( 'wc-custom', get_template_directory_uri() . '/js/custom.js', array( 'jquery' ), '20140109', true );

}
add_action( 'wp_enqueue_scripts', 'twentyfourteen_scripts' );

/**
 * Enqueue Google fonts style to admin screen for custom header display.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_admin_fonts() {
	wp_enqueue_style( 'twentyfourteen-lato', twentyfourteen_font_url(), array(), null );
}
add_action( 'admin_print_scripts-appearance_page_custom-header', 'twentyfourteen_admin_fonts' );

if ( ! function_exists( 'twentyfourteen_the_attached_image' ) ) :
/**
 * Print the attached image with a link to the next attached image.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_the_attached_image() {
	$post                = get_post();
	/**
	 * Filter the default Twenty Fourteen attachment size.
	 *
	 * @since Twenty Fourteen 1.0
	 *
	 * @param array $dimensions {
	 *     An array of height and width dimensions.
	 *
	 *     @type int $height Height of the image in pixels. Default 810.
	 *     @type int $width  Width of the image in pixels. Default 810.
	 * }
	 */
	$attachment_size     = apply_filters( 'twentyfourteen_attachment_size', array( 810, 810 ) );
	$next_attachment_url = wp_get_attachment_url();

	/*
	 * Grab the IDs of all the image attachments in a gallery so we can get the URL
	 * of the next adjacent image in a gallery, or the first image (if we're
	 * looking at the last image in a gallery), or, in a gallery of one, just the
	 * link to that image file.
	 */
	$attachment_ids = get_posts( array(
		'post_parent'    => $post->post_parent,
		'fields'         => 'ids',
		'numberposts'    => -1,
		'post_status'    => 'inherit',
		'post_type'      => 'attachment',
		'post_mime_type' => 'image',
		'order'          => 'ASC',
		'orderby'        => 'menu_order ID',
	) );

	// If there is more than 1 attachment in a gallery...
	if ( count( $attachment_ids ) > 1 ) {
		foreach ( $attachment_ids as $attachment_id ) {
			if ( $attachment_id == $post->ID ) {
				$next_id = current( $attachment_ids );
				break;
			}
		}

		// get the URL of the next image attachment...
		if ( $next_id ) {
			$next_attachment_url = get_attachment_link( $next_id );
		}

		// or get the URL of the first image attachment.
		else {
			$next_attachment_url = get_attachment_link( array_shift( $attachment_ids ) );
		}
	}

	printf( '<a href="%1$s" rel="attachment">%2$s</a>',
		esc_url( $next_attachment_url ),
		wp_get_attachment_image( $post->ID, $attachment_size )
	);
}
endif;

if ( ! function_exists( 'twentyfourteen_list_authors' ) ) :
/**
 * Print a list of all site contributors who published at least one post.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_list_authors() {
	$contributor_ids = get_users( array(
		'fields'  => 'ID',
		'orderby' => 'post_count',
		'order'   => 'DESC',
		'who'     => 'authors',
	) );

	foreach ( $contributor_ids as $contributor_id ) :
		$post_count = count_user_posts( $contributor_id );

		// Move on if user has not published a post (yet).
		if ( ! $post_count ) {
			continue;
		}
	?>

	<div class="contributor">
		<div class="contributor-info">
			<div class="contributor-avatar"><?php echo get_avatar( $contributor_id, 132 ); ?></div>
			<div class="contributor-summary">
				<h2 class="contributor-name"><?php echo get_the_author_meta( 'display_name', $contributor_id ); ?></h2>
				<p class="contributor-bio">
					<?php echo get_the_author_meta( 'description', $contributor_id ); ?>
				</p>
				<a class="contributor-posts-link" href="<?php echo esc_url( get_author_posts_url( $contributor_id ) ); ?>">
					<?php printf( _n( '%d Article', '%d Articles', $post_count, 'twentyfourteen' ), $post_count ); ?>
				</a>
			</div><!-- .contributor-summary -->
		</div><!-- .contributor-info -->
	</div><!-- .contributor -->

	<?php
	endforeach;
}
endif;

/**
 * Extend the default WordPress body classes.
 *
 * Adds body classes to denote:
 * 1. Single or multiple authors.
 * 2. Presence of header image.
 * 3. Index views.
 * 4. Full-width content layout.
 * 5. Presence of footer widgets.
 * 6. Single views.
 * 7. Featured content layout.
 *
 * @since Twenty Fourteen 1.0
 *
 * @param array $classes A list of existing body class values.
 * @return array The filtered body class list.
 */
function twentyfourteen_body_classes( $classes ) {
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	if ( get_header_image() ) {
		$classes[] = 'header-image';
	} else {
		$classes[] = 'masthead-fixed';
	}

	if ( is_archive() || is_search() || is_home() ) {
		$classes[] = 'list-view';
	}

	if ( ( ! is_active_sidebar( 'sidebar-2' ) )
		|| is_page_template( 'page-templates/full-width.php' )
		|| is_page_template( 'page-templates/contributors.php' )
		|| is_attachment() ) {
		$classes[] = 'full-width';
	}

	if ( is_active_sidebar( 'sidebar-3' ) ) {
		$classes[] = 'footer-widgets';
	}

	if ( is_singular() && ! is_front_page() ) {
		$classes[] = 'singular';
	}

	if ( is_front_page() && 'slider' == get_theme_mod( 'featured_content_layout' ) ) {
		$classes[] = 'slider';
	} elseif ( is_front_page() ) {
		$classes[] = 'grid';
	}

	return $classes;
}
add_filter( 'body_class', 'twentyfourteen_body_classes' );

/**
 * Extend the default WordPress post classes.
 *
 * Adds a post class to denote:
 * Non-password protected page with a post thumbnail.
 *
 * @since Twenty Fourteen 1.0
 *
 * @param array $classes A list of existing post class values.
 * @return array The filtered post class list.
 */
function twentyfourteen_post_classes( $classes ) {
	if ( ! post_password_required() && has_post_thumbnail() ) {
		$classes[] = 'has-post-thumbnail';
	}

	return $classes;
}
add_filter( 'post_class', 'twentyfourteen_post_classes' );

/**
 * Create a nicely formatted and more specific title element text for output
 * in head of document, based on current view.
 *
 * @since Twenty Fourteen 1.0
 *
 * @param string $title Default title text for current view.
 * @param string $sep Optional separator.
 * @return string The filtered title.
 */
function twentyfourteen_wp_title( $title, $sep ) {
	global $paged, $page;

	if ( is_feed() ) {
		return $title;
	}

	// Add the site name.
	$title .= get_bloginfo( 'name' );

	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) {
		$title = "$title $sep $site_description";
	}

	// Add a page number if necessary.
	if ( $paged >= 2 || $page >= 2 ) {
		$title = "$title $sep " . sprintf( __( 'Page %s', 'twentyfourteen' ), max( $paged, $page ) );
	}

	return $title;
}
add_filter( 'wp_title', 'twentyfourteen_wp_title', 10, 2 );

// Implement Custom Header features.
//require get_template_directory() . '/inc/custom-header.php';

// Custom template tags for this theme.
require get_template_directory() . '/inc/template-tags.php';

// Add Theme Customizer functionality.
require get_template_directory() . '/inc/customizer.php';

/*
 * Add Featured Content functionality.
 *
 * To overwrite in a plugin, define your own Featured_Content class on or
 * before the 'setup_theme' hook.
 */
if ( ! class_exists( 'Featured_Content' ) && 'plugins.php' !== $GLOBALS['pagenow'] ) {
	require get_template_directory() . '/inc/featured-content.php';
}


/*
 * Hide admin bar for users that are not admin.
 */
add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar() {
	//if (!current_user_can('administrator') && !is_admin()) {
	  	show_admin_bar(false);
	//}
}

/*
 * Ajax Action binding - for saving user's quote
 */
add_action('wp_ajax_save_quote', 'save_quote');
function save_quote(){

    add_user_meta( get_current_user_id(), 'saved_quotes', $_POST['accountId'] );

    echo "Quote Saved";
   
    die();

}
/**
 * Create the Sidebar
 * @name portal_sidebar
 * @return string
 * @author Rushyendra
 */
function portal_sidebar()
{
     $result = '<div id="sidebarDiv" class="fixed sidebar">
                <div class="searchDiv">
                    <div class="sidebarModuleHeader">
                        <h2><label>Search</label></h2>
                    </div>
                    <div class="sidebarModuleBody ">
                    <div class="accountListViews">
                    <select title="Search scope"  id="searchItem">
                            <option title="Search All" value="">Search All</option>
                            <option selected="selected" title="Accounts" value="Account">Accounts</option>
                            <option title="Contacts" value="Contact">Contacts</option>
                            <option title="Cases" value="Case">Cases</option>
                            <option title="Notes" value="Note">Notes</option>
                            <option title="Services" value="Service">Services</option>
                    </select></div>
                    <input type="text" value="" title="Enter search keywords" size="27" id="searchPattern" maxlength="80" id="sbstr" autocomplete="off" class="searchTextBox" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false">
                    <input type="button" title="Go!" name="search" class="redbuttonstyle searchGo" value=" Go! ">
                    </div><div class="searchFooter">
                 <a  href="'.get_site_url().'/advanced-search/">Advanced Search...</a></div>
             </div>
             <div class="recentItemModule">
             <div class="sidebarModuleHeader">
             <h2>Recently Updated Items</h2></div>
             <div class="sidebarModuleBody recentItemList"></div></div>
             
<!--<div class="messageModule">
<div class="sidebarModuleHeader">
<h2>Messages and Alerts</h2></div>
             <div class="sidebarModuleBody">
             <div class="mailMsg"><p>Message1</p></div>
             </div></div>--></div>';
     return $result;
}

/**
 * Get the salesforce connection
 * @name get_connection_sales
 * @return array
 */
function get_connection_sales()
{
    $access_token =""; $instance_url = "";

   $auth_url = LOGIN_URL."/services/oauth2/token";
 
 
     $params = "grant_type=refresh_token"
             . "&client_id=" . CLIENT_ID
             . "&client_secret=" . CLIENT_SECRET
             ."&refresh_token=".REFRESH_TOKEN;
    $json_response = connects_salesforce($auth_url,$params, FALSE,"","post");
 
 
    if( is_string($json_response))
        $response = json_decode($json_response,true);
    if(isset($response['access_token']))
       $access_token = $response['access_token'];
    if(isset($response['instance_url']))
    $instance_url = $response['instance_url'];
    
if($access_token == ""){
    echo json_encode(array("error" => 1, "message" => "Not connect the salesforce"));
    exit;
}
return array($access_token,$instance_url );
}
/**
 * Connect the salesforce
 * @name connects_salesforce
 * @param string $auth_url
 * @param array $params
 * @param boolean $is_header
 * @param string $access_token
 * @param string $type
 * @return json
 */
function connects_salesforce($auth_url,$params,$is_header,$access_token,$type)
{
    $curl = curl_init($auth_url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);   
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);   
    curl_setopt($curl, CURLOPT_HEADER, $is_header);
    if($access_token != ""){
        $headers = array("Authorization: OAuth $access_token");
        /*if($type == "patch"){
            $headers = array('Authorization: OAuth $access_token',
                 'X-HTTP-Method-Override:PATCH',
                'Content-type:application/json; charset=utf-8',
                'Accept:application/json'
                );
         
             // curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH'); 
        }*/
         /*if($type == "put"){
            $headers = array('Authorization: OAuth $access_token',
                'X-HTTP-Method-Override: PUT',
                'Content-type: application/json');
            $headers = array('Authorization: OAuth $access_token',
                'X-HTTP-Method-Override: PUT',
                "Content-Type: application/json "
                );
              curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT'); 
        }*/
        /*if($type == "post")
        {
            $headers = array("Authorization: OAuth $access_token",
                            "Content-type: application/json",
                             "Accept: application/json"
                             
                );
        }*/
       curl_setopt($curl, CURLOPT_HTTPHEADER,$headers);
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    if($type == "post" || $type == "patch"){
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
            //curl_setopt(c$url,CURLOPT_TIMEOUT,60);
            //curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    }
  
    $json_response = curl_exec($curl);
   // var_dump($json_response);
    curl_close($curl);
      
    $response = (array)json_decode($json_response);
   
    if(isset($response[0]->errorCode))
    {
        //var_dump($response);
        $admin_email = get_option("admin_email");
        mail($admin_email,$response[0]->errorCode, $response[0]->message );
        echo  json_encode(array(array("errorCode" => "Request Message" ,
            "message" => "Something event wrong. Please contact your system Administrator.")));
        exit;
    }
    return $json_response;
    

}
/**
 * Redirect to login
 * @name redirect_to_login
 * @return Void
 */
function redirect_to_login(){
   
    if(!is_user_logged_in()){
      
        header("Location:".get_site_url()."/login");
        exit;
    }
    
}
/**
 * Get the data from limit
 * @name get_data_rec_pages
 * @param array $response
 * @param int $start
 * @param int $length
 * @return array
 */
function get_data_rec_pages($response,$start,$length)
{
    $result = array();
    if(is_array($response))
    $result = array_slice($response,$start,$length);
    $result = array_values($result);
    return $result;
}
/**
 * call the files in loading
 * @name call_js_css_file
 * @return void
 * @author Rushyendra
 */
function call_js_css_files()
{
    $path = get_current_files(); 
    wp_enqueue_style("style-google-api", get_template_directory_uri()."/css/google-api.css", array(), NULL,false);      
    wp_enqueue_style("style-jquery-ui", get_template_directory_uri()."/css/jquery-ui.css", array(), NULL,false);      
    //wp_enqueue_style("style-site", get_template_directory_uri()."/css/site.css", array(), NULL,false);      
    wp_enqueue_style("style-foundataion", get_template_directory_uri()."/css/foundation.css", array(), NULL,false);      
    wp_enqueue_style("style-foundataion-icons", get_template_directory_uri()."/css/foundation-icons.css", array(), NULL,false);      
    wp_enqueue_style("style-layout", get_template_directory_uri()."/css/layout.css", array(), NULL,false);      
    wp_enqueue_style("style-fchanges", get_template_directory_uri()."/css/foundation-changes.css", array(), NULL,false);      
    wp_enqueue_style("style-stackres", get_template_directory_uri()."/css/stacktable.css", array(), NULL,false);      
    //if($path == "object-list" || $path == "view-object")
    //wp_enqueue_style("style-wc", get_template_directory_uri()."/css/wc-extended.css", array(), NULL,false);
    //else
        wp_enqueue_style("style-portal", get_template_directory_uri()."/css/portal.css", array(), NULL,false);
        wp_enqueue_style("style-portal-res", get_template_directory_uri()."/css/portal-res.css", array(), NULL,false);
        //wp_enqueue_style("style-table-res", get_template_directory_uri()."/css/table-res.css", array(), NULL,false);
    wp_enqueue_script("script-ss-jquerys", get_template_directory_uri()."/js/vendor/jquery.js", array(), NULL,false);
    wp_enqueue_script("script-s-jquerys", get_template_directory_uri()."/js/jquery-ui.js", array(), NULL,false);
    wp_enqueue_script("script-foundations", get_template_directory_uri()."/js/foundation.min.js", array(), NULL,false);
    wp_enqueue_script("script-moderans", get_template_directory_uri()."/js/vendor/modernizr.js", array(), NULL,false);
    wp_enqueue_script("script-foundations-topbar", get_template_directory_uri()."/js/foundation/foundation.topbar.js", array(), NULL,false);
    wp_enqueue_script("script-foundations-tooltip", get_template_directory_uri()."/js/foundation/foundation.tooltip.js", array(), NULL,false);
    wp_enqueue_script("script-st", get_template_directory_uri()."/js/stacktable.js", array(), NULL,false);
    wp_enqueue_script("script-ext-name", get_template_directory_uri()."/js/portal.js", array(), NULL,false);
    
    
    
}
add_action("wp_enqueue_scripts", "call_js_css_files");
function cmp_case_id($a,$b)
{
    return strcmp($a->Id , $b->Id);
}
/**
 * Compare the two arrays with Name
 * @name cmp 
 * @param string $a
 * @param string $b
 * @return int
 */
function cmp($a, $b) {
    /*if($a->Name == $b->Name) {
        return 0;
    }
    return ($a->Name > $b->Name) ? -1 : 1;*/
    return strcmp($a->Name , $b->Name);
}
/**
 * Compare the two arrays with date
 * @name dateCmp 
 * @param string $a
 * @param string $b
 * @return int
 */
function dateCmp($a, $b) {
    /*if($a->Name == $b->Name) {
        return 0;
    }
    return ($a->Name > $b->Name) ? -1 : 1;*/
    return strcmp($a->DateBy , $b->DateBy);
}
/**
 * Compare the two arrays with Account Name
 * @name cmp_account_name
 * @param string $a
 * @param string $b
 * @return int
 */
function cmp_account_name($a, $b) {
  
    return strcmp($a->Account->Name , $b->Account->Name);
}
/**
 * Compare the two arrays with Account Name
 * @name cmp_title
 * @param string $a
 * @param string $b
 * @return int
 */
function cmp_title($a, $b) {
  
    return strcmp($a->Title , $b->Title);
}
/**
 * Compare the two arrays with Phone
 * @name cmp_phone
 * @param string $a
 * @param string $b
 * @return int
 */
function cmp_phone($a, $b) {
  
    //return strcmp($a->Phone , $b->Phone);
    if($a->Phone == $b->Phone) {
        return 0;
    }
    return ($a->Phone > $b->Phone) ? -1 : 1;
}
/**
 * Compare the two arrays with Mobile
 * @name cmp_mobile
 * @param string $a
 * @param string $b
 * @return int
 */
function cmp_mobile($a, $b) {
  
    //return strcmp($a->Phone , $b->Phone);
    if($a->MobilePhone == $b->MobilePhone) {
        return 0;
    }
    return ($a->MobilePhone > $b->MobilePhone) ? -1 : 1;
}
/**
 * Compare the two arrays with Email
 * @name cmp_email
 * @param string $a
 * @param string $b
 * @return int
 */
function cmp_email($a, $b) {
  
    return strcmp($a->Email , $b->Email);
    
}
/**
 * Compare the two arrays with Postal Code
 * @name cmp_postalcode
 * @param string $a
 * @param string $b
 * @return int
 */
function cmp_postalcode($a, $b) {
  
    return strcmp($a->Mailingpostalcode , $b->Mailingpostalcode);
    
}
/**
 * Assign the value if not empty
 * @name get_values
 * @param string $mailing_city
 * @param string $mail_address
 * @return string
 */
function get_values($mailing_city,$mail_address)
{
    if($mailing_city != "")
       {
           if($mail_address != "")
               $mail_address .= "<br/>".$mailing_city;
           else
               $mail_address .= $mailing_city;
       }
       return $mail_address;
}
/**
 * Get the address
 * @name get_address
 * @param string $mailing_city
 * @param string $mailing_state
 * @param string $mailling_country
 * @param string $mailing_street
 * @param string $mailing_zip
 * @return string
 */
function get_address($mailing_city,$mailing_state, $mailling_country, $mailing_street,$mailing_zip)
{
    $mail_address = "";
       if($mailing_street != "")
       {
           $mail_address = $mailing_street;
           
       }
       $mail_address = get_values($mailing_city,$mail_address);
       $mail_address = get_values($mailing_state,$mail_address);
       $mail_address = get_values($mailing_country,$mail_address);
       $mail_address = get_values($mailing_zip,$mail_address);
       return $mail_address;
}
/**
 * Perform the post/Put salesorce functionalities
 * @name post_request
 * @param string $aurl
 * @param string $access_token
 * @param array $content_array
 * @param string $method
 * @return object
 */
function post_request($aurl, $access_token, $content_array,$method)
{
     $curl = curl_init($aurl);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);   
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);   
    curl_setopt($curl, CURLOPT_HEADER, TRUE);
    $headers = array("Authorization: OAuth $access_token",
                            "Content-type: application/json",
                             "Accept: application/json");
    
    curl_setopt($curl, CURLOPT_HTTPHEADER,$headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POST, 1);
    if($method == "PUT")
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($curl, CURLOPT_POSTFIELDS, $content_array);
    $json_response = curl_exec($curl);
    curl_close($curl); 
    return $json_response;
}
/**
 * Get the database format
 * @name get_database_format
 * @param string $given_date
 * @return string
 */
function get_database_format($given_date)
{
    $date_array = explode("/",$given_date);
    $m = 0;
    $d =0;
    $y =0000;
     if(isset($date_array[1]))
         $d = $date_array[1];
     if(isset($date_array[0]))
         $m = $date_array[0];
     if(isset($date_array[2]))
         $y = $date_array[2];
     
     return $y."-".$m."-".$d;
}
/**
 * Get the date in month format
 * @name get_month_format
 * @param string $given_date
 * @return string
 */
function get_month_format($given_date)
{
    if($given_date == "") return "";
    $date_array = explode("-",$given_date);
    $m = 0;
    $d =0;
    $y =0000;
     if(isset($date_array[2]))
         $d = $date_array[2];
     if(isset($date_array[1]))
         $m = $date_array[1];
     if(isset($date_array[0]))
         $y = $date_array[0];
     
     return $m."/".$d."/".$y;
}
/**
 * Get the date in day first
 * @name get_day_first
 * @param string $given_date
 * @return string
 */
function get_day_first($given_date)
{
    if($given_date == "") return "";
    $date_array = explode("-",$given_date);
    $m = 0;
    $d =0;
    $y =0000;
     if(isset($date_array[2]))
         $d = $date_array[2];
     if(isset($date_array[1]))
         $m = $date_array[1];
     if(isset($date_array[0]))
         $y = $date_array[0];
     
     return $d."/".$m."/".$y;
}
/**
 * Place the message
 * @name place_message
 * @return string
 */
function place_message()
{
    $result = '';
    if(isset($_SESSION['msg']) && $_SESSION['msg'] != "" )
{ $msg = $_SESSION['msg'];
//$_SESSION['msg'] = "";
unset($_SESSION['msg']);

$result ='<input type="hidden" id="msg" value="'.$msg.'" >';
}
  return $result;
}
/**
 * Get the current path
 * @name get_current_path
 * @return string
 */
function get_current_path(){
    $path =$_SERVER['REQUEST_URI'];
  $path = str_replace("/project/hmw_c/", "",$path);
  $path = str_replace("/", "",$path);
  $path_array = explode("?",$path);
   if(is_array($path_array) && count($path_array)>0 && isset($path_array[0]))
    $path = $path_array[0];
   return $path;
}
/**
 * Get the date format
 * @name get_date_format
 * @param string $given_timestamp
 * @return string
 */
function get_date_from_time($given_timestamp)
{
    $date = $time = "";
    $date_array = explode("T",$given_timestamp);
    //var_dump($date_array);
    if(isset($date_array[0]))
        $date = $date_array[0];
    if($date != "")
    {
        $m = $d= $y = "";
        $date1_array = explode("/",$date);
        if(isset($date1_array[1]))
            $m = $date1_array[1];
        if(isset($date1_array[2]))
            $d = $date1_array[2];
        if(isset($date1_array[0]))
            $y = $date1_array[0];
         $date = $d."/".$m."/".$y;
    }
    if(isset($date_array[1]))
    {
        
        $min = $sec =  0;
        $time_array = explode(":",$date_array[1]);
        if(isset($time_array[0]))
        $min = $time_array[0];
        if(isset($time_array[1]))
        $sec = $time_array[1];
        $time = $min.":".$sec;
    }
    $result = '';
    $result = $date. " " .$time;
    $result = str_replace("/", "", $result);
    return $result;
}
/**
 * Get the case origin values
 * @name case_origin_values
 * @param string $origin
 * @return string
 */
function case_origin_values($origin)
{
    $origin_file = '';
      switch($origin){
          case "Phone": $origin_file = 'phone.png';
              break;
          case "Email" :case "Email WC.com": $origin_file = 'email.png';
              break;
           case "Web": $origin_file = 'web.png';
              break;
          case "Operator": $origin_file = 'operator.png';
              break;
           case "Portal": $origin_file = 'portal.png';
              break;
      }
     return  $origin_file;
}
/**
 * Convert given string into specified formats
 * @name format_bytes
 * @param string $size
 * @param int $precision
 * @return string
 */
function format_bytes($size, $precision = 2) { 
  $base = log($size, 1024);
  $suffixes = array('', 'k', 'M', 'G', 'T');   
 return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
} 
/**
 * Get the Waste Type Image
 * @name get_wastetype_image
 * @param string $waste_type
 * @return string
 */
function get_wastetype_image($waste_type)
{
    $img_file = '';
    switch($waste_type)
    {
        case "Aerosol": case "Solvents":
            $img_file = "aerosol.jpg";
        break;
        case "Antifreeze": case "Brake fluid":
        case "Exhaust": case "Fuel":
        case "Filters":
            $img_file = "auto.png";
        break;
        case "Batteries":case "Battery":
            $img_file = "batteries.png";
        break;
        case "Bricks": case "Construction":
            $img_file = "Buil.png";
        break;
        case "Cardboard": case"Cardboard Stickers":
            $img_file = "Card.png";
        break;
        case "Dry Mixed Recycling": 
            $img_file = "DMR.png";
        break;
        case "Electrical": 
            $img_file = "Elec.png";
        break;
        case "Engine Oil": 
            $img_file = "Eng.png";
        break;
        case "Fluorescent Tubes":
            $img_file = "Flu.png";
        break;
        case "Food":
            $img_file = "Food.png";
        break;
        case "General": case "General Waste":
            $img_file = "Gen.png";
        break;
        case "Glass":
            $img_file = "Gla.png";
        break;
        case "Green Waste":
            $img_file = "Gar.png";
        break;
        case "Hardcore": case "Rubble":
            $img_file = "Hard.png";
        break;
        case "Metal":
            $img_file = "Scra.png";
        break;
        case "Paper":
            $img_file = "Pap.png";
        break;
        case "Paper & Cardboard":
            $img_file = "Pape.png";
        break;
        case "Plasterboard":
            $img_file = "Pla.png";
        break;
        case "Plastic":
            $img_file = "Plas.png";
        break;
        case "Textiles":
            $img_file = "Tex.png";
        break;
        case "Toner":
            $img_file = "Ton.png";
        break;
        case "Tyres":
            $img_file = "Tyr.png";
        break;
        default:
            $img_file = "Other.png";
            break;
    }
    return $img_file;
}
/**
 * Get the Container image file
 * @name get_container_img
 * @param string $container
 * @return string
 */
function get_container_img($container)
{
    $img_file = "";
    switch($container)
    {
        case "Aggregate Bags":
            $img_file = "ABag.png";
        break;
        case "Bales":
            $img_file = "Bale.png";
        break;
        case "Barrel (oil)":
            $img_file = "Barr.png";
        break;
        case "Battery Box":
            $img_file = "BBox.png";
        break;
        case "Battery Can":
            $img_file = "BCan.png";
        break;
        case "Caddie":
            $img_file = "Cad.png";
        break;
        case "Cardboard Stickers":
            $img_file = "CStik.png";
        break;
        case "Closed Skip":
            $img_file = "CSkip.png";
        break;
        case "Drum":
            $img_file = "Drum.png";
        break;
        case "FEL":
            $img_file = "FEL.png";
        break;
        case "Flat Bed Trailer":
            $img_file = "FBT.png";
        break;
        case "Fluorescent Tube Coffin":
            $img_file = "FTub.png";
        break;
        case "Hazardous Box":
            $img_file = "HBox.png";
        break;
        case "IBC":
            $img_file = "IBC.png";
        break;
        case "Nappy Bin":
            $img_file = "NBin.png";
        break;
        case "Open Skip":
            $img_file = "OSkip.png";
        break;
        case "Pallets":
            $img_file = "Pal.png";
        break;
        case "Portable Compactor":
            $img_file = "PCom.png";
        break;
        case "Pre-Paid Bags":
            $img_file = "PPB.png";
        break;
        case "REL":
            $img_file = "REL.png";
        break;
        case "RORO":
            $img_file = "RORO.png";
        break;
        case "Sanitary Bin":
            $img_file = "SBin.png";
        break;
        case "Sharps Box":
            $img_file = "SBox.png";
        break;
        case "Toner Box":
            $img_file = "TBox.png";
        break;
        case "Wheeled Bin":
            $img_file = "WBin.png";
        break;
        case "Bulk Tank":
            $img_file = "BTank.png";
        break;
        case "Gas Canister":
            $img_file = "GCan.png";
        break;
        case "Gas Canister":
            $img_file = "GCan.png";
        break;
        case "Grab Loads":
            $img_file = "GLoad.png";
        break;
        case "Hand Dryer":
            $img_file = "HDry.png";
        break;
        case "Bottle Bank":
            $img_file = "BottleBank.png";
        break;
        case "Archive Boxes":
            $img_file = "archiveBoxes.jpg";
        break;
    }
    return $img_file;
}
/**
 * Sending the mail
 * @name mail_sends
 * @param string $from
 * @param string $from_name
 * @param string $to
 * @param string $to_name
 * @param string $subject
 * @param string $message
 */
function mail_sends($from,$from_name,$to,$to_name,$subject,$message)
{
   // ini_set('display_errors', '1');
    //global $path;
    
 //  include_once  PATH_INIT.'/PHPMailer-master/PHPMailerAutoload.php';
     
     $filename = dirname(__FILE__)."/PHPMailer-master".DIRECTORY_SEPARATOR.'PHPMailerAutoload.php';
      $filename = str_replace("/app/php/", "",$filename); 
     include_once $filename;
 
    $mail = new PHPMailer;
    
//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();
global $smtp_host;
global $smtp_auth;
global $smtp_user;
global $smtp_pass;
global $smtp_port;
/*$smtp_host = "smtp.gmail.com";
$smtp_port = 587;
$smtp_auth = TRUE;
$smtp_user = "rushyendra@dhruvsoft.com";
$smtp_user_name = "Rushyendra";
$smtp_pass = "rushyendra123";*/

// Set mailer to use SMTP
$mail->Host = $smtp_host;  // Specify main and backup SMTP servers
$mail->SMTPAuth = $smtp_auth;                               // Enable SMTP authentication
$mail->Username = $smtp_user;                 // SMTP username
$mail->Password = $smtp_pass;                           // SMTP password
//$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = $smtp_port;                                    // TCP port to connect to
//$mail->Port = 465;                                    // TCP port to connect to

$mail->From = $from;
$mail->FromName = $from_name;
$mail->addAddress($to, $to_name);     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
$mail->addReplyTo($from, 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $subject;
$mail->Body    = $message;

//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
if(!$mail->send()) {
    return  'Message could not be sent.';
   // echo 'Mailer Error: ' . $mail->ErrorInfo;
} /*else {
    echo 'Message has been sent';
}*/
}
/**
 * Get the Account Logo
 * @name get_account_logo
 * @param string $logo_url
 * @param string $master_par_act
 * @param string $par_logo_url
 * @param string $par_master_par_act
 * @param string $par_par_logo_url
 * @param string $par_par_master_par_act
 * @param string $par_par_par_logo_url
 * @param string $par_par__par_master_par_act
 * @param string $par_par_par_par_logo_url
 * @param string $par_par_par_par_master_par_act
 * @return string
 */
function get_account_logo($logo_url,$master_par_act,
        $par_logo_url, $par_master_par_act,
        $par_par_logo_url, $par_par_master_par_act,
        $par_par_par_logo_url, $par_par__par_master_par_act,
        $par_par_par_par_logo_url, $par_par_par_par_master_par_act)
{
    $result = '';
    if($logo_url == "")
{ 
	if( $master_par_acc ) 'No logo Found';
	else
	{
            if(par_logo_url == "")
            {
                if( $par_master_par_act)  'No logo Found';
		else
		{
                    if( $par_par_logo_url =="")
                      {				
			if( $par_par_master_par_act) 'No logo Found';
			else
                            {
                            if($par_par__par_logo_url== "")
			    {					
				if( $par_par__par_master_par_act ) 'No logo Found';
				else {
                                    
                                    if($par_par_par_par_logo_url) 'No Logo Found';
                                    else 
                                        $par_par_par_par_logo_url; //customer logo
				   }
			   }
                            $result = $par_par_par_par_logo_url; // "Customer Logo";
                        }	
				
		}else 
                    $result = $par_par_logo_url;
				//IMAGE($par_par_logo_url, "Customer Logo") //parent logo
                    }
			
		} //parent logo
		else
                    $result = $par_logo_url;
		//IMAGE(Parent.Logo_URL__c , "Customer Logo"))), 
	}
}  //logo first
else
	//IMAGE(Logo_URL__c , "Customer Logo")
    $result = $logo_url;
return $result;
}
/**
 * Get the search type
 * @name get_search_type
 * @param string $type
 * @return string
 */
function get_search_type($type)
{
    $result = '';
    switch($type)
    {
        case "Account":
            $result = "Accounts";
            break;
        case "Contact":
            $result = "Contacts";
            break;
        case "Case":
            $result = "Cases";
            break;
        
        case "Note":
            $result = "Notes";
            break;
         case "Service":
            $result = "Services";
            break;
    }
    return $result;
}
/**
 * Get the vales from result in advanced 
 * @name get_adv_search_data
 * @param array $type_array
 * @param int $type_count
 * @param int $response_cnt
 * @param array $result
 * @param string $type
 * @return array
 */
function get_adv_search_data($type_array, $type_count, $response_cnt, $result, $type)
{
    $account_type = '';
    if(in_array($type, $type_array))
              $account_type = $type;
     $account_res = array();
     //if($account_type== "Account" )
     if($response_cnt >0  && $type_count > 1)
     {
         foreach($result as $each)
         {
            $type_e =  $each->attributes->type;
            
             if($type_e == "")
                 $type_e = $each->type;
             //if($type == "Contact")
               // echo $type_e;
             $check_type = $account_type;
             if($type == "Case")
                $check_type = "Case_Custom__c";
             if($type == "Service")
                $check_type = "Service__c";
             
             if($type_e == $check_type)
                 $account_res[] = $each;
             //else if($type== "Contact" && $check_type == "Contacts")
               //  $account_res[] = $each;
         }
     }
     if($type_count == 1 && $account_type== $type)
         $account_res = $result;
     return array($account_res, $account_type);
}
/**
 * Get the attachment list ( combine notes and attachments)
 * @name get_attach_results
 * @param array $result
 * @return array
 */
function get_attach_results($result)
{
    $notes_array = $notes= $attach_array =  array();
    if(isset($result->Notelist))
    $notes_array = $result->Notelist;
    
    if(is_array($notes_array) && count($notes_array)>0)
    {
      foreach($notes_array as $each)
      {
          $each->Type = 'Note';
          $set_date = $each->LastModifiedDate;
          if($set_date == "") 
          $set_date = $each->CreatedDate;
          $each->DateBy = $set_date;
      }
    }
   
    if(isset($result->Attachmentlist))
    $attach_array = $result->Attachmentlist;
    if(is_array($attach_array) && count($attach_array) >0)
    {
      foreach($attach_array as $each)
      {
          $each->Type = 'Attachment';
          $set_date = $each->LastModifiedDate;
          if($set_date == "") 
          $set_date = $each->CreatedDate;
          $each->DateBy = $set_date;
         $each->Title = $each->Name;
         $each->Body = $each->Description;
      }
    }
    // for temperory 
    $total_result = array_merge($notes_array,$attach_array);
    usort($total_result,"dateCmp");
    $total_result = array_reverse($total_result);
    return $total_result;
}
function get_wp_settings()
{
    global $wpdb;
    global $table_prefix;
    $result = $wpdb->get_row("SELECT min_pass_len,max_pass_len,max_login_attempts"
                            . " FROM ".$table_prefix."settings"
                           . " WHERE id=1");

$max_pass_len = $min_pass_len = 0;
if( count($result)>0)
{
  $max_pass_len = $result->max_pass_len ;
  $min_pass_len = $result->min_pass_len ;
}
return array("min_pass_len" => $min_pass_len, "max_pass_len" => $max_pass_len);

}
function changePwdSubmit() {

      	global $wpdb;
		global $table_prefix;

		//$wp_ad_counter_table = $wpdb->prefix . "ad_counter";

		$submit = $_POST['submit'];
      	if( isset($submit) ) {
      		$results = $wpdb->update('users', array( 'user_pass' => $password),"WHERE ID =".$_REQUEST["$id"]);
      		echo 'Password Updated';
      	}
        else {
            echo 'Password doesnot match ';
        }
      }
      
function login_check($status =0)
{
    if(!$status){
    if(isset($_SESSION["user"]) && count($_SESSION["user"])>0)
    {
        header("Location:index.php");
        exit;
    }
    }else{
        
    if(!isset($_SESSION["user"]) || !count($_SESSION["user"])){
        header("Location:login.php");
        exit;
    }
    }
}
function login_check_admin($status =0)
{
    if(!$status){
    if( isset($_SESSION["admin"]) && count($_SESSION["admin"])>0)
    {
        ob_start();
        header("Location: index.php");
    }
    
    }elseif(!isset($_SESSION["admin"]) || !count($_SESSION["admin"])){
        ob_start();
        header("Location: login.php");
    }
    
    //ob_end_clean();
    
}
/**
 * Generate the Strong Password
 * @name wp_generate_strong_password
 * @param type $length
 * @param type $add_dashes
 * @param type $available_sets
 * @return type
 */
function wp_generate_strong_password($length = 9, $add_dashes = false, $available_sets = 'luds')
{
    $sets = array();
    if(strpos($available_sets, 'l') !== false)
        $sets[] = 'abcdefghjkmnpqrstuvwxyz';
    if(strpos($available_sets, 'u') !== false)
        $sets[] = 'ABCDEFGHJKMNPQRSTUVWXYZ';
    if(strpos($available_sets, 'd') !== false)
        $sets[] = '23456789';
    if(strpos($available_sets, 's') !== false)
        $sets[] = '!@#$%&*?+-_()={}{}:;,<>.~`^';

    $all = '';
    $password = '';
    foreach($sets as $set)
    {
        $password .= $set[array_rand(str_split($set))];
        $all .= $set;
    }

    $all = str_split($all);
    for($i = 0; $i < $length - count($sets); $i++)
        $password .= $all[array_rand($all)];

    $password = str_shuffle($password);

    if(!$add_dashes)
        return $password;

    $dash_len = floor(sqrt($length));
    $dash_str = '';
    while(strlen($password) > $dash_len)
    {
        $dash_str .= substr($password, 0, $dash_len) . '-';
        $password = substr($password, $dash_len);
    }
    $dash_str .= $password;
    return $dash_str;
}
function get_home_page()
{
    $result = '<div id="primary" class="content-area">
			<div id="content" class="site-content" role="main">

<div class=" contentSub sidebarCell">';
            $result .='<!-- Sidebar Started -->';
             //$result .= portal_sidebar();
              
            $result .='<!-- Sidebar ended -->

</div>
<div class="bodyCell contentSub" >
<!-- Start page content -->
<a name="skiplink">
    <!--<img width="1" height="1" title="Content Starts Here" class="skiplink skipLinkTargetInner zen-skipLinkTarget" alt="Content Starts Here" src="/s.gif">-->
</a>

<input type="hidden" id="msg" value="<?php echo $msg ?>" >
  <div class="row toggle-full-width">
    <div class="large-12 columns">
      <!--<h4 class="right"><small><em>* = Required</em></small></h4>-->
      <h4><br>
       Customer Portal</h4>
      
      <hr> 
      <div id="section_1">
         
        <div class="row">
          <div class="columns small-12"> ';
            
            if(is_user_logged_in()){
            
            $result .= ' <a href="user-details.php"  class="button radius submit link">My Account</a> <br>
            <a href="#"  class="button radius submit link logouts">Logout</a>';
             }else{ 
          $result .='<a href="login.php"  class="button radius submit link">Login</a> <br>
            <a href="register.php"  class="button radius submit link">Register</a>';
             } 
          $result .='</div>
        </div>
     </div>
    </div>
  </div>
    
<!-- Body events -->

<!-- End page content -->
</div>
        <!-- Account Information end here -->
				

			</div><!-- #content -->
		</div><!-- #primary -->';
          return $result;
}

/**** Descativation Process ***/

/**
 * check the desctivation in login
 * @name check_deactivation_fun
 * @param object $user
 * @param string $username
 * @param string $password
 * @return object
 */
function check_deactivation_fun($user, $username,$password)
{
    if(is_wp_error($user))
		return $user;
    if(isset($user->is_deactive) && $user->is_deactive ==1 )
    {
        return new WP_Error('inactive', 'Your account has been temporarily deactivated.');
    }
    else return $user;
}
add_action("authenticate", "check_deactivation_fun",100,3 );
//Add the actions in users table
function add_action_in_user()
{
    if(!current_user_can('activate_plugins'))
		return;
    ?>
	<!-- just comment	<script type="text/javascript">
			jQuery(document).ready(function($) { 
				$('<option>').val('deactivate_user').text('Deactivate').appendTo("select[name='action']"); 
				$('<option>').val('activate_user').text('Activate').appendTo("select[name='action']"); 
			});
		</script>-->
<?php
}
add_action('admin_footer-users.php', 'add_action_in_user');

//perform the deactivate and activate the users 
function user_perform_action()
{
    global $wpdb;
    global $table_prefix;
    if(!current_user_can('activate_plugins'))
		return;

	$wp_list_table = _get_list_table('WP_Users_List_Table');
	$action = $wp_list_table->current_action();
	switch($action) {
		case 'deactivate_user':
			$user_ids = $_GET['users'];
			$deactivated = 0;
			foreach( $user_ids as $user_id ) {
				if(get_current_user_id() != $user_id){
					//update_user_meta($user_id, 'wpduact_status', 'inactive');
                                   
                                        $wpdb->update($table_prefix."users", array("is_deactive" =>1),array("ID" =>$user_id));
                                   
					$deactivated++;
				}
			}
			$sendback = add_query_arg( array('deactivated' => $deactivated ), $sendback );
		break;
		case 'activate_user':
			$user_ids = $_GET['users'];
			$activated = 0;
			foreach( $user_ids as $user_id ) {
                            $wpdb->update($table_prefix."users", array("is_deactive" =>0),array("ID" =>$user_id));
				//update_user_meta($user_id, 'wpduact_status', 'active');
				$activated++;
			}
			$sendback = add_query_arg( array('activated' => $activated ), $sendback );
		break;
		default: return;
	}
	wp_redirect($sendback);
	exit();
}
add_action('load-users.php', 'user_perform_action');
//User activation and deactivation messages
function user_admin_notices()
{
    global $pagenow;
	if($pagenow == 'users.php'){
		if(isset($_REQUEST['deactivated']) && (int) $_REQUEST['deactivated']) {
			$message = sprintf( _n( 'User account deactivated.', '%s user accounts deactivated.', $_REQUEST['deactivated'] ), number_format_i18n( $_REQUEST['deactivated'] ) );
			echo "<div class=\"updated\"><p>$message</p></div>";
		}
		elseif(isset($_REQUEST['activated']) && (int) $_REQUEST['activated']){
			$message = sprintf( _n( 'User account activated.', '%s user accounts activated.', $_REQUEST['activated'] ), number_format_i18n( $_REQUEST['activated'] ) );
			echo "<div class=\"updated\"><p>$message</p></div>";
		}
	}
}
add_action('admin_notices', 'user_admin_notices');

/*
* Display status of each account in the WordPress users table
*/

function add_user_id_column($columns) {
    $columns['is_deactive'] = 'Status';
    return $columns;
}
add_filter('manage_users_columns', 'add_user_id_column');

function show_user_id_column_content($value, $column_name, $user_id)
{
    global $wpdb;
    
    if($column_name == "is_deactive") {
      
        $res = get_userdata( $user_id );
        $status = "Active";
        if(isset($res->is_deactive) && $res->is_deactive)
            $status = "Deactive";
        return $status;
    }  
    
    return $value; 
}
add_action('manage_users_custom_column',  'show_user_id_column_content', 10, 3);

/**
 * Generate the Element
 * @param string $element
 * @param string $options
 * @param string $attribute
 * @param int $is_searchable
 * @param string $place_holder
 * @param string $class_name
 * @param string $style_name
 * @param int $i
 * @param int $is_required
 * @param string $tool_tip
 * @param string $value
 * @param string $type
 * @return string
 */
function generate_input($element, $options, $attribute, $is_searchable,  $place_holder,  $class_name, $style_name, $i,$is_required,$tool_tip,$value="",$type= "",$salutation= '') {
    $result = "";
    $attribute = $label = strtolower($attribute);
     $id = preg_replace("/ /", "", $attribute);
    $options = explode("\n", $options);
    $tool_tip = ucwords($tool_tip);
    $edit_class = '';
    $style = '';
    $disabled = '';
    if($type == "edit"){
        $edit_class = 'editRow';
        $style = 'style="display:none"';
        if($attribute== "email")
            $disabled = 'disabled="disabled"';
    }
    if($attribute != "salutation")
    $result = '<div class="row '.$edit_class.'" '.$style.'><div class="medium-6 columns">';
    if($attribute != "address"){
        if($attribute != "salutation")
            $result .= '<label for="'.$id.'">';
        $astrik = $req_stmt =  '';
        $required =  'data-required=""';
        if($is_required){
            $astrik = '*';
            $required =  'data-required="required"';
            $req_stmt = 'This field is required.';
        }
        if($attribute != "salutation")
        $result.= '  <strong data-tooltip aria-haspopup="true" class="fi-info has-tip radius" title="'.$tool_tip.'&lt;br&gt;&lt;small&gt;&lt;em&gt;'.$req_stmt.'&lt;/em&gt;&lt;/small&gt;"> 
                   '.ucwords($label).$astrik.'</strong>';
        if($attribute == "salutation")
            $result .= '<span style="display:none" id="salSpan">';
        
    switch ($element) {
         case "file":
           $result .='<input type="file"  id="' . $id . '" value="" class="radius ' . $class_name . '" placeholder="' . $place_holder . '" style="' . $style_name . '" '.$required.' />';
            break;
        case "text":
         if($attribute == "first name"){
             $result .= '<select id="salutation" type="dropdown" class="radius " style="" data-required="">';
             $sel = "";
             if($salutation == "Mr.")
                 $sel = 'selected="selected"';
             $result.='<option value="Mr."'.$sel.'>Mr.</option>';
             $sel = "";
             if($salutation == "Ms.")
                 $sel = 'selected="selected"';
             $result .= '<option '.$sel.' value="Ms.">Ms.</option>';
             $sel = "";
             if($salutation == "Mrs.")
                 $sel = 'selected="selected"';
             $result.='<option value="Mrs." '.$sel.'>Mrs</option></select>';
         }
            $result .='<input type="text"  id="' . $id . '"  class="radius ' . $class_name . '" placeholder="' . $place_holder . '" style="' . $style_name . '" '.$required.' value="'.$value.'" '.$disabled.'  />';
            break;
        case "password":
           
            $result .='<input type="password"  id="' . $id . '" value="" class="radius ' . $class_name . '" placeholder="' . $place_holder . '" style="' . $style_name . '" '.$required.'  />';
            break;
        case "textarea":
          
            $result .= '<textarea  id="' . $id .  '"  class="radius ' . $class_name . '" placeholder="' . $place_holder . '" style="' . $style_name . '" '.$required.' '.$disabled.' >'.$value.'</textarea>';
            break;
        case "dropdown":
           
            $result .= '<select  id="' . $id .  '" type="dropdown"  class="radius ' . $class_name . '"  style="' . $style_name . '" '.$required.'>';
            if ($place_holder != "")
                $result .= '<option value="" >' . $place_holder . '</option>';
            if (count($options) > 0) {

                foreach ($options as $opt) {
                    $each = explode("::", $opt);
                     if (count($each) > 0) {
                       
                        if (isset($each[0]) && isset($each[1])){
                            $val_opt = $each[1];
                            $sel = '';
                            if($value == $val_opt)
                                $sel = 'selected="selected"';
                            $result .= '<option value="' . $each[0] . '" '.$sel.' >' . $val_opt . '</option>';
                        }
                    } else{
                        $sel = '';
                            if($value == $opt)
                                $sel = 'selected="selected"';
                        $result .= '<option value="' . $opt . '" '.$sel.' >' . $opt . '</option>';
                    }
                }
            }
            $result.='</select>';
            break;
        case "range":
           
            $result .= '<input type="text"  id="max' . $id .  '" value="" class=" radius ' . $class_name . '" placeholder="Max" style="' . $style_name . '" '.$required.'  />'
                    . '<span class="rangeSpan">---</span><input type="text"  id="min' . $id . $search_type . $type . '" value="" class="' . $class_name . '" placeholder="Min" style="' . $style_name . '" '.$required.'  />'
                    . '<div class="clear"></div>';
            break;
        case "checkbox":
            if (count($options) > 0) {
                
                foreach ($options as $opt) {
                    $each = explode("::", $opt);
                    $check = '';
                    if($value== $each[0])
                        $check = 'checked="checked"';
                    $result .= '<input type="checkbox"  id="' . $id .  '" '.$check.' value="' . $each[0] . '" class=" radius ' . $id . ' ' . $class_name . '"  style="' . $style_name . '" />' . $each[1];
                }
            } else{
                $check = '';
                    if($value)
                        $check = 'checked="checked"';
                $result .= '<input type="checkbox"  id="' . $id .  '" '.$check.' class=" radius ' . $class_name . '"  style="' . $style_name . '" '.$required.'  />' ;
            }
            break;
        case "radio":
            if ( count($options) > 0) {
               
                foreach ($options as $opt) {
                    $each = explode("::", $opt);
                    $check = '';
                    if($value== $each[0])
                        $check = 'checked="checked"';
                    $result .= '<input type="radio"  id="' . $id . '"  '.$check.' value="' . $each[0] . '" class=" radius ' . $id . ' ' . $class_name . '"  style="' . $style_name . '" />' . $each[1];
                }
            } else{
                $check = '';
                    if($value)
                        $check = 'checked="checked"';
                $result .= '<input type="radio"  id="' . $id .  '" '.$check.' class=" radius ' . $class_name . '"  style="' . $style_name . '" '.$required.' />';
            }
            break;
    }
    
    if($attribute != "salutation"){
        $result.='<span class="label error alert radius" style="display:none">Required</span>';
         if($attribute == "email")
        $result .= '<span id="correctEmail" style="display:none" ><img class="imageShown" src="img/correct1.png"  ></span>';
        $result .= '</label>';
        $result .= '</div></div>';
    }else $result .= '</span>';
    
    }
   return $result;
}

/**
 * Display Register Value
 * @param string $attribute
 * @param string $value
 * @return string
 */
function display_contact( $attribute, $value="") {
    $result_info = "";
     $id = preg_replace("/ /", "", $attribute);
    if($attribute != "address"){
        $display = 'style="display:none;"';
         $value = ': &nbsp;'.$value;
        if($attribute != "salutation"){
           
            $display = '';
        $result_info .= '<div class="row dispRow"><div class="medium-6 columns">';
        $result_info .= '<label class="dispRowStrong"><strong  class="radius" >'.ucwords($attribute).'</strong></label>';
       
        $result_info .= ' <span id="'.$id.'Disp" '.$display.'>'.$value.'</span>';
         if($attribute == "email")
            $result_info .= '<a href="change-email.php" style="  margin-left: 10px;">Change</a>';
        }
        if($attribute != "salutation")
        $result_info .= '</div></div>';
    }
    return $result_info;
}
/**
 * Display the Add slashes to given string
 * @name add_slashes
 * @param string $given_phone
 * @return string
 */
function add_slashes($given_phone)
{
    $len = strlen($given_phone);
    $result = "";
    $status = preg_match("/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/", $given_phone);
    if($given_phone != "" && !$status)
    {
         
         
        $phone_array = str_split($given_phone,3);
		 $i=0;
		 $count_p = count($phone_array);
		$comma = '-';
		foreach($phone_array as $each)
		{
			if($each != ""){
			if( $i ==2)
				$comma = '';
			$result .= $each.$comma;
			}
			$i++;
		}	
    }
    
    return $result;
}
/**
 * if given string is null then tha value is empty
 * @name check_nulls
 * @param string $given_str
 * @return string
 */
function check_nulls($given_str)
{
    $given_str = trim($given_str);
if($given_str == "null" || $given_str == null) $given_str = '';
    return $given_str;
}
//remove the menus
add_action( 'admin_menu', 'remove_menus' );
function remove_menus()
{
    remove_submenu_page( 'users.php','user-new.php' );   
    remove_submenu_page('users.php','profile.php');
    add_menu_page("Email Template List", "Email Template","manage_options", "email_template", "email_template_list", get_template_directory_uri()."/images/comment-grey-bubble.png" );
}
add_action( 'admin_enqueue_scripts', 'call_js_admin' );
function email_template_list()
{?>
        <input type="hidden" id="pages" value="email_template">
<input type="hidden" value="<?php echo get_template_directory_uri() ?>" id="rootTheme" >
<div class="box span12 content-disp">
    
</div>
<?php    
}
function call_js_admin()
{
 wp_enqueue_style("style-portal-admins", get_template_directory_uri()."/css/admin-site.css", array(), NULL,false);    
 wp_enqueue_style("style-portal-admin", get_template_directory_uri()."/css/portal-admin.css", array(), NULL,false);    
 wp_enqueue_script("script-admin-site", get_template_directory_uri()."/js/admin-site.js", array(), NULL,false);   
 wp_enqueue_script("script-ext-name", get_template_directory_uri()."/js/portal-admin.js", array(), NULL,false);   
 
}
function add_admin_head()
{
    $page = get_current_files(1);
    echo '<input type="hidden" id="page" value="'.$page.'">';
   // echo '<link type="text/css" href="'.get_template_directory_uri().'/css/portal-admin.css"></link>';
 //   echo '<script type="text/javascript" src="'.get_template_directory_uri().'/js/admin-site.js"></script>';
}
add_action( 'admin_head', 'add_admin_head' );


/**
 * Get the offset
 * @name paginate_support
 * @param int $offset
 * @param int $per_page
 * @return int
 */
function paginate_support($offset, $per_page) {
    $offset_limit = $from = $offset;
    $offset_end = $to = $per_page;
    if ($offset !== 1 && $offset !== 0) {
        $offset_end = ($offset) * $per_page;
        $offset_limit = $offset_end - $per_page;
        $from = $offset_limit + 1;
        $to = $offset_end - 1;
    }
    $offset_start = $offset_limit;
    if ($offset == 1)
        $offset_start = 0;

    return $offset_start;
}
/**
 * Get the current file
 * @name get_current_files
 * @param integer $is_admin
 * @return type
 */
function get_current_files($is_admin = 0)
{
    $pages = $_SERVER['REQUEST_URI'];
$paths = parse_url($pages);
if(isset($paths['path']))
    $path_url  = $paths['path'];

$path_url = explode("/",$path_url);
$page_cnt = count($path_url);
 $id =2;
     if(isset($path_url[$id]))    
     $pages = $path_url[$id];
/*if(isset($path_url[$page_cnt-1]))
    $pages = $path_url[$page_cnt-1];
if($pages == "")
{
    if(isset($path_url[$page_cnt-2]))
    $pages = $path_url[$page_cnt-2];
}*/
return $pages;
}
function add_footer_data()
{?>
<a href="#" class="btn btn-info btn-setting" style="display:none">Click for dialog</a>
     <div class="modal hide fade" id="popupDisp">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>Settings</h3>
		</div>
		<div class="modal-body">
			<p>Here settings can be configured...</p>
		</div>
		<div class="modal-footer">
			<!--<a href="#" class="btn" data-dismiss="modal">Close</a>
			<a href="#" class="btn btn-primary">Save changes</a>-->
		</div>
	</div>

<?php }
add_action("admin_footer", "add_footer_data");
function get_tabs_from_sales()
{
       global $tab_url;
    list($access_token,$instance_url) = get_connection_sales();
    $url = $instance_url.$tab_url;
   $json_response = connects_salesforce($url,array(),FALSE,$access_token,"get"); 
   //var_dump($json_response);
   $response = json_decode($json_response);
   $response = (array)json_decode($response);
      //$response = str_replace("\"[","",$json_response);
    //$response = str_replace("]\"","",$response);
   // $response = str_replace("\"","",$response);
     // $response = str_replace("n","",$response);
    //$response = stripslashes($response);
   //$response_array = explode(",",$response);
   return $response;
}
