<?php

/**
 * Upload form.
 *
 * @param $form
 * @param $form_state
 * @param array $options
 *   Upload options. @see mediabox_library_form_upload() for possible options.
 * @return array
 *   Form array.
 */
function mediabox_ui_form_library_upload($form, &$form_state, $options) {
  module_load_include('inc', 'mediabox_library', 'includes/mediabox_library.forms');
  $form = mediabox_library_form_upload($form, $form_state, $options);

  $form['submit']['#submit'][] = 'mediabox_ui_form_library_upload_submit';

  unset($form['bulk_update']);
  return $form;
}

function mediabox_ui_form_library_upload_submit($from, &$form_state) {
  // We need to find current field in order to redirect to browser properly.
  $item = menu_get_item();
  $field_name = $item['page_arguments'][0];
  $form_state['redirect'] = 'mediabox-browser/' . $field_name;
}

/**
 * Upload form page callback.
 *
 * @param string $field_name
 *   Mediabox field name for which we need upload form.
 * @return string
 *   Rendered upload form.
 */
function mediabox_ui_library_page($field_name) {
  // Suppress admin_menu in browser popup.
  if (module_exists('admin_menu')) {
    admin_menu_suppress();
  }

  drupal_add_css(drupal_get_path('module', 'mediabox_ui') . '/css/mediabox_ui.css');

  $field_info = field_info_field($field_name);
  $options = array(
    'upload_validators' => array('file_validate_extensions' => array($field_info['settings']['mediabox_allowed_extensions'])),
  );

  return drupal_get_form('mediabox_ui_form_library_upload', $options);
}

/**
 * Page callback for browser UI.
 *
 * @param string $field_name
 *   Name of the mediabox field.
 * @return string
 *   Rendered Mediabox UI browser.
 */
function mediabox_ui_browser_page($field_name) {
  // Suppress admin_menu in browser popup.
  if (module_exists('admin_menu')) {
    admin_menu_suppress();
  }

  drupal_add_css(drupal_get_path('module', 'mediabox_ui') . '/css/mediabox_ui.css');
  drupal_add_js(drupal_get_path('module', 'mediabox_ui') . '/js/mediabox_ui_behavior.js');

  if(!empty($field_name)) {
    $field_info = field_info_field($field_name);
    drupal_add_js(array(
      'mediaboxBrowser' => array(
        'field' => $field_name,
        'field_cardinality' => $field_info['cardinality'],
      )
    ), 'setting');
  }

  return theme('mediabox_ui_browser', array(
    'content' => views_embed_view('mediabox_browser', 'user_browser'),
    'field_cardinality' => $field_info['cardinality'],
  ));
}

/**
 * Get table of mediabox_display bundles
 * Implementation of page callback admin/structure/mediabox-ui
 * @return string
 */
function mediabox_ui_types() {
  $bundles = mediabox_ui_db_get_bundles();

  if (is_array($bundles)) {
    $header = array(
      array('data' => t('Name')),
      array('data' => t('Operations'), 'colspan' => 4),
    );

    foreach ($bundles as $key => $bundle) {
      $detail = theme('mediabox_type_detail', array(
        'title' => $bundle->title,
        'type' => $bundle->type,
        'description' => isset($bundle->description) ? $bundle->description : ''
      ));

      $items[] = array(
        'data' => array(
          $detail,
          l(t('edit'), 'admin/structure/mediabox-ui/manage/' . $bundle->type),
          l(t('manage fields'), 'admin/structure/mediabox-ui/manage/' . $bundle->type . '/fields'),
          l(t('manage display'), 'admin/structure/mediabox-ui/manage/' . $bundle->type . '/display'),
          l(t('delete'), 'admin/structure/mediabox-ui/' . $bundle->type . '/delete'),
        )
      );
    }

    $variables = array(
      'header' => $header,
      'rows' => isset($items) ? $items : array(),
      'empty' => '',
    );

    return theme('table', $variables);
  }

  drupal_set_message(t('There are no media display types yet added'), 'warning');
  return '';
}