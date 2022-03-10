import React, { Component } from 'react';
// import Feedback from './Feedback';
import { connect } from 'react-redux';

class TelaDoJogo extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    }
  }

  async componentDidMount() {
    const { fetch } = this.props;
    console.log(fetch[0])
  }

  render() {
    const { index } = this.state;
    // const { category, question, correct_answer, incorrect_answers } = results[index]
    return (
      <div data-testid='answer-options'>
        {/* <p data-testid='question-category'>{ category }</p>
        <p data-testid='question-text'>{ question }</p>
        <div>
          <p data-testid='correct-answer'>{ correct_answer }</p>
          {incorrect_answers.forEach((element, i) => {
            return <p data-testid={`wrong-answer-${i}`}>{ element }</p>
          })}
        </div>
        <button onClick={ () => { this.setState((prev) => ({ index: prev + 1 })) } }>Proxima pergunta</button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  fetch: state.fetch.results
});

export default connect(mapStateToProps)(TelaDoJogo);

const oi = {response_code:0, results: [
  {"category":"Entertainment: Music","type":"multiple","difficulty":"easy","question":"According to the American rapper Nelly, what should you do when its hot in here?","correct_answer":"Take off all your clothes","incorrect_answers":["Take a cool shower","Drink some water","Go skinny dipping"]},
  {"category":"Entertainment: Video Games","type":"multiple","difficulty":"hard","question":"The &#039;D&#039; in the term &quot;D-Mail&quot; from the game &quot;Steins; Gate&quot; is short for what?","correct_answer":"DeLorean","incorrect_answers":["Deep","Demo","Dev"]},
  {"category":"Entertainment: Film","type":"multiple","difficulty":"hard","question":"What is the name of the supercomputer located in the control room in &quot;Jurassic Park&quot; (1993)?","correct_answer":"Thinking Machines CM-5","incorrect_answers":["Cray X-MP","Cray XK7","IBM Blue Gene\/Q"]},
  {"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"Which alternative rock band released the critically-acclaimed album &quot;OK Computer&quot;?","correct_answer":"Radiohead","incorrect_answers":["R.E.M.","Nirvana","Coldplay"]},
  {"category":"General Knowledge","type":"multiple","difficulty":"medium","question":"What is the highest number of Michelin stars a restaurant can receive?","correct_answer":"Three","incorrect_answers":["Four","Five","Six"]}
]}
console.log(oi.results[0])