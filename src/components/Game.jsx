import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Game extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const responseApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await responseApi.json();
    const numberFail = 3;
    if (data.response_code === numberFail) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    if (data.response_code === 0) {
      this.setState({
        questions: data.results[0],
      });
    }
  }

  render() {
    const { questions } = this.state;
    // console.log(questions);
    const incorrectOptions = questions.incorrect_answers;
    const correctOption = questions.correct_answer;
    const options = [correctOption, incorrectOptions];
    const sortOptions = options.sort();
    return (
      <div>
        <h3 data-testid="question-category">{ questions.category }</h3>
        <h4 data-testid="question-text">{ questions.question }</h4>
        <div data-testid="answer-options">
          { sortOptions.map((element, index) => {
            if (element === correctOption) {
              return (
                <button
                  type="button"
                  key={ index }
                  data-testid="correct-answer"
                >
                  { element }
                </button>
              );
            }
            return (
              <button
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
              >
                { element }
              </button>
            );
          }) }
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
