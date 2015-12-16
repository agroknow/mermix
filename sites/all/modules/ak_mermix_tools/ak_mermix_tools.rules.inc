<?php
/**
 * @file
 * Copy paste from facebook rules module.
 */

/**
 * Implements hook_rules_event_info().
 */
function ak_mermix_tools_rules_event_info() {
  return array(
    'ak_mermix_tools_linked_to_facebook' => array(
      'label' => t("User connected existing own account to Facebook."),
      'group' => t('Facebook'),
      'variables' => array(
        'user' => array(
          'type' => 'user',
          'label' => t('User'),
        ),
      ),
    ),
  );
}

/**
 * Implements hook_rules_condition_info().
 */
function ak_mermix_tools_rules_condition_info() {
  return array(
    'ak_mermix_tools_user_connected_to_facebook' => array(
      'label' => t("User account is connected to his Facebook account."),
      'group' => t('Facebook'),
      'parameter' => array(
        'user' => array(
          'type' => 'user',
          'label' => t('User'),
          'description' => t("User being checked."),
        ),
      ),
    ),
  );
}

/**
 * Callback for hook_rules_condition_info().
 */
function ak_mermix_tools_user_connected_to_facebook($user) {
  return fboauth_fbid_load($user->uid) ? TRUE : FALSE;
}
