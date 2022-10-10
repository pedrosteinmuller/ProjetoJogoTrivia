import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  state = {
    niceTry: false,
  };

  componentDidMount() {
    const { assertions } = this.props;
    const MIN_CORRECT = 3;
    if (assertions >= MIN_CORRECT) {
      this.setState({
        niceTry: true,
      });
    }
  }

  render() {
    const { total, assertions } = this.props;
    const { niceTry } = this.state;
    return (
      <main>
        <h1>Feedback</h1>
        <div data-testid="feedback-text">
          {niceTry
            ? (
              <p>Well Done!</p>
            ) : (
              <p>Could be better...</p>)}
        </div>
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
