import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { total, assertions } = this.props;

    return (
      <main>
        <h1 data-testid="feedback-text">Feedback</h1>
        <p>
          {'Total score: '}
          <span data-testid="feedback-total-score">
            { total }
          </span>
        </p>

        <p>
          {'Total assertions: '}
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
        </p>
      </main>
    );
  }
}

Feedback.propTypes = {
  total: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  total: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
