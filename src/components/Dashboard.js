import { connect } from 'react-redux';
import Tweet from './Tweet';

const Dashboard = ({ tweetIds = [] }) => {
  return (
    <div>
      <h3 className="center">Your Timeline</h3>
      <ul className="dashboard-list">
        {tweetIds.map(id => (
          <li key={id}>
            <Tweet id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  tweetIds: Object.keys(state.tweets).sort(
    (a, b) => state.tweets[b].timestamp - state.tweets[a].timestamp
  ),
});

export default connect(mapStateToProps, null)(Dashboard);
