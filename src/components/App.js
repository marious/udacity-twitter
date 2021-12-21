import { connect } from 'react-redux';
import {
  Route,
  Routes,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { useEffect, Fragment } from 'react';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading-bar';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import Nav from './Nav';

{
  /* <TweetPage match={{ params: { id: '8xf0y6ziyjabvozdd253nd' } }} /> */
}

const App = ({ tweets = {}, users = {}, loading = null, startInitialData }) => {
  useEffect(() => {
    startInitialData();
  }, []);
  return (
    <Router>
      <Fragment>
        <div className="container">
          <LoadingBar />
          <Nav />
          {loading === true ? null : (
            <div>
              <Route path="/" exact component={Dashboard} />
              <Route path="/tweet/:id" component={TweetPage} />
              <Route path="/new" component={NewTweet} />
            </div>
          )}
        </div>
      </Fragment>
    </Router>
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
