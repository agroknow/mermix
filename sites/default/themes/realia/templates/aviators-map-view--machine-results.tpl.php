<?php
/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<div class="row">
    <div class="span7">
	<div id="<?php print $view_id ?>" style="width:<?php print $width; ?>; height:<?php print $height; ?>;"></div>
    </div>
    <div class="span5 machine-results-listing">
	<?php if (!empty($title)): ?>
    	<h3><?php print $title; ?></h3>
	<?php endif; ?>
	<?php foreach ($rows as $id => $row): ?>
    	<div class="result-item">
    	    <span class="number"><?php print $id + 1 ?></span><?php print $row; ?>
    	</div>
	<?php endforeach; ?>
    </div>
</div>
