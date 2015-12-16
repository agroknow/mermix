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
	'#default_value' => variable_get('looking_for_webform_id', '298'),
	
    );
    $form['mermix_tools_settings']['check_availability_webform_id'] = array(
	'#type' => 'textfield',
	'#title' => t('check availability webform id'),
	'#required' => true,
	'#default_value' => variable_get('check_availability_webform_id', '299'),
	
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
    $form['mermix_tools_settings']['mtools_banner_form'] = array(
	'#type'          => 'radios',
	'#title'         => t('Select what form is shown in banner section'),
	'#default_value' => variable_get('mtools_banner_form', 0),
	'#options'       => array(2 => t('Custom block'), 1 => t('Looking for webform'), 0 => t('Machinery search form(default)')),
    );
    $form['mermix_tools_settings']['mtools_banner_block'] = array(
	'#type' => 'textfield',
	'#title' => t('Enter the block id to render in banner'),
	'#required' => false,
	'#default_value' => variable_get('mtools_banner_block', ''),
	
    );
    $form['mermix_tools_settings']['mtools_banner_text'] = array(
	'#type' => 'textarea',
	'#title' => t('Banner text'),
	'#required' => false,
	'#default_value' => variable_get('mtools_banner_text', ''),
    );
    
    return system_settings_form($form);
    
}
