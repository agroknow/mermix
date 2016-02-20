<?php

require_once('orion_fw/autoloader/autoloader.php');

function mfOrionConnect() {
    $ip = "185.23.171.92";
    $connection = new Orion\ContextBroker($ip,1099);
    return $connection;
}

function mfGetAllEntities($entityType) {
    
    $orionConection = mfOrionConnect();
    if($orionConection->checkStatus()) {
    $QUERY = new Orion\Operations\queryContext();
    $reqBody = $QUERY->addElement(".*", $entityType, true)->getRequest();
    $raw_return = $orionConection->queryContext($reqBody);
    $Context = new Orion\Context\Context($raw_return);
    $object = $Context->__toObject();

    return $object;
    }
}

function mfGetUserAttributesArray( $orionUserId ) {
    $AttributesArray = array('searches' => array(), 'categories' => array(), 'cultivations' => array(), 'machines' => array());
    
    $orionConection = mfOrionConnect();
    if($orionConection->checkStatus()) {
    $QUERY = new Orion\Operations\queryContext();
    $reqBody = $QUERY->addElement($orionUserId, "User", false)->getRequest();
    $raw_return = $orionConection->queryContext($reqBody);
    $Context = new Orion\Context\Context($raw_return);
    $object = $Context->__toObject();

    if (isset($object->errorCode->code) && $object->errorCode->code != "200") {
        mfUpdateUser($orionUserId);
    } else {
        $contextResponses = $object->contextResponses;

        foreach ($contextResponses as $contextElement) {
            if(isset($contextElement->contextElement->attributes)) {
            $attributes = $contextElement->contextElement->attributes;
                foreach ($attributes as $attr) {
                    $AttributesArray[$attr->name] = json_decode(json_encode($attr->value),true);
                }
            }   
        }
    }
    return $AttributesArray;
    }
}

function mfUpdateUser( $orionUserId, $attributesArray = array(), $location = array()) {
    
    $orionConection = mfOrionConnect();
    if($orionConection->checkStatus()) {
    $UPDATE = new \Orion\Operations\updateContext();
    $UPDATE->addElement($orionUserId, "User", false);
    foreach ($attributesArray as $key => $value) {
        $UPDATE->addAttrinbute($key, "T", $value);
    }
    if($location) {
        $UPDATE->addGeolocation($location[0], $location[1]);
    }
    $UPDATE->setAction("APPEND"); // Use append - append acts as update if exists
    $reqBody = $UPDATE->getRequest();
    $raw_return = $orionConection->updateContext($reqBody);
    return $raw_return;
    }
}

function mfUpdateMachine( $machineId, $attributesArray = array(), $location = array()) {
    
    $orionConection = mfOrionConnect();
    if($orionConection->checkStatus()) {
    $UPDATE = new \Orion\Operations\updateContext();
    $UPDATE->addElement($machineId, "Machine", false);
    foreach ($attributesArray as $key => $value) {
        $UPDATE->addAttrinbute($key, "T", $value);
    }
    if($location) {
        $UPDATE->addGeolocation($location[0], $location[1]);
    }
    $UPDATE->setAction("APPEND"); // Use append - append acts as update if exists
    $reqBody = $UPDATE->getRequest();
    $raw_return = $orionConection->updateContext($reqBody);
    return $raw_return;
    }
}

function mfGetLocation($user) {
    if($user->uid > 0) {
        $user_data = user_load($user->uid);
        $lat = isset($user_data->field_place['und']['0']['lat']) ? $user_data->field_place['und']['0']['lat'] : '';
        $lon = isset($user_data->field_place['und']['0']['lon']) ? $user_data->field_place['und']['0']['lon'] : '';
        if($lat && $lon) {
            $location = array($lat,$lon);
        } else {
            $location = isset($_COOKIE['geolocation']) ? explode( ',', $_COOKIE['geolocation']) : false;
        }
    } else {
        $location = isset($_COOKIE['geolocation']) ? explode( ',', $_COOKIE['geolocation']) : false;
    }
    return $location;
}