import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionClear } from '../redux/action';

class Ranking extends Component {
  render() {
    const { history, dispatch } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Hello</h1>

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            history.push('/');
            dispatch(actionClear());
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
