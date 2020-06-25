import React from 'react'
// dayjs is a tiny alternative to moment when we dont need the whole kitchen sink
import dayjs from 'dayjs'
// Adding relativeTime plugin to show time as a difference from now
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// A day's duration in ms
const ONE_DAY = 60 * 60 * 24 * 1000

export default function TweetCard({ tweet }) {
    // Tweet timestamp
    // TODO: Use locatlization to get an accurate result based on the user's timezone
    const tweetTimestamp = new Date(tweet.created_at)
    const lessThanADayAgo = new Date() - tweetTimestamp < ONE_DAY

    // If less than a day ago use '2 hours ago' fromat else show date. e.g. 'Mar 30, 2020'
    const timeMarkup = lessThanADayAgo
        ? dayjs(tweet.created_at).fromNow(true) // using true to remove 'ago'
        : dayjs(tweet.created_at).format('MMMM DD, YYYY')

    return (
        <div className="card my-3">
            <div className="card-body">
                <div className="card-title mb-3">
                    <p>
                        <a
                            href={`https://twitter.com/${tweet.user.screen_name}`}
                            target="_blank"
                            className="mr-1"
                        >
                            {tweet.user.name}
                        </a>
                        <span className="text-muted">
                            @{tweet.user.screen_name}
                            {' - '}
                            {timeMarkup}
                        </span>
                    </p>
                </div>
                <p className="card-text my-3">{tweet.text}</p>
                <div className="d-flex justify-content-around tw-tweet">
                    {/* <div>
                        <i className="fas fa-comment c-blue mr-2"></i>
                    </div> */}
                    {/* Number of likes */}
                    <div
                        data-trigger="hover"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Likes"
                    >
                        <i className="fas fa-heart c-blue mr-2"></i>
                        {tweet.favorite_count}
                    </div>
                    {/* Number of retweets */}
                    <div
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Retweets"
                    >
                        <i className="fas fa-retweet c-blue mr-2"></i>
                        {tweet.retweet_count}
                    </div>
                </div>
            </div>
        </div>
    )
}
