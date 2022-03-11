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

  componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    dispatch(actionFetch(token));
  }

  render() {
    const { result, history, dispatch } = this.props;
    const { contador } = this.state;
    const max = 4;
    if (contador > max) history.push('/feedback');
    return (
      <div>
        <Feedback />
        {result.map((element, i) => {
          if (i === contador) {
            const sortQuestions = [...element.incorrect_answers, element.correct_answer];
            sortQuestions.sort();
            return (
              <fieldset>
                <div data-testid="question-category">{ element.category }</div>
                <div data-testid="question-text">{ element.question }</div>
                <div data-testid="answer-options">
                  { sortQuestions.map((question, index) => (
                    <button
                      type="button"
                      key={ index }
                      data-testid={ question === element.correct_answer ? 'correct-answer'
                        : `wrong-answer-${element.incorrect_answers.indexOf(question)}` }
                      onClick={ ({ target }) => {
                        if (target.innerHTML === element.correct_answer) {
                          dispatch(actionScore(1));
                        }
                      } }
                    >
                      { question }
                    </button>
                  ))}
                </div>
              </fieldset>
            );
          }
          return (''); // Gambiarra pro lint
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
});

TelaDoJogo.propTypes = {
  result: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TelaDoJogo);
