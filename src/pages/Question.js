import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import '../css/Question.css';

class Question extends React.Component {
  render() {
    const { results, contador } = this.props;

    return (
      <section className="question-section">
        { results.map((element, index) => {
          if (contador === index) {
            return (
              <fieldset className="question-fieldset" key={ index }>
                <div
                  dangerouslySetInnerHTML={ { __html: sanitizeHtml(element.category) } }
                  className="fieldset-category-div"
                  data-testid="question-category"
                />
                <div
                  dangerouslySetInnerHTML={ { __html: sanitizeHtml(element.question) } }
                  className="fieldset-question-div"
                  data-testid="question-text"
                />
              </fieldset>
            );
          } return ('');
        }) }
      </section>
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
