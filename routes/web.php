<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'PageController@index')->name('index');



Route::group(['prefix' => 'tweets', 'namespace' => 'Tweet', 'as' => 'tweets.'], function(){
    Route::get('/', 'TweetController@index')->name('index');
    
});


Route::get('/{handle}', 'PageController@index')->name('show');