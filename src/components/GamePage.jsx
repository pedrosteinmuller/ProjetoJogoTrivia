import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  state = {
    questionsDetails: [],
    allQuestions: [],
  };

  componentDidMount() {
    const { data, history } = this.props;
    const info = data.results;
    const response = data.response_code;

    const validation = 3;

    if (validation === response) {
      localStorage.clear('token');
      history.push('/');
    }

    if (response === 0) {
      const answersFromApi = info.map((item) => {
        const arrayOptions = [item.correct_answer, ...item.incorrect_answers];
        const randomNumber = 0.5;
        return arrayOptions.sort(() => Math.random() - randomNumber);
      // https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
      });
      const objects = Object(info[0]);
      this.setState({
        questionsDetails: objects,
        allQuestions: [...answersFromApi[0]],
      });
    }
  }

  render() {
    const { questionsDetails, allQuestions } = this.state;

    return (
      <main>
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
      </main>
    );
  }
}

Game.propTypes = {
  data: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.shape({
      map: PropTypes.func,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Game.defaultProps = {
  history: { push: () => {} },
};

const mapStateToProps = (state) => ({
  data: state.dataApi.info,
});

export default connect(mapStateToProps)(Game);