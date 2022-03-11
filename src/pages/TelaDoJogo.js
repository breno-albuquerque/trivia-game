import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Feedback from './Feedback';
import { actionFetch, actionScore } from '../redux/action';
import Feedback from './Feedback';

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

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
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
            this.shuffleArray(sortQuestions);
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
