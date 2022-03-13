import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  render() {
    const { userName, userEmail, score, finish, assertions } = this.props;
    const hash = md5(userEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    const msg = assertions <= 2 ? 'Could be better...' : 'Well Done!';
    return (
      <header>
        <img src={ url } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ userName }</p>
        { finish ? <p data-testid="feedback-total-score">{ score }</p>
          : '' }
        <p data-testid="header-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        { finish ? <p data-testid="feedback-text">{ msg }</p> : ''}
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
};

export default connect(mapStateToProps, null)(Feedback);
