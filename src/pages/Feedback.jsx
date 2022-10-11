import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { total, assertions, history } = this.props;

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
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  total: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
// Fix.
