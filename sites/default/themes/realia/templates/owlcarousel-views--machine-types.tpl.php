<?php

/**
 * @file
 * Stub template file.
 */
$final = array();
if ($view->current_display == 'block_promo') {
    $groupedItems = array_chunk($items, 4);
    foreach ($groupedItems as $key => $item) {
	$final[$key]['row'] = '';
	foreach ($item as $k => $v) {
	$final[$key]['row'] .= '<div class="sub-item itm' . $k . '">' . $v['row'] . '</div>';
	}
    }
    print theme('owlcarousel', array('items' => $final, 'settings' => $settings));
} else {
    foreach ($items as $key => $item) {
	$final[]['row'] = '<div class="sub-item after single">' . $item['row'] . '</div>';
    }
    print theme('owlcarousel', array('items' => $final, 'settings' => $settings));
}