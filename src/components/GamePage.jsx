import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './GamePage.css';
import {
  setTimer, setStopTimer, setRestartTimer,
  setScore, setAssertion,
} from '../redux/actions';

class Game extends Component {
  state = {
    questionsDetails: [],
    allQuestions: [],
    green: '',
    red: '',
    showButton: false,
    responseIndex: 0,
    questionIndex: 0,
    timeout: false,
    count: 30,
    level: '',
    showFeedback: false,
  };

  componentDidMount() {
    const { data, history, globalCount, time } = this.props;
    const info = data.results;
    const response = data.response_code;

    const validation = 3;

    if (validation === response) {
      localStorage.clear('token');
      history.push('/');
    }

    if (response === 0) {
      const { questionIndex } = this.state;

      const answersFromApi = info.map((item) => {
        const arrayOptions = [item.correct_answer, ...item.incorrect_answers];
        const randomNumber = 0.5;
        return arrayOptions.sort(() => Math.random() - randomNumber);
        // https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
      });

      const objects = Object(info[questionIndex]);

      this.setState((state) => ({
        questionsDetails: objects,
        allQuestions: [...answersFromApi[0]],
        responseIndex: state.responseIndex + 1,
        questionIndex: state.questionIndex + 1,
      }));
    }

    const interrupt = 1000;
    const timeout = 100;

    setTimeout(() => {
      const id = setInterval(() => {
        globalCount();
        this.setState((state) => ({ count: state.count - 1 }), () => {
          const { count } = this.state;
          if (count === 0) {
            this.setState({ count: 0, timeout: true });
          }
        });
      }, interrupt);
      if (time === 0) {
        clearInterval(id);
      }
    }, timeout);
  }

  handleClick = (question) => {
    const { questionsDetails, count, level } = this.state;
    const correct = questionsDetails.correct_answer;
    const { difficulty } = questionsDetails;
    const { pointer, stop, assertions } = this.props;

    if (difficulty === 'easy') {
      this.setState({ level: 1 });
    } else if (difficulty === 'medium') {
      this.setState({ level: 2 });
    } else if (difficulty === 'hard') {
      this.setState({ level: 3 });
    }

    if (correct === question) {
      const ten = 10;
      this.setState({ green: 'green', red: 'red', showButton: true });
      const score = ten + (count * level);
      pointer(score);
      stop();
      clearInterval();
      pointer(score);
      assertions();
      this.setState({ count: 30 });
    }
    if (question !== correct) {
      stop(count);
      clearInterval();
      this.setState({ red: 'red', green: 'green', showButton: true, count: 31 });
    }
  };

  nextQuestion = () => {
    const { data, restart, globalCount } = this.props;
    const { questionIndex, responseIndex } = this.state;
    const info = data.results;
    const timeout = 300;
    const five = 5;

    if (responseIndex < five) {
      const answers = info.map((item) => {
        const options = [item.correct_answer, ...item.incorrect_answers];
        const randomNumber = 0.5;
        return options.sort(() => Math.random() - randomNumber);
        // https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
      });

      const objects = Object(info[questionIndex]);

      this.setState((state) => ({
        questionsDetails: objects,
        allQuestions: Array(...answers[responseIndex]) || [],
        responseIndex: state.responseIndex + 1,
        questionIndex: state.questionIndex + 1,
        green: '',
        red: '',
        count: 31,
      }));

      setTimeout(() => {
        restart();
        globalCount();
      }, timeout);
    } else {
      this.setState({ showFeedback: true });
    }
  };

  render() {
    const {
      questionsDetails, allQuestions, showFeedback,
      green, red, showButton, timeout,
    } = this.state;

    return (
      <main>
        <h3 data-testid="question-category">{ questionsDetails.category }</h3>
        <h4 data-testid="question-text">{ questionsDetails.question }</h4>
        <div data-testid="answer-options">
          {allQuestions.map((question, index) => {
            if (question === questionsDetails.correct_answer) {
              return (
                <button
                  type="button"
                  key={ index }
                  disabled={ timeout }
                  className={ green }
                  onClick={ () => this.handleClick(question) }
                  data-testid="correct-answer"
                >
                  {question}
                </button>
              );
            }
            return (
              <button
                type="button"
                key={ index }
                className={ red }
                disabled={ timeout }
                onClick={ () => this.handleClick(question) }
                data-testid={ `wrong-answer-${index}` }
              >
                {question}
              </button>
            );
          })}
          {
            showButton && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextQuestion }
              >
                Next
              </button>
            )
          }
        </div>
        {
          showFeedback && <Redirect to="/feedback" />
        }
      </main>
    );
  }
}

Game.propTypes = {
  data: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.shape({
      map: PropTypes.func,
    }).isRequired,
  }).isRequired,
  globalCount: PropTypes.func.isRequired,
  assertions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  pointer: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

Game.defaultProps = {
  history: { push: () => {} },
};

const mapStateToProps = (state) => ({
  data: state.dataApi.info,
  time: state.player.timer,
});

const mapDispatchToProps = (dispatch) => ({
  globalCount: () => dispatch(setTimer()),
  pointer: (state) => dispatch(setScore(state)),
  stop: (state) => dispatch(setStopTimer(state)),
  restart: () => dispatch(setRestartTimer()),
  assertions: () => dispatch(setAssertion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
