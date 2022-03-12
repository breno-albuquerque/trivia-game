import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from './Question';
import Feedback from './Feedback';
import Answers from './Answers';
import './TelaDoJogo.css';

class TelaDoJogo extends Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
      isColorVisible: false,
      answers: [],
    };

    this.turnColorVisible = this.turnColorVisible.bind(this);
  }

  componentDidMount() {
    const { result } = this.props;

    result.forEach((element) => {
      const sortAnswers = [...element.incorrect_answers, element.correct_answer];
      this.shuffleArray(sortAnswers);

      this.setState((prevState) => ({
        answers: [...prevState.answers, sortAnswers],
      }));
    });
  }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  turnColorVisible = () => {
    this.setState({
      isColorVisible: true,
    });
  }

  handleNext = () => {
    this.setState((prev) => ({ contador: prev.contador + 1, isColorVisible: false }));
  }

  handleColorsClasses = (answer, questionObj) => {
    console.log('class');
    if (answer === questionObj.correct_answer) return 'correct-answer';
    return 'wrong-answer';
  }

  render() {
    const { history } = this.props;
    const { contador, isColorVisible, answers } = this.state;
    const max = 4;
    if (contador > max) history.push('/feedback');

    return (
      <div>

        <Feedback />

        <Question contador={ contador } />

        { answers.length > 0
        && <Answers
          contador={ contador }
          answers={ answers }
          isColorVisible={ isColorVisible }
          handleScore={ this.handleScore }
          handleColorsClasses={ this.handleColorsClasses }
          turnColorVisible={ this.turnColorVisible }
          handleNext={ this.handleNext }
          max={ max }
        />}

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
