<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PageController extends Controller
{
    // Return home view
    public function index()
    {
        $message = "hello world";
        return view('index', compact('message'));
    }
}
