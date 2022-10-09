import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Game extends Component {
  state = {
    questionsDetails: [],
    allQuestions: [],
  };

  async componentDidMount() {
    const { history } = this.props;

    const urlRequest = 'https://opentdb.com/api_token.php?command=request';
    const requestToken = await fetch(urlRequest);
    const jsonToken = await requestToken.json();

    const token = localStorage.getItem('token');
    // const invalidToken = 3;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(url);
    const data = await request.json();
    if (data.response_code === 0) {
      const answersFromApi = data.results.map((item) => {
        const arrayOptions = [item.correct_answer, ...item.incorrect_answers];
        const randomNumber = 0.5;
        return arrayOptions.sort(() => Math.random() - randomNumber);
        // https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
      });
      this.setState({
        questionsDetails: data.results[0],
        allQuestions: [...answersFromApi[0]],
      });
    } if (jsonToken.response_code !== 0) {
      localStorage.clear();
      history.push('/');
    }
  }

  render() {
    const { questionsDetails, allQuestions } = this.state;
    return (
      <div>
        <h3 data-testid="question-category">{ questionsDetails.category }</h3>
        <h4 data-testid="question-text">{ questionsDetails.question }</h4>
        <div data-testid="answer-options">
          {allQuestions.map((question, index) => {
            if (question === questionsDetails.correct_answer) {
              return (
                <button type="button" key={ index } data-testid="correct-answer">
                  {question}
                </button>
              );
            }
            return (
              <button
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
              >
                {question}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
Game.defaultProps = {
  history: { push: () => {} },
};
export default Game;
