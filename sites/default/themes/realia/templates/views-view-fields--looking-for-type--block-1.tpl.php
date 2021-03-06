<?php

/**
 * @file
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
?>
<?php
$link = FALSE;
$anchor = strip_tags($fields['view_submission']->content,'<a>');
if(!empty($anchor)) {
$a = new SimpleXMLElement($anchor);
$link = $a['href'];
}

$price = strip_tags($fields['value_5']->content);
$termObj = taxonomy_term_load(strip_tags($fields['value']->content));
$termObjLocalized = i18n_taxonomy_localize_terms($termObj);
$icon_uri = isset($termObj->field_map_icon['und'][0]['uri']) ? $termObj->field_map_icon['und'][0]['uri'] : 'public://default_images/unnamed.png'; 
$backgroundUrl = image_style_url('medium',$icon_uri);
$nameAddUrl = url('ak_mermix_tools/nojs/addphone/' . $price, array('query' => array('sid' => $fields['sid']->raw)));
if($link) {
$fields['value']->content = '<div class="category"  style="background: url(\'' .$backgroundUrl. '\') no-repeat"><a class="title" href="' . $link . '">'. $termObjLocalized->name .'</a></div>';
} else {
$fields['value']->content = '<div class="category"  style="background: url(\'' .$backgroundUrl. '\') no-repeat"><span class="title">'. $termObjLocalized->name .'</span></div>';
}
$fields['value']->wrapper_prefix = '';
$fields['value']->wrapper_suffix = '';
$fields['value_1']->wrapper_suffix = $fields['value_1']->wrapper_suffix . '<a class="add-it btn btn-primary large-btn ctools-use-modal" href="'. $nameAddUrl .'"><span class="name">'. t('More information') .'</span></a>';
$fields['value_1']->content = $fields['value_1']->content . $fields['value_4']->content;
unset($fields['value_4']); 
unset($fields['value_5']); 
unset($fields['sid']); 
unset($fields['view_submission']); 
?>
<?php foreach ($fields as $id => $field): ?>
  <?php if (!empty($field->separator)): ?>
    <?php print $field->separator; ?>
  <?php endif; ?>

  <?php print $field->wrapper_prefix; ?>
    <?php print $field->label_html; ?>
    <?php print $field->content; ?>
  <?php print $field->wrapper_suffix; ?>
<?php endforeach; ?>
