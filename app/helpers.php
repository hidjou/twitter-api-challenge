<?php

if(!function_exists('mapErrors')){
    /**
     * Map errors for each key by taking the first error in the array making it the value
     * @param array $errors The errors array object
     */
    function mapErrors($errors)
    {
        return collect($errors)->map(function($value){
            return $value[0];
        });
    }
}