import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game.js";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.jsx";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.jsx";
import {GameTypes, Steps} from "../../const.js";
import GameWinScreen from "../game-win-screen/game-win-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import {getStep, getMistakes, getMaxMistakes} from "../../reducer/game/selectors.js";
import {getQuestions} from "../../reducer/data/selectors.js";
import {AuthorizationStatus} from "../../const";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import AuthorizationScreen from "../authorization-screen/authorization-screen.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import {PrivateRoute} from "../private-route/private-route.jsx";

const GenreQuestionScreenWrapper = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapper = withActivePlayer(ArtistQuestionScreen);

class App extends PureComponent {

  _renderGameScreen() {
    const {
      authorizationStatus,
      maxMistakes,
      mistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
    } = this.props;
    const question = questions[step];

    if (step === Steps.NO_STEPS) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return history.push(AppRoute.LOSE);
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return history.push(AppRoute.RESULT);
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      }
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
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions, mistakes, resetGame, login, authorizationStatus} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <AuthorizationScreen
              onSubmit={login}
              onReplayButtonClick={resetGame}
            />
          </Route>
          <Route exact path={AppRoute.LOSE}>
            <GameOverScreen
              onReplayButtonClick={resetGame}
            />
          </Route>
          <PrivateRoute
            authorizationStatus={authorizationStatus}
            exact
            path={AppRoute.RESULT}
            render={() => {
              return (
                <GameWinScreen
                  questionsCount={questions.length}
                  mistakesCount={mistakes}
                  onReplayButtonClick={resetGame}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }

}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  maxMistakes: getMaxMistakes(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistakes(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
