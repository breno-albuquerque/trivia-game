import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
          } return ('');
        }) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.fetch.results,
});

Question.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  contador: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Question);
