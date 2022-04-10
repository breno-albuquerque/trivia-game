import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionClear, actionResetPlayer } from '../redux/action';
import '../css/Ranking.css';

class Ranking extends Component {
  render() {
    const { history, dispatch } = this.props;
    const players = JSON.parse(localStorage.getItem('ranking'));

    const orderdPlayers = players.sort((a, b) => (b.score - a.score));

    return (
      <div className="ranking-container">
        <header className="ranking-header">
          <h1
            className="ranking-title"
            data-testid="ranking-title"
          >
            Ranking
          </h1>
        </header>

        <div className="ol-container">
          <button
            className="ranking-home-btn"
            type="button"
            data-testid="btn-go-home"
            onClick={ () => {
              history.push('/');
              dispatch(actionClear());
              dispatch(actionResetPlayer());
            } }
          >
            Go Home
          </button>
          <ol className="ranking-ol">
            { orderdPlayers.map((player, index) => (
              <li className="ranking-li" key={ index }>
                <div className="position">
                  {index + 1}
                  º
                </div>
                <div className="player-info-container">
                  <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                  <p>
                    {' '}
                    <img src={ player.picture } alt="avatar" />
                    {' '}
                  </p>
                  <p data-testid={ `player-score-${index}` }>
                    Score:
                    {' '}
                    { player.score }
                    {' '}
                  </p>
                </div>
              </li>
            )) }
          </ol>

        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
