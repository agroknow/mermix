<?php

function mediabox_crop_styles($mediabox) {
  drupal_add_library('mediabox_crop', 'mediabox_crop');

  module_load_include('inc', 'mediabox_crop', 'includes/mediabox_crop.forms');
  return theme('mediabox_crop_styles', array(
    'form' => drupal_get_form('mediabox_crop_form_styles', $mediabox),
  ));
}
