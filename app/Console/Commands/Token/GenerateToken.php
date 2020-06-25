<?php

namespace App\Console\Commands\Token;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

use models\Auth\Token;

class GenerateToken extends Command
{
    protected $signature = 'tokens:generate-token';

    protected $description = 'Generate and store a bearer access token for application only requests by clients';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $baseUrl = env('TWITTER_API_BASE_URL');

        $response = Http::withBasicAuth(env('TWITTER_API_KEY'), env('TWITTER_API_SECRET_KEY'))
            ->post("$baseUrl/oauth2/token?grant_type=client_credentials");

        // If request fails, print error and return
        if($response->failed()){
            echo "Error: " . $response->body();
            return;
        }

        $jsonResponse = json_decode($response->body());
        $token = $jsonResponse->access_token;

        Token::create(['content' => $token]);

        echo "Token generated successfully!";
    }
}
