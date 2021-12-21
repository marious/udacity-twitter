import { connect, useSelector } from 'react-redux';
import Tweet from './Tweet';
import NewTweet from './NewTweet';
import { useParams } from 'react-router-dom';
import { setTweetId } from '../actions/tweets';
const TweetPage = ({ replies, setTweetId }) => {
  const { id } = useParams();
  setTweetId(id);

  return (
    <div>
      <Tweet id={id} />
      <NewTweet id={id} />
      {replies.length !== 0 && <h3 className="center">Replies</h3>}
      <ul>
        {replies.map(replyId => (
          <li key={replyId}>
            <Tweet id={replyId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ tweets, id }) => {
  console.log(id);
  return {
    replies: [],
    id: 1,
  };
  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort(
          (a, b) => tweets[b].timestamp - tweets[a].timestamp
        ),
  };
};

const mapDispatchToProps = dispatch => ({
  setTweetId: () => dispatch(setTweetId()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TweetPage);
