import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameTypes} from "../../const.js";

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
    const {onAnswer, question, renderPlayer} = this.props;
    const {userAnswers} = this.state;

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
            onAnswer(question, userAnswers);
          }}
        >
          {answers.map((answer, i)=>(
            <div key={`${i}-${answer.src}`} className="track">
              {renderPlayer(answer.src, i)}
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
  renderPlayer: PropTypes.func.isRequired,
};

export default GenreQuestionScreen;
