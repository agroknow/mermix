<?php

/**
 * @file
 * API documentation for Owl Carousel.
 */

/**
 * Implements hook_owlcarousel_pre_render_alter().
 *
 * @param array $element
 *  Pre render array of carousel output & settings.
 */
function hook_owlcarousel_pre_render_alter(&$element) {
  // Alter the fully built carousel & settings array
  // before render.
}

/**
 * Implements hook_owlcarousel_settings_alter().
 *
 * @param array $settings
 *   Instance settings.
 * @param string $instance
 *   Carousel identifier.
 */
function hook_owlcarousel_settings_alter(&$settings, $instance) {
  switch ($instance) {
    case 'owlcarousel_settings_default':
      // 
      break;
  }
}
