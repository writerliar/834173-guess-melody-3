import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameTypes} from "../../const";

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        userAnswers: new Array(props.question.answers.length).fill(false),
      };

      this.handleAnswer = this.handleAnswer.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleAnswer() {
      const {onAnswer, question} = this.props;
      const {userAnswers} = this.state;

      onAnswer(question, userAnswers);
    }

    handleChange(i, value) {
      const {userAnswers} = this.state;

      const answers = userAnswers.slice(0);
      answers[i] = value;

      this.setState({
        userAnswers: answers,
      });
    }

    render() {
      const {userAnswers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers={userAnswers}
          onAnswer={this.handleAnswer}
          onChange={this.handleChange}
        />
      );
    }
  }

  WithUserAnswer.propTypes = {
    onAnswer: PropTypes.func.isRequired,
    question: PropTypes.shape({
      answers: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired,
          })).isRequired,
      genre: PropTypes.string.isRequired,
      type: PropTypes.oneOf([GameTypes.ARTIST, GameTypes.GENRE]).isRequired,
    }).isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
