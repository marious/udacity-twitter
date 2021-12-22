import { connect, useSelector } from 'react-redux';
import Tweet from './Tweet';
import NewTweet from './NewTweet';
import { useParams } from 'react-router-dom';

const TweetPage = () => {
  const { id } = useParams();
  const replies = useSelector(state => {
    return !state.tweets[id]
      ? []
      : state.tweets[id].replies.sort(
          (a, b) => state.tweets[b].timestamp - state.tweets[a].timestamp
        );
  });

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

export default TweetPage;
