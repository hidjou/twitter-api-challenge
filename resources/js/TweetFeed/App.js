import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
// Axios for AJAX API calls
import axios from 'axios'
// Classnames for conditional classNames
import classNames from 'classnames'
// dayjs is a tiny alternative to moment when we dont need the whole kitchen sink
import dayjs from 'dayjs'

import TweetCard from './TweetCard'

function App() {
    // State data
    const [handle, setHandle] = useState('')
    const [tweets, setTweets] = useState(null)
    const [user, setUser] = useState(null)
    // Local UI state
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [oldHandle, setOldHandle] = useState('')

    useEffect(() => {
        // If url has a handle get it and search it
        const pathname = window.location.pathname
        // Remove '/' and whitespace
        const handleFromUrl = pathname.trim().slice(1)

        if (handleFromUrl !== '') {
            setHandle(handleFromUrl)
            setOldHandle(handleFromUrl)
            // As useState hook is asynchronis, handle might have not changed yet so use handleFromUrl
            fetchData(handleFromUrl)
        }
    }, [])

    // Client side validation of form for speed and immersion
    function validateInput() {
        // Valid handle for being empty
        if (handle.trim() === '') {
            // Spread errors to not delete other keys if they do exist
            setErrors({ ...errors, handle: 'Handle must not be empty' })
            return false
        }

        setErrors({ ...errors, handle: undefined })
        return true
    }

    const submitHandleForm = (e) => {
        // Prevent submission from adding url query params and refreshing the page
        e.preventDefault()

        // Validate form
        if (!validateInput()) return

        setOldHandle(handle)
        fetchData(handle)
    }

    const fetchData = async (handle) => {
        setLoading(true)

        try {
            const { data: userTweets } = await axios.get(
                `${process.env.MIX_APP_URL}/tweets`,
                {
                    params: { handle },
                }
            )

            setTweets(userTweets)
            if (userTweets.length > 0) {
                setUser(userTweets[0].user)
            }
        } catch (err) {
            if (err.response.status === 404) {
                // Show user not found UI
                setErrors(err.response.data)
            }
        } finally {
            // As we'd stop loading after both getting a result or error so it's more DRY to use 'finally'
            setLoading(false)
            // Enable tooltips
            $('[data-toggle="tooltip"]').tooltip()
        }
    }

    let tweetFeedMarkup
    if (!tweets) {
        // tweets is null, meaning user hasnt searched yet
        tweetFeedMarkup = (
            <div className="col-md-6 font-weight-light">
                <h5 className="text-center mb-2 font-weight-light">
                    Example handles to use
                </h5>
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-link p-0 btn-suggestion"
                        onClick={() => setHandle('big_ben_clock')}
                    >
                        @big_ben_clock
                    </button>
                    <p>Tweets every hour</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-link p-0 btn-suggestion"
                        onClick={() => setHandle('elonmusk')}
                    >
                        @elonmusk
                    </button>
                    <p>Tweets often</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-link p-0 btn-suggestion"
                        onClick={() => setHandle('Every3Minutes')}
                    >
                        @Every3Minutes
                    </button>
                    <p>Tweets every 3 minutes</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-link p-0 btn-suggestion"
                        onClick={() => setHandle('someguy')}
                    >
                        @someguy
                    </button>
                    <p>Has 0 tweets</p>
                </div>
            </div>
        )
    } else if (tweets.length === 0) {
        // tweets is empty, meaning handle searched has no tweets / handle doesnt exist
        tweetFeedMarkup = <p>This user has no tweets</p>
    } else {
        // There are tweets to show
        tweetFeedMarkup = (
            <div className="col-md-6">
                {tweets.map((tweet) => (
                    <TweetCard key={tweet.id} tweet={tweet} />
                ))}
            </div>
        )
    }

    const loadingSpinner = (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )

    const userProfileMarkup = user ? (
        <div className="row justify-content-center">
            <div className="twitter-feed__profile col-md-6">
                <div className="cover" style={{ height: 200 }}>
                    <img src={user.profile_background_image_url_https} alt="" />
                </div>
                <div className="card position-relative">
                    <img
                        className="avatar"
                        src={user.profile_image_url_https}
                        alt="avatar"
                    />
                    <div className="card-body">
                        <div className="card-title">
                            <h4 className="mt-1 mb-0">{user.name}</h4>
                            <p>
                                <a
                                    href={`https://twitter.com/${user.screen_name}`}
                                    target="_blank"
                                    className="text-muted"
                                >
                                    @{user.screen_name}
                                </a>
                            </p>
                            <p>
                                <i className="far fa-calendar-alt"></i> Joined{' '}
                                {dayjs(user.created_at).format('MMM YYYY')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null

    return (
        <Fragment>
            <div className="twitter-feed__header text-center mb-4">
                <img src="https://img.icons8.com/fluent/96/000000/twitter.png" />
                <h1 className="mb-2">Twitter API App</h1>
                <p>
                    Enter a Twitter user handle and see what they've been
                    tweetting.
                </p>
            </div>

            <div className="twitter-feed__search row justify-content-center mb-3">
                <div className="col-md-6">
                    <form onSubmit={submitHandleForm}>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text tw-prepend">
                                    @
                                </div>
                            </div>
                            <input
                                type="text"
                                className={classNames(
                                    'form-control tw-shadow',
                                    {
                                        'is-invalid': errors.handle,
                                    }
                                )}
                                id="handle"
                                placeholder="Handle (e.g. big_ben_clock)"
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-right tw-wide-button"
                                    id="handleFormSubmitBtn"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Fragment>
                                            <span
                                                className="spinner-border spinner-border-sm mr-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Loading...
                                        </Fragment>
                                    ) : handle !== '' &&
                                      handle === oldHandle ? (
                                        'Refresh'
                                    ) : (
                                        'Search'
                                    )}
                                </button>
                            </div>
                            <div className="invalid-feedback pl-5">
                                {errors.handle}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {userProfileMarkup}
            <div className="twitter-feed__tweets row justify-content-center">
                {loading ? loadingSpinner : tweetFeedMarkup}
            </div>
        </Fragment>
    )
}

const reactAppEl = document.getElementById('reactTweetFeed')

if (reactAppEl) {
    // const attr = JSON.parse(reactAppEl.attributes.attr.value)
    ReactDOM.render(<App />, reactAppEl)
}
