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
$termObj = taxonomy_term_load($fields['value']->content);
$termObj = i18n_taxonomy_localize_terms($termObj);
// $icon_uri = isset($termObj->field_map_icon['und'][0]['uri']) ? $termObj->field_map_icon['und'][0]['uri'] : 'public://default_images/unnamed.png'; 
// $backgroundUrl = image_style_url('medium',$icon_uri);
$nameAddUrl = user_is_logged_in() ? url('node/add/apartment/' . $termObj->tid) : url('machinery-add/' . $termObj->tid) ;
$fields['value']->content = '<div class="category"></div>';
	if(isset($fields['value_4'])){
	$fields['value_1']->content .= '<br /><span class="comments">' .  $fields['value_4']->content . '</span>';
	unset($fields['value_4']);
	}
	if(isset($fields['value_2'])){
	$fields['value_2']->content = '<span class="fa fa-calendar"></span><span class="date">'.format_date(strtotime($fields['value_2']->content),'custom','d M \<\b\r\>Y') . '</span>';
	}
	if(isset($fields['value_3'])){
	$fields['value_3']->content = '<span class="fa fa-calendar"></span><span class="date">'.format_date(strtotime($fields['value_3']->content),'custom','d M \<\b\r\>Y') . '</span>';
	}
?>
<div class="sub-item single">
<div class="fields-wrapper midi">
<?php foreach ($fields as $id => $field): ?>
  <?php if (!empty($field->separator)): ?>
    <?php print $field->separator; ?>
  <?php endif; ?>

  <?php print $field->wrapper_prefix; ?>
    <?php print $field->label_html; ?>
    <?php print $field->content; ?>
  <?php print $field->wrapper_suffix; ?>
<?php endforeach; ?>
<a class="main-link" href="<?php print $nameAddUrl ?>"><span class="name"><?php print $termObj->name ?></span></a>
<a class="add-it" href="<?php print $nameAddUrl ?>"><span class="name"><?php print t('Meet the demand') ?></span></a>
</div>
</div>