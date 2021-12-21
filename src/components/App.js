import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { useEffect } from 'react';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading-bar';
import NewTweet from './NewTweet';

const App = ({ tweets = {}, users = {}, loading = null, startInitialData }) => {
  useEffect(() => {
    startInitialData();
  }, []);
  return (
    <div>
      <LoadingBar />
      {loading === true ? null : <NewTweet />}
    </div>
  );
};

const mapStateToProps = state => ({
  tweets: state.tweets,
  users: state.users,
  loading: state.authedUser === null,
});

const mapDispatchToProps = dispatch => ({
  startInitialData: () => dispatch(handleInitialData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
