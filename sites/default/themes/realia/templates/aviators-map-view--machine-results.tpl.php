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
if($user->uid > 0) {
	$user_data = user_load($user->uid);
	$lat = isset($user_data->field_place['und']['0']['lat']) ? $user_data->field_place['und']['0']['lat'] : '';
	$lon = isset($user_data->field_place['und']['0']['lon']) ? $user_data->field_place['und']['0']['lon'] : '';
}
?>
<div class="row">
    <div class="span12 center-align mtb20">
    	<?php 
    	if($user->uid > 0 && $lat && $lon) {
    		print '<a class="btn btn-primary" href="' . url('machine-results/' . $lat . ',' . $lon . ' 50') . '">' . t('Use your location') . '<i class="fa fa-map-marker"></i></a>';
    	} else {
    		print isset($_COOKIE['geolocation']) ? 
    		'<a class="btn btn-primary" href="' . url('machine-results/' . $_COOKIE['geolocation'] . ' 50') . '">' . t('Use your location') . '<i class="fa fa-map-marker"></i></a>' : '<a class="btn btn-primary" href="#" onclick="geolocation(false)">' . t('Use your location') . '<i class="fa fa-map-marker"></i></a>' ;
    	}
    	?>
    </div>
    <div class="span6 map-container">
    <div id="dragger">Drag to scroll page</div>
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
