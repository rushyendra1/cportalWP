<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
//define('DB_NAME', 'cportal');

define('DB_NAME', 'dev2');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'vMetf +qwLJ-dhBYV4PaJ0z]-2HLUvI#qDD>IT,4@2og:}R=]9I+}d$Tr+>ZqJgV');
define('SECURE_AUTH_KEY',  '-8pwh:Ub-leG);5Ks-#-ig2;m#&P3*p,T|ASGv%!``stiY+A04JE!EwrU94>n[]Z');
define('LOGGED_IN_KEY',    '5I&V>HT_!bp@iHvxyQJ1;-Wb#JZ^yRk!+Q q|%|dx^xf9XjnioD&}Rhw_hc%1N?<');
define('NONCE_KEY',        'W-w46u.YO>}btg_|k%wr[O^MEq^,R :S7<GfQTSofzi98WuYTScK; m{=hM{KaZm');
define('AUTH_SALT',        '!YY<Pkf=O7eV{zXUn,5l0o+.IP{w=U1]6q@?*&|H$<rLAP*1@jwSXy(q,c+X&u^+');
define('SECURE_AUTH_SALT', 'KX-N%,p[b+?]elMWv6e|M.)^o*|e+gs+`A@,w80|y-*JnS%|7^._-WnN?*sTi8lQ');
define('LOGGED_IN_SALT',   '$S&WtB}n{V8$Fj uHxS2kQk|=z0FlwZ88y~4_9wA>9hu-HyzI;(EwhcjO:6s|WH&');
define('NONCE_SALT',       '|/l5+7&/3]vGK~#{u=,|!z31.v}~bt06TUrTZ{wb^OFMO-:y5dQw-x7e}E*-IyaP');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_3uvwes_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
 