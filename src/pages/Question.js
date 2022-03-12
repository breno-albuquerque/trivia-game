import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
  render() {
    const { results, contador } = this.props;

    return (
      <div>
        { results.map((element, index) => {
          if (contador === index) {
            return (
              <fieldset key={ index }>
                <div data-testid="question-category">{ element.category }</div>
                <div data-testid="question-text">{ element.question }</div>
              </fieldset>
            );
          }
        }) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.fetch.results,
});

export default connect(mapStateToProps, null)(Question);
