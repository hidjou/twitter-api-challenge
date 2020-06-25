const mix = require('laravel-mix')
const inDevelopment = process.env.NODE_ENV === 'development'

mix.js('resources/js/app.js', 'public/js').sass(
    'resources/sass/app.scss',
    'public/css'
)

// Bootstrap JS dependencies
mix.copy('node_modules/jquery/dist/jquery.slim.min.js', 'public/js')
mix.copy('node_modules/popper.js/dist/umd/popper.min.js', 'public/js')
mix.copy('node_modules/bootstrap/dist/js/bootstrap.min.js', 'public/js')
// Axios for API calls
mix.js('resources/js/axios.js', 'public/js')

// TwitterFeed react widget
mix.react(
    'resources/js/TweetFeed/App.js',
    'public/js/tweet-feed.js'
).sourceMaps()

// If NODE_ENV is development then run browsersync for hot reloading
if (inDevelopment) {
    mix.browserSync('twitterapi.test')
}

// If in production create new version and create file hash names to bust cached files
if (mix.inProduction()) {
    mix.version()
    mix.then(() => {
        const convertToFileHash = require('laravel-mix-make-file-hash')
        convertToFileHash({
            publicPath: 'public',
            manifestFilePath: 'public/mix-manifest.json',
        })
    })
}
