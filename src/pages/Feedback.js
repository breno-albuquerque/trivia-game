import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { actionClear } from '../redux/action';

class Feedback extends Component {
  handleClick = () => {
    const { dispatch, history } = this.props;
    history.push('/');
    dispatch(actionClear());
  };

  click = () => {
    const { history } = this.props;
    history.push('./ranking');
  }

  render() {
    const { userName, userEmail, score, finish, assertions } = this.props;
    const hash = md5(userEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    const msg = assertions <= 2 ? 'Could be better...' : 'Well Done!';
    return (
      <header>
        <img src={ url } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        { finish ? (
          <div>
            <p data-testid="feedback-total-score">{ score }</p>
            <p data-testid="feedback-text">{ msg }</p>
            <button
              data-testid="btn-play-again"
              type="button"
              onClick={ this.handleClick }
            >
              Play Again
            </button>
            <button
              data-testid="btn-ranking"
              type="button"
              onClick={ this.click }
            >
              Ranking
            </button>
          </div>) : ('') }
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  userEmail: player.gravatarEmail,
  userName: player.name,
  score: player.score,
  assertions: player.assertions,
  finish: player.finish,
});

Feedback.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  finish: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
