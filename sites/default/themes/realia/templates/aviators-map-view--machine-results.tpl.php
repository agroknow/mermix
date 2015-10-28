<?php
/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php 
drupal_add_js(drupal_get_path('module', 'ak_mermix_tools') . '/js/ak_mermix_scrolling.js');
$pagination = array(); 
?>
<div class="row">
    <div class="span6">
	<div id="<?php print $view_id ?>" style="width:<?php print $width; ?>; height:<?php print $height; ?>;"></div>
    </div>
    <div class="span6 machine-results-listing">
	<?php if (!empty($title)): ?>
    	<h3><?php print $title; ?></h3>
	<?php endif; ?>
	<?php foreach ($rows as $id => $row): ?>
	<div <?php if( $id%6 == 0 ) {print 'id="position-'.$id.'"'; $pagination[] = $id; } ?> class="result-item <?php if( $id%2 == 0 ) {print 'odd';} ?>">
    	    <?php print $row; ?><span class="number"><?php print $id + 1 ?></span>
    	</div>
	<?php endforeach; ?>
    </div>
</div>
<div class="row">
    <div class="span12">
	<div id="results-pagination">
	<?php foreach($pagination as $key => $pagenum) { ?>
	    <a href="#" data-elem="<?php echo $pagenum ?>" class="<?php echo $key == 0 ? 'active':'' ?>"><?php echo $key+1 ?></a>
	<?php } ?>
	</div>
    </div>
</div>
