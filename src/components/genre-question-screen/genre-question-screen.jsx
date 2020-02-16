import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameTypes, TIMER_SVG_STYLES} from "../../const.js";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userAnswers: [false, false, false, false],
    };
  }

  _chooseAnswer(evt, userAnswers, i) {
    const value = evt.target.checked;

    this.setState({
      userAnswers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
    });
  }

  render() {
    const {onAnswer, question} = this.props;
    const {userAnswers} = this.state;

    const {
      answers,
      genre,
    } = question;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370" style={{TIMER_SVG_STYLES}}/>
          </svg>

          <div className="game__mistakes">
            <div className="wrong" />
            <div className="wrong" />
            <div className="wrong" />
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={(evt) => {
              evt.preventDefault();
              onAnswer(question, userAnswers);
            }}
          >
            {answers.map((answer, i)=>(
              <div key={`${i}-${answer.src}`} className="track">
                <button className="track__button track__button--play" type="button" />
                <div className="track__status">
                  <audio src={answer.src} />
                </div>
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`}
                    id={`answer-${i}`}
                    checked={userAnswers[i]}
                    onChange={(evt) => this._chooseAnswer(evt, userAnswers, i)}
                  />
                  <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
                </div>
              </div>
            ))}

            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
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

export default GenreQuestionScreen;
