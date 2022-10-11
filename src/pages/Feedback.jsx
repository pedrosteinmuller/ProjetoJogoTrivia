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

  returnToLogin = () => {
    const { history: { push } } = this.props;
    return push('/');
  };

  render() {
    const { total, assertions, history, name, score, gravatar } = this.props;
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
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
        <button
          type="button"
          onClick={ this.returnToLogin }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${gravatar}` }
            style={ { width: '30px', borderRadius: '5px' } }
            alt={ `Imagem de ${name}` }
          />

          <h2
            data-testid="header-player-name"
          >
            { name }
          </h2>

          <span data-testid="header-score">
            {score}

          </span>
        </div>
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
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  total: state.player.score,
  assertions: state.player.assertions,
  gravatar: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
