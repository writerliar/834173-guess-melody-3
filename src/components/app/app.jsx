import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.js";
import {GameTypes, Steps} from "../../const.js";

const GenreQuestionScreenWrapper = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapper = withAudioPlayer(ArtistQuestionScreen);

class App extends PureComponent {

  _renderGameScreen() {
    const {
      maxMistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
    } = this.props;
    const question = questions[step];

    if (step === Steps.NO_STEPS || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameTypes.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <ArtistQuestionScreenWrapper
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameTypes.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <GenreQuestionScreenWrapper
                question={question}ы
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreenWrapper
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreenWrapper
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistakes(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
