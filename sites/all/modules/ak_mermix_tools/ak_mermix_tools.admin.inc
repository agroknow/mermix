<?php

function mermixtools_admin_settings() {
    
    $form['mermix_tools_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('General Settings'),
    '#weight' => 1,
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
    );
    $form['mermix_tools_settings']['looking_for_webform_id'] = array(
	'#type' => 'textfield',
	'#title' => t('Looking for webform id'),
	'#required' => true,
	'#default_value' => variable_get('looking_for_webform_id', ''),
	
    );
    $form['mermix_tools_settings']['looking_for_webform_key'] = array(
	'#type' => 'textfield',
	'#title' => t('Looking for webform key of machine type'),
	'#required' => true,
	'#default_value' => variable_get('looking_for_webform_key', ''),
	
    );
    $form['mermix_tools_settings']['mtools_banner_image'] = array(
	'#type' => 'textfield',
	'#title' => t('Banner image name'),
	'#required' => false,
	'#default_value' => variable_get('mtools_banner_image', ''),
	
    );
    $form['mermix_tools_settings']['mtools_banner_text'] = array(
	'#type' => 'textarea',
	'#title' => t('Banner text'),
	'#required' => false,
	'#default_value' => variable_get('mtools_banner_text', ''),
    );
    
    return system_settings_form($form);
    
}
