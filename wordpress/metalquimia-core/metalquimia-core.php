<?php
/**
 * Plugin Name: Metalquimia Core
 * Description: Backend headless de Metalquimia: secciones reordenables por página, ajustes globales por idioma, API para el front y revalidación al guardar.
 * Version: 0.1.0
 * Requires PHP: 8.1
 * Text Domain: metalquimia
 *
 * Requiere Secure Custom Fields (gratis) o ACF Pro, y Polylang.
 * Configuración en wp-config.php:
 *   define( 'MQ_FRONT_URL', 'http://localhost:3000' );
 *   define( 'MQ_REVALIDATE_SECRET', 'el-mismo-que-REVALIDATE_SECRET-del-front' );
 */

defined( 'ABSPATH' ) || exit;

define( 'MQ_CORE_DIR', __DIR__ );

require_once MQ_CORE_DIR . '/inc/helpers.php';
require_once MQ_CORE_DIR . '/inc/field-kit.php';
require_once MQ_CORE_DIR . '/inc/fields.php';
require_once MQ_CORE_DIR . '/inc/rest.php';
require_once MQ_CORE_DIR . '/inc/revalidate.php';
require_once MQ_CORE_DIR . '/inc/admin.php';
require_once MQ_CORE_DIR . '/inc/translations.php';
require_once MQ_CORE_DIR . '/inc/newsletter.php';
require_once MQ_CORE_DIR . '/inc/contact.php';
require_once MQ_CORE_DIR . '/inc/seed.php';
