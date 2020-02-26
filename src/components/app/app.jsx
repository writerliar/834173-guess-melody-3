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
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     step: NO_STEPS,
  //   };
  // }

  _setAnswer() {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  }

  _renderGameScreen() {
    // const {errorsCount, questions} = this.props;
    // const {step} = this.state;
    const {
      errorsCount,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
    } = this.props;
    const question = questions[step];

    if (step === Steps.NO_STEPS || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={onWelcomeButtonClick}
          // }}
          // onWelcomeButtonClick={() => {
          //   this.setState({
          //     step: 0,
          //   });
          // }}
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
                // onAnswer={() => this._setAnswer()}
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
                question={question}
                // onAnswer={() => this._setAnswer()}
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
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer() {
    dispatch(ActionCreator.incrementMistakes());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
