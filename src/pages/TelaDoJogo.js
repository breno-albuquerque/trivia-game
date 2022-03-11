import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Feedback from './Feedback';
import { actionFetch, actionScore } from '../redux/action';

class TelaDoJogo extends Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
    };
  }

  handleInvalidTonken = async () => {
    const { dispatch } = this.props;

    const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await fetchApiToken.json();
    localStorage.setItem('token', token);
    dispatch(actionFetch(token));
  }

  render() {
    const { result, history, dispatch, response } = this.props;
    const { contador } = this.state;
    const max = 4;


    if (contador > max) history.push('/feedback');

    if (response === 3) {
      this.handleInvalidTonken();
    }

    return (
      <div>
        <Feedback />
        {result.map((element, i) => {
          const sortQuestions = [...element.incorrect_answers, element.correct_answer];
          sortQuestions.sort();
          if (i === contador) {
            return (
              <fieldset>
                <div data-testid="question-category">{ element.category }</div>
                <div data-testid="question-text">{ element.question }</div>
                <div data-testid="answer-options">
                  { sortQuestions.map((question, index) => (
                    <button
                      type="button"
                      key={ index }
                      data-testid={ question === element.correct_answer
                        ? 'correct-answer' : `wrong-answer-${index}` }
                      onClick={ ({ target }) => {if (target.innerHTML === element.correct_answer) dispatch(actionScore(1))} }
                    >
                      { question }
                    </button>
                  ))}
                </div>
              </fieldset>
            );
          }
        })}
        <button
          data-testid="btn-next"
          type="button"
          onClick={ () => {
            this.setState((prev) => ({ contador: prev.contador + 1 }));
          } }
        >
          {contador < max ? 'Proxima pergunta' : 'Finalizar'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: state.fetch.results,
  response: state.fetch.response_code,
});

TelaDoJogo.propTypes = {
  result: PropTypes.objectOf(PropTypes.any).isRequired,
  response: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TelaDoJogo);
