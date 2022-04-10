import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionClear } from '../redux/action';
import '../css/Header.css';
import Header from './Header';

export class Feedback extends Component {
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
    const { score, finish, assertions } = this.props;
    const msg = assertions <= 2 ? 'Could be better...' : 'Well Done!';

    return (
      <div>
        { finish ? (
          <div>
            <Header />
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
      </div>
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
