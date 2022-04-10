import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Header.css';

class Header extends Component {
  render() {
    const { userName, score, assertions, gravatarImage } = this.props;

    return (
      <header className="Header-header">
        <img
          src={ gravatarImage }
          alt="avatar"
          data-testid="header-profile-picture"
          className="header-img"
        />

        <div className="user-info-container">
          <p
            data-testid="header-player-name"
          >
            Nickname:
            <span className="user-info-span">{ userName }</span>
          </p>
          <p
            data-testid="header-score"
          >
            Score:
            <span className="user-info-span">{ score }</span>
          </p>
          <p
            data-testid="feedback-total-question"
          >
            Assertions:
            <span className="user-info-span">{ assertions }</span>
          </p>
        </div>
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
  gravatarImage: player.gravatarImage,
});

Header.propTypes = {
  gravatarImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
