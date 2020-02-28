import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import GenreQuestionItem from "../genre-question-item/genre-question-item.jsx";
import {GameTypes} from "../../const.js";

class GenreQuestionScreen extends PureComponent {

  _chooseAnswer(evt, userAnswers, i) {
    const value = evt.target.checked;

    this.setState({
      userAnswers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
    });
  }

  render() {
    const {onAnswer, question, renderPlayer, userAnswers, onChange} = this.props;

    const {
      answers,
      genre,
    } = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer();
          }}
        >
          {answers.map((answer, i)=>(
            <GenreQuestionItem
              key={`${i}-${answer.src}`}
              answer={answer}
              id={i}
              onChange={onChange}
              renderPlayer={renderPlayer}
              userAnswer={userAnswers[i]}
            />
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          genre: PropTypes.string.isRequired,
        })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameTypes.ARTIST, GameTypes.GENRE]).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default GenreQuestionScreen;
