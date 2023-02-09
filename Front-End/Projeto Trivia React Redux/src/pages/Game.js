import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAsk from '../services/getAsk';
import Header from '../component/Header';
import { updateScore } from '../redux/actions';
import '../App.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      trivia: [],
      currentQuestion: 0,
      disabledQuestion: false,
      timer: 30,
      correctAnswersIndex: [],
      allAnswers: [],
      score: 0,
      setIntervalId: 0,
      quantifyAnswer: 0,
    };
  }

  async componentDidMount() {
    await this.getTrivia();
  }

  componentWillUnmount() {
    const { setIntervalId } = this.state;
    clearInterval(setIntervalId);
  }

  getTrivia = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (token === null) return history.push('/');
    const API_ASK = await getAsk(token);
    const tokenInvalid = 3;
    if (API_ASK.response_code === tokenInvalid) {
      localStorage.removeItem('token');
      return history.push('/');
    }
    const tokenValid = 0;
    if (API_ASK.response_code === tokenValid) {
      this.setState({ trivia: API_ASK.results });
      this.setTimer();
      this.setAnswers();
    }
  }

  setTimer = () => {
    const { timer } = this.state;
    const oneSecond = 1000;
    let counter = timer;
    const setIntervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
      counter -= 1;
      if (counter === 0) {
        clearInterval(setIntervalId);
        this.setState({
          disabledQuestion: true,
        });
      }
    }, oneSecond);
    this.setState({ setIntervalId });
  }

  setAnswers = () => {
    const { trivia } = this.state;
    const correctAnswersIndex = [];
    trivia.forEach((question) => {
      const max = question.incorrect_answers.length;
      const random = Math.floor(Math.random() * (max - 0 + 1) + 0);
      correctAnswersIndex.push(random);
    });

    const allAnswers = [];
    trivia.forEach((question, index) => {
      const wrongAnswers = [...question.incorrect_answers];
      wrongAnswers.splice(correctAnswersIndex[index], 0, question.correct_answer);
      allAnswers.push(wrongAnswers);
    });
    this.setState({ correctAnswersIndex, allAnswers });
  }

  renderAnswers = () => {
    const {
      correctAnswersIndex,
      allAnswers,
      currentQuestion,
      disabledQuestion,
    } = this.state;
    const correct = correctAnswersIndex[currentQuestion];
    return (
      allAnswers[currentQuestion]
        .map((answer, ind) => (
          <button
            key={ ind }
            type="button"
            data-testid={ this.dataTestAnswer(ind, correct) }
            className={ this.btnAnswerStyle(ind, correct) }
            onClick={ this.answerClick }
            disabled={ disabledQuestion }
          >
            { answer }
          </button>
        ))
    );
  }

  dataTestAnswer = (index, correct) => {
    if (index === correct) {
      return 'correct-answer';
    } if (index > correct) {
      return `wrong-answer-${index - 1}`;
    } return `wrong-answer-${index}`;
  }

  btnAnswerStyle = (index, correct) => {
    const { disabledQuestion } = this.state;
    if (disabledQuestion && index === correct) return 'correct-btn';
    if (disabledQuestion && index !== correct) return 'incorrect-btn';
  }

  answerClick = ({ target }) => {
    const { setIntervalId } = this.state;
    clearInterval(setIntervalId);
    this.setState({
      disabledQuestion: true,
    }, this.calculateScore(target));
  }

  calculateScore = ({ dataset: { testid } }) => {
    if (testid !== 'correct-answer') return;
    const { trivia, currentQuestion, timer, score, quantifyAnswer } = this.state;
    const question = trivia[currentQuestion];
    const difficulty = ['easy', 'medium', 'hard'];
    const difficultyMultiplier = difficulty.indexOf(question.difficulty) + 1;
    const basePoints = 10;
    const newScore = score + basePoints + (timer * difficultyMultiplier);
    const assertions = quantifyAnswer + 1;
    const { dispatch } = this.props;
    this.setState({ score: newScore, quantifyAnswer: assertions }, () => dispatch(
      updateScore(newScore, assertions),
    ));
  }

  nextClick = () => {
    const { currentQuestion } = this.state;
    const { history } = this.props;
    const finalQuestion = 4;
    if (currentQuestion === finalQuestion) return history.push('/feedback');
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      disabledQuestion: false,
      timer: 30,
    }));
    this.setTimer();
  }

  render() {
    const {
      trivia,
      currentQuestion,
      timer,
      correctAnswersIndex,
      disabledQuestion,
    } = this.state;
    return (
      <div>
        <Header />
        <p>{ timer }</p>
        { correctAnswersIndex.length !== 0 && (
          <div>
            <p data-testid="question-text">{ trivia[currentQuestion].question }</p>
            <p data-testid="question-category">
              {trivia[currentQuestion].category}
            </p>
            <div data-testid="answer-options">
              { this.renderAnswers() }
            </div>
          </div>
        ) }
        { disabledQuestion && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextClick }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

export default connect()(Game);

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
