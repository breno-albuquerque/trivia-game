// import React, { Component } from 'react';
// import Feedback from './Feedback';
// import { connect } from 'react-redux';


// class TelaDoJogo extends Component {
//   constructor() {
//     super();
//     this.state = {
//       index: 0,
//     }
//   }
//   render() {
//     const { fetch } = this.props;
//     const { index } = this.state;
//     console.log(fetch[0])
//     // const { category, question, correct_answer, incorrect_answers } = response[index]
//     return (
//       <div data-testid='answer-options'>
//         {/* <p data-testid='question-category'>{ category }</p>
//         <p data-testid='question-text'>{ question }</p>
//         <div>
//           <p data-testid='correct-answer'>{ correct_answer }</p>
//           {incorrect_answers.forEach((element, i) => {
//             return <p data-testid={`wrong-answer-${i}`}>{ element }</p>
//           })}
//         </div>
//         <button onClick={ () => { this.setState((prev) => ({ index: prev + 1 })) } }>Proxima pergunta</button> */}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   token: state.token,
//   fetch: state.fetch.results,
// });

// export default connect(mapStateToProps)(TelaDoJogo);

