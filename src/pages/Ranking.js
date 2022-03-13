import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Hello</h1>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {};
// }

export default connect(mapStateToProps)(Ranking);
