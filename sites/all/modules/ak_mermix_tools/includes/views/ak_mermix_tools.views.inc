<?php
/**
 * Implements hook_views_data().
 */
function ak_mermix_tools_views_data()
{

    $data = array();

    $data['ak_mermix_tools_search_log']['table']['group'] = t('Mermix tools search logs');

    $data['ak_mermix_tools_search_log']['table']['base'] = array(
        'title' => t('Mermix tools search logs'),
        'help' => t('Contains machinery search records.'),
    );
    
    $data['ak_mermix_tools_search_log']['table']['join'] = array(
    'taxonomy_term_data' => array(
        'left_field' => 'tid',
        'field' => 'machine_type',
	),
	'users' => array(
        'left_field' => 'uid',
        'field' => 'user',
	),
    );
    
    // The ID field
$data['ak_mermix_tools_search_log']['searchid'] = array(
    'title' => t('Search id'),
    'help' => t('The record ID.'),
    'field' => array(
        'handler' => 'views_handler_field_numeric',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_numeric',
    ),
);

// The user field
$data['ak_mermix_tools_search_log']['user'] = array(
    'title' => t('User'),
    'help' => t('The user performed search'),
    'field' => array(
        'handler' => 'views_handler_field_numeric',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_numeric',
    ),
    'relationship' => array(
        'base' => 'users',
        'field' => 'user',
        'handler' => 'views_handler_relationship',
        'label' => t('User'),
    ),
    'argument' => array(
        'handler' => 'views_handler_argument_user_uid',
        'numeric' => TRUE,
        'validate type' => 'uid',
    ),
);

// The Machine type field
$data['ak_mermix_tools_search_log']['machine_type'] = array(
    'title' => t('Machine type ID'),
    'help' => t('The machine type ID.'),
    'field' => array(
        'handler' => 'views_handler_field_numeric',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_numeric',
    ),
    'relationship' => array(
        'base' => 'taxonomy_term_data',
        'field' => 'machine_type',
        'handler' => 'views_handler_relationship',
        'label' => t('Term'),
    ),
    'argument' => array(
        'handler' => 'views_handler_argument_numeric',
        'numeric' => TRUE,
        'validate type' => 'tid',
    ),
);

// The date from field
$data['ak_mermix_tools_search_log']['date_from'] = array(
    'title' => t('Date from'),
    'help' => t('The date from record.'),
    'field' => array(
        'handler' => 'views_handler_field_date',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort_date',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_date',
    ),
);

// The date to field
$data['ak_mermix_tools_search_log']['date_to'] = array(
    'title' => t('Date to'),
    'help' => t('The date to record.'),
    'field' => array(
        'handler' => 'views_handler_field_date',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort_date',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_date',
    ),
);

// The Place field
$data['ak_mermix_tools_search_log']['place'] = array(
    'title' => t('Place'),
    'help' => t('The place record.'),
    'field' => array(
        'handler' => 'views_handler_field',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_string',
    ),
);

// The searched date field
$data['ak_mermix_tools_search_log']['searched'] = array(
    'title' => t('Searched - date'),
    'help' => t('The Searched date.'),
    'field' => array(
        'handler' => 'views_handler_field_date',
	'click sortable' => TRUE,
    ),
    'sort' => array(
        'handler' => 'views_handler_sort_date',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_date',
    ),
);

// The results field
$data['ak_mermix_tools_search_log']['results'] = array(
    'title' => t('Results'),
    'help' => t('The results number.'),
   'field' => array(
        'handler' => 'views_handler_field_numeric',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_numeric',
    ),
);

    return $data;

}