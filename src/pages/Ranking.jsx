import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { clearScore } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const { name, score, gravatar } = this.props;

    const hash = md5(gravatar).toString();
    const currentRanking = {
      name,
      score,
      image: `https://www.gravatar.com/avatar/${hash}`,
    };
    const previousRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    localStorage.setItem('ranking', JSON.stringify([...previousRanking, currentRanking]));
    // na aqui em cima, estou criando a chave ranking e setando nele um array de objetos;
    // pegando os ranking's anteriores e somando com os atuais.
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  }

  returnToLogin = () => {
    const { history: { push }, score, defaultScoreValue } = this.props;
    defaultScoreValue(score);
    return push('/');
  };

  render() {
    const { ranking } = this.state;
    const scoreSorted = ranking.sort((a, b) => b.score - a.score);
    return (
      <main>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.returnToLogin }
        >
          Return to login
        </button>
        <div>
          {
            scoreSorted.map((player, index) => (
              <div key={ index }>
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
                <img src={ player.image } alt={ player.name } />
              </div>
            ))
          }
        </div>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  gravatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  defaultScoreValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  total: state.player.score,
  assertions: state.player.assertions,
  gravatar: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  defaultScoreValue: (state) => dispatch(clearScore(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
