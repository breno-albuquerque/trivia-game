import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionClear, actionResetPlayer } from '../redux/action';
import '../css/Header.css';
import Header from './Header';
import '../css/Feedback.css';

export class Feedback extends Component {
  handleClick = () => {
    const { dispatch, history } = this.props;
    history.push('/');
    dispatch(actionClear());
    dispatch(actionResetPlayer());
  };

  click = () => {
    const { history } = this.props;
    history.push('./ranking');
  }

  render() {
    const { score, finish, assertions } = this.props;
    const msg = assertions <= 2 ? 'Could be better...' : 'Well Done!';

    return (
      <section className="feedback-page-container">
        { finish ? (
          <div className="feedback-container">
            <Header />
            <div className="feedback-info-container">
              <p
                className="feedback-score"
                data-testid="feedback-total-score"
              >
                Total Score:
                <span className="score-span-feedback">{ score }</span>
              </p>
              <p
                className="feedback-msg"
                data-testid="feedback-text"
              >
                { msg }
              </p>
              <button
                className="play-again-button"
                data-testid="btn-play-again"
                type="button"
                onClick={ this.handleClick }
              >
                Play Again
              </button>
              <button
                className="ranking-button"
                data-testid="btn-ranking"
                type="button"
                onClick={ this.click }
              >
                Ranking
              </button>
            </div>
          </div>) : ('') }
      </section>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  score: player.score,
  finish: player.finish,
  assertions: player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  finish: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
