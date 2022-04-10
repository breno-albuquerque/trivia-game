import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionScore } from '../redux/action';
import '../css/Answers.css';

class Answers extends React.Component {
  state = {
    timer: 5,
    isDisabled: false,
    timeOut: false,
  }

  componentDidMount() {
    const second = 1000;
    setInterval(() => {
      const { timer, isDisabled } = this.state;
      if (timer > 0 && isDisabled === false) return this.timeUpdate();
      return null;
    }, second);
  }

  timeUpdate = () => {
    this.setState((prevState) => ({
      timer: prevState.timer - 1,
    }), () => this.handleDisable());
  }

  handleNextTimer = () => {
    this.setState({
      timer: 5,
      isDisabled: false,
      timeOut: false,
    });
  }

  stopTimer = () => {
    this.setState({
      isDisabled: true,
      timeOut: true,
    });
  }

  handleScore = (target, questionObj) => {
    const { dispatch } = this.props;
    const { timer } = this.state;
    const { difficulty } = questionObj;

    let multiplyer;

    if (difficulty === 'easy') {
      multiplyer = 1;
    } else if (difficulty === 'medium') {
      multiplyer = 2;
    } else {
      const magicNum = 3;
      multiplyer = magicNum;
    }

    const ten = 10;
    const score = ten + (timer * multiplyer);

    if (target.innerHTML === questionObj.correct_answer) {
      dispatch(actionScore(score));
    }
  }

  handleDisable = () => {
    const { timer } = this.state;

    if (timer === 0) {
      this.setState({
        isDisabled: true,
        timeOut: true,
      });
    }
  }

  render() {
    const { answers,
      contador,
      results,
      handleColorsClasses,
      isColorVisible,
      turnColorVisible,
      handleNext,
    } = this.props;
    const questionObj = results[contador];
    const { timer, isDisabled, timeOut } = this.state;
    const max = 4;
    return (

      <div
        className="answers-container"
        data-testid="answer-options"
      >
        { answers[contador].map((answer, index) => (
          <button
            disabled={ isDisabled }
            type="button"
            key={ index }
            data-testid={ answer === questionObj.correct_answer ? 'correct-answer'
              : `wrong-answer-${questionObj.incorrect_answers.indexOf(answer)}` }
            className={ isColorVisible || timeOut
              ? handleColorsClasses(answer, questionObj) : 'unknown-answer' }
            onClick={ ({ target }) => {
              turnColorVisible();
              this.stopTimer();
              this.handleScore(target, questionObj);
            } }
          >
            { answer }
          </button>
        )) }

        <p className="timer">{ timer }</p>

        <div className="button-container">
          { timeOut || isColorVisible ? (
            <button
              className="next-question-button"
              data-testid="btn-next"
              type="button"
              onClick={ () => {
                handleNext();
                this.handleDisable();
                this.handleNextTimer();
              } }
            >
              {contador < max ? 'Next' : 'Finish'}
            </button>) : ''}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.fetch.results,
});

Answers.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  turnColorVisible: PropTypes.func.isRequired,
  handleColorsClasses: PropTypes.func.isRequired,
  isColorVisible: PropTypes.func.isRequired,
  contador: PropTypes.number.isRequired,
  answers: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(Answers);
