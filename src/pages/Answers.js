import React from 'react';
import { connect } from 'react-redux';
import { actionAssertion, actionScore } from '../redux/action';

class Answers extends React.Component {
  state = {
    timer: 30,
    isDisabled: false,
    timeOut: false,
  }

  componentDidMount() {
    console.log('teste');
    setInterval(() => {
      const { timer, isDisabled } = this.state;
      if (timer > 0 && isDisabled === false) return this.timeUpdate();
      return null;
    }, 1000);
  }

  timeUpdate = () => {
    this.setState((prevState) => ({
      timer: prevState.timer - 1,
    }), () => this.handleDisable());
  }

  handleNextTimer = () => {
    this.setState({
      timer: 30,
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
      multiplyer = 3;
    }

    const score = 10 + (timer * multiplyer);

    if (target.innerHTML === questionObj.correct_answer) {
      dispatch(actionAssertion(1));
      dispatch(actionScore(score));

      //  localStorage.setItem('ranking', response.token);
    }
  }

  handleDisable = () => {
    const { dispatch } = this.props;
    const { timer } = this.state;

    if (timer === 0) {
      this.setState({
        isDisabled: true,
        timeOut: true,
      });
    }
  }

  render() {
    const { answers, contador, results, handleColorsClasses, isColorVisible, turnColorVisible, max, handleNext } = this.props;
    const questionObj = results[contador];
    const { timer, isDisabled, timeOut } = this.state;

    return (
      <div data-testid="answer-options">
        { answers[contador].map((answer, index) => (
          <button
            disabled={ isDisabled }
            type="button"
            key={ index }
            data-testid={ answer === questionObj.correct_answer ? 'correct-answer' : `wrong-answer-${questionObj.incorrect_answers.indexOf(answer)}` }
            className={ isColorVisible || timeOut ? handleColorsClasses(answer, questionObj) : null }
            onClick={ ({ target }) => {
              turnColorVisible();
              this.stopTimer();
              this.handleScore(target, questionObj);
            } }
          >
            { answer }
          </button>
        )) }
        <p>{ timer }</p>
        <div>
          { timeOut || isColorVisible ? (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ () => {
                handleNext();
                this.handleDisable();
                this.handleNextTimer();
              } }
            >
              {contador < max ? 'Proxima pergunta' : 'Finalizar'}
            </button>) : ''}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.fetch.results,
});

export default connect(mapStateToProps, null)(Answers);
