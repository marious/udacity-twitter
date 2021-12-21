import { useState } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

const NewTweet = ({ id = null, addNewTweet }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    const text = e.target.value;
    setInputValue(text);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addNewTweet(inputValue, id);
    setInputValue('');
  };

  {
    /* todo: Redirect to / if submitted */
  }

  const tweetLeft = 280 - inputValue.length;

  return (
    <div>
      <h3 className="center">Compose New Tweet</h3>
      <form className="new-tweet" onSubmit={handleSubmit}>
        <textarea
          placeholder="What's happening?"
          value={inputValue}
          onChange={handleChange}
          className="textarea"
          cols="10"
          maxLength={280}
        ></textarea>
        {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
        <button type="submit" className="btn" disabled={inputValue === ''}>
          {' '}
          Submit
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addNewTweet: (tweet, id) => dispatch(handleAddTweet(tweet, id)),
});

export default connect(null, mapDispatchToProps)(NewTweet);
