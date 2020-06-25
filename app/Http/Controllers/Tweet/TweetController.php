<?php

namespace App\Http\Controllers\Tweet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

use models\Auth\Token;

class TweetController extends Controller
{
    /**
     * Get tweets posted by the user with the handle received with the request
     */
    public function index(Request $request)
    {
        // Server validation in case API is used externally or user fiddles with UI
        $validator = Validator::make(
            $request->all(),
            [ 'handle' => 'required' ],
            [ 'handle.required' => 'Handle must not be empty']
        );
        
        if ($validator->fails()) {
            // Using global helper mapErrors (look at /app/helpers.php)
            $errors = mapErrors($validator->errors());
            return response()->json($errors, 400);
        }

        $userHandle = $request->query("handle");
        $page = $request->input("page") ?? 1;

        // Get a valid token
        $token = Token::latest()->first();

        // Request tweets by the account with the handle given
        $response = Http::withHeaders(['Authorization' => 'Bearer ' . $token->content])
            ->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=$userHandle&page=$page");


        // Check for errors
        if($response->failed()){
            // Non existing user error
            if($response->status() == 404){
                return response()->json(['handle' => 'User not found'], 404);
            }

            // Any other error
            // Log error (to local/server log files / Sentry / Slack) depending on env LOG_CHANNEL
            Log::error("Error while fetching tweets: $response");
            return response()->json(['error' => 'Something went wrong'], 500);
        }

        return response()->json($response->json());
    }
}
