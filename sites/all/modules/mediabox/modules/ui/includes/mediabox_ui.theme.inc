<?php

/**
 * Preprocess theme for upload browser
 * @param $variables
 */
function template_preprocess_mediabox_ui_browser(&$variables) {
  $actions = array();

  $actions[] = l($variables['field_cardinality'] == 1 ? t('Add image') : t('Add images'), '', array(
    'attributes' => array(
      'id' => 'mediabox-add-images',
      'class' => array(
        'button', 'form-submit'
      ),
    ),
    'fragment' => 'refresh'
  ));

  $actions[] = l(t('Close browser'), '', array(
    'attributes' => array(
      'id' => 'mediabox-cancel-images',
      'class' => array(
        'button', 'form-submit'
      ),
    ),
    'fragment' => 'refresh'
  ));

  $variables['actions'] = $actions;
}

/**
 * Custom implementation for field widgets with unlimited cardinality
 *
 * @param $variables
 * @return string
 */
function theme_mediabox_multiple_value_form($variables) {

  $element = $variables['element'];
  $output = '';

  $delta = ($element['#max_delta']);
  
  $table_id = drupal_html_id($element['#field_name'] . '_values');
  $order_class = $element['#field_name'] . '-delta-order';
  $required = !empty($element['#required']) ? theme('form_required_marker', $variables) : '';
  $draggable = $element['#cardinality'] == 1 ? false : true;

  $header = array(
    array(
      'data' => '<label>' . t('!title: !required', array(
        '!title' => $element['#title'],
        '!required' => $required
      )) . "</label>",
      'colspan' => 2,
      'class' => array('field-label'),
    ),
  );
  if($draggable) {
    $header[] = t('Order');
  }
  
  $rows = array();

  // Sort items according to '_weight' (needed when the form comes back after
  // preview or failed validation)
  $items = array();
  $static_elements = array();
  foreach (element_children($element) as $key) {
    // in php 0 == "string" as true ? we are using === instead of ==
    // switch not possible
    if ($key === 'add_more' || $key === 'mid_elements' || $key === 'browse') {
      $static_elements[$key] = drupal_render($element[$key]);
    }
    else {
      $items[$key] = $element[$key];
    }
  }

  usort($items, '_field_sort_items_value_helper');

  // Add the items as table rows.
  foreach ($items as $key => $item) {
    $item['_weight']['#attributes']['class'] = array($order_class, 'form-delta-order');
    $delta_element = drupal_render($item['_weight']);
    $classes = array('field-multiple-drag', 'mediabox-remove');

    if ($key == $delta) {
      $classes[] = 'mediabox-remove-hidden';
    }

    $cells = array(
      array('data' => drupal_render($item['_remove']), 'class' => $classes),
      drupal_render($item),
    );
    
    if($draggable) {
      $cells[] = array('data' => $delta_element, 'class' => array('delta-order'));
      $rows[] = array(
        'data' => $cells,
        'class' => array('draggable'),
      );
    } else {
      $rows[] = array(
        'data' => $cells,
      );      
    }
  }

  $output = '<div class="form-item">';
  $output .= theme('table', array(
    'header' => $header,
    'rows' => $rows,
    'sticky' => FALSE,
    'attributes' => array('id' => $table_id, 'class' => array('field-multiple-table'))
  ));
  $output .= $element['#description'] ? '<div class="description">' . $element['#description'] . '</div>' : '';
  $output .= '<div>' . implode(' ', $static_elements) . '</div>';
  $output .= '</div>';
  
  if($draggable) {
    drupal_add_tabledrag($table_id, 'order', 'sibling', $order_class);
  }

  return $output;
}
