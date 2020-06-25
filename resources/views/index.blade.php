<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ env('APP_NAME') }}</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">

    {{-- Fav icon --}}
    <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluent/32/000000/twitter.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://img.icons8.com/fluent/16/000000/twitter.png">

    {{-- FA --}}
    <script src="https://kit.fontawesome.com/f5906c45f1.js" crossorigin="anonymous"></script>

    <!-- Styles -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>

<body>
    <div class="container pt-4 twitter-feed" id="reactTweetFeed">
        {{-- <div class="text-center mb-4">
            <img src="https://img.icons8.com/fluent/96/000000/twitter.png" />
            <h1>Twitter API App</h1>
            <p>Enter a Twitter user handle and see what they've been tweetting.</p>

        </div>

        <div class="row justify-content-center">
            <div class="col-md-6">
                <form id="handleForm" method="POST">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text tw-prepend">@</div>
                        </div>
                        <input type="text" class="form-control" id="handle" placeholder="Handle (e.g. big_ben_clock)">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary">Search</button>
                        </div>
                        <div class="invalid-feedback pl-5" id="handleError"></div>
                    </div>
                </form>
            </div>
        </div> --}}
    </div>
    {{-- BS deps --}}
    {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.4.2/umd/popper.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script> --}}
    <script src="{{ mix('js/jquery.slim.min.js') }}" type="text/javascript"></script>
    <script src="{{ mix('js/popper.min.js') }}" type="text/javascript"></script>
    <script src="{{ mix('js/bootstrap.min.js') }}" type="text/javascript"></script>

    <script src="{{ mix('js/axios.js') }}" type="text/javascript"></script>
    <script src="{{ mix('js/tweet-feed.js') }}" type="text/javascript"></script>
    <script>
        // Intialize BS tooltips
        // Enable all tooltips and popovers
        
        // // Form elements
        // const handleForm = document.getElementById('handleForm')
        // const handleInput = document.getElementById('handle')


        // // let csrfToken = document.querySelector('meta[name="csrf-token"]').content
        // // axios.defaults.headers["X-XSRF-TOKEN"] = csrfToken;

        // // Client side validation of form for speed and immersion
        // function validateInput(){
        //     const handleError = document.getElementById('handleError')
        //     // Valid handle for being empty
        //     if(handleInput.value === ""){
        //         handleInput.classList.add('is-invalid')
        //         handleError.innerHTML = "Handle must not be empty"
        //         return false;
        //     }

        //     // Remove class in case input was invalid
        //     handleInput.classList.remove('is-invalid')
        //     return true
        // }

        // let results

        // handleForm.addEventListener('submit', async (e) => {
        //     // Prevent submission from adding url query params and refreshing the page
        //     e.preventDefault();

        //     // Validate form
        //     if(!validateInput()) return;
            
        //     try{
        //         const res = await axios.get(' {{ route('tweets.index') }}', {
        //             params: { handle: handleInput.value }
        //         })

        //         console.log(res.data)
        //         results = res.data
        //     } catch(err){
        //         console.log('Error: ', err)

        //         // TODO: Handle 'user not found' error

        //         // TODO: Handle 'user has no tweets' error
        //     }
        // })
    </script>
</body>

</html>