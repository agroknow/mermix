<?php

/**
 * @file jcarousel-view.tpl.php
 * View template to display a list as a carousel.
 */
?>
<ul class="<?php print $jcarousel_classes; ?>">
  <?php foreach ($rows as $id => $row): ?>
    <li class="<?php print $row_classes[$id]; ?>"><?php print $row; ?>
	<div><a class="addit-btn btn btn-primary" href="<?php echo user_is_logged_in() ? url('node/add/apartment') : url('machinery-add') ?>"><?php print t('Add it') ?></a></div>
    </li>
  <?php endforeach; ?>
</ul>
