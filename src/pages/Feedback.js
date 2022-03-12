import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  render() {
    const { userName, userEmail, score } = this.props;
    const hash = md5(userEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header>
        <img src={ url } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid={ finish ? "feedback-total-score" : "header-score"}>{ score }</p>
        <p data-testid='feedback-total-question'>{'Colocar os acertos aqui'}</p>
        {finish ? <p data-testid="feedback-text">{ msg }</p> : ''}
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  userEmail: player.gravatarEmail,
  userName: player.name,
  score: player.score,
});

Feedback.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
