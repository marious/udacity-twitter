import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { Link, withRouter } from 'react-router-dom';
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
} from 'react-icons/ti/index';
import { handleToggleTweet } from '../actions/tweets';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Tweet = ({ authedUser, tweet, toggleLikeTweet }) => {
  let history = useHistory();

  const toParent = (e, id) => {
    e.preventDefault();
    history.push(`/tweet/${id}`);
  };

  const handleLike = e => {
    e.preventDefault();
    toggleLikeTweet({ id: tweet.id, hasLiked: tweet.hasLiked, authedUser });
  };

  if (tweet === null) {
    return <p>This Tweet doesn't existed</p>;
  }

  const { name, avatar, timestamp, text, hasLiked, likes, replies, parent } =
    tweet;

  return (
    <Link to={`/tweet/${tweet.id}`} className="tweet">
      <div className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={e => toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
        </div>
        <div className="tweet-icons">
          <TiArrowBackOutline className="tweet-icon" />
          <span>{replies !== 0 && replies}</span>
          <button className="heart-button" onClick={handleLike}>
            {hasLiked === true ? (
              <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
            ) : (
              <TiHeartOutline className="tweet-icon" />
            )}
          </button>
          <span>{likes !== 0 && likes}</span>
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleLikeTweet: tweet => dispatch(handleToggleTweet(tweet)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tweet));
