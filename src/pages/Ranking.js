import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionClear, actionResetPlayer } from '../redux/action';

class Ranking extends Component {
  render() {
    const { history, dispatch } = this.props;
    const players = JSON.parse(localStorage.getItem('ranking'));

    const orderdPlayers = players.sort((a, b) => (b.score - a.score));

    return (
      <div>
        <h1 data-testid="ranking-title">Hello</h1>

        <ol>
          { orderdPlayers.map((player, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>
                {' '}
                { player.score }
                {' '}
              </p>
              <p>
                {' '}
                <img src="player.picture" alt="avatar" />
                {' '}
              </p>
            </li>
          )) }
        </ol>

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            history.push('/');
            dispatch(actionClear());
            dispatch(actionResetPlayer());
          } }
        >
          Home

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
