<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php $typeid = arg(1) && is_numeric(arg(1)) ? arg(1) : '' ?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>
  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
      <div class="add-button"><a class="btn btn-primary" href="<?php echo user_is_logged_in() ? url('node/add/apartment/' . $typeid) : url('machinery-add/' . $typeid) ?>"><?php print t('Add it') ?></a></div>
  </div>
<?php endforeach; ?>
