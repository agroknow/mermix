<?php

/**
 * @file
 * Stub template file.
 */
$final = array();
$groupedItems = array_chunk($items, 2);
foreach ($groupedItems as $key => $item) {
    $colClass = ($key%2 == 0) ? 'odd':'even';
    $final[]['row'] = isset($item[1]) ? 
	'<div class="sub-item '. $colClass .' odd">'.$item[0]['row'] . '</div><div class="sub-item '. $colClass .' even">' . $item[1]['row'] . '</div>' : 
	'<div class="sub-item '. $colClass .' odd">'.$item[0]['row'] . '</div>';
}
print theme('owlcarousel', array('items' => $final, 'settings' => $settings));
