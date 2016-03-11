<?php

function mermix_fiware_admin_settings() {
    
    $form['mermix_fiware_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Fiware Settings'),
    '#weight' => 1,
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
    );
    $form['mermix_fiware_settings']['orion_ip'] = array(
	'#type' => 'textfield',
	'#title' => t('Orion ip address'),
	'#required' => true,
	'#default_value' => variable_get('orion_ip', '185.23.171.92'),
	
    );
    $form['mermix_fiware_settings']['orion_port'] = array(
	'#type' => 'textfield',
	'#title' => t('Orion port number'),
	'#required' => true,
	'#default_value' => variable_get('orion_port', '1026'),
	
    );
    $form['mermix_fiware_settings']['cep_endpoint'] = array(
	'#type' => 'textfield',
	'#title' => t('Cep api url'),
	'#required' => true,
	'#default_value' => variable_get('cep_endpoint', 'http://185.23.171.92:30022'),
	
    );
    $form['mermix_fiware_settings']['mermix_fiware_notifs_enabled'] = array(
    '#type'          => 'radios',
    '#title'         => t('Enable mail notifications'),
    '#default_value' => variable_get('mermix_fiware_notifs_enabled', 0),
    '#options'       => array(0 => t('No'), 1 => t('Log only'), 2 => t('Send and log'), 3 => t('Send only')),
    '#description'   => t('Select if new machine notifications are sent to users'),
    );
    $form['mermix_fiware_settings']['mermix_fiware_notify_msg_subj'] = array(
	'#type' => 'textfield',
	'#title' => t('Notification msg subject'),
	'#required' => false,
	'#default_value' => variable_get('mermix_fiware_notify_msg_subj', ''),
	'#description' => t('Available placeholders: @user-id, @user-name, @user-first, @user-last, @machine-id, @machine-title, @machine-link'),
    );
    $form['mermix_fiware_settings']['mermix_fiware_notify_msg_body'] = array(
	'#type' => 'textarea',
	'#title' => t('Notification msg body'),
	'#required' => false,
	'#default_value' => variable_get('mermix_fiware_notify_msg_body', ''),
	'#description' => t('Available placeholders: @user-id, @user-name, @user-first, @user-last, @machine-id, @machine-title, @machine-link'),
    );
    return system_settings_form($form);
    
}
