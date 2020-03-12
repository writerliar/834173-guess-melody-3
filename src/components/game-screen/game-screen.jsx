import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {GameTypes, TIMER_SVG_STYLES} from "../../const.js";
import Mistakes from "../mistakes/mistakes.jsx";
import {getMistakes} from "../../reducer/game/selectors.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import {ActionCreator} from "../../reducer/game/game.js";

const GameScreen = (props) => {
  const {type, children, mistakes, goToWelcome} = props;

  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <Link to={AppRoute.ROOT} className="game__back" onClick={goToWelcome}>
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={TIMER_SVG_STYLES}/>
        </svg>

        <Mistakes
          count={mistakes}
        />
      </header>

      {children}
    </section>
  );
};

GameScreen.propTypes = {
  type: PropTypes.oneOf([GameTypes.ARTIST, GameTypes.GENRE]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  mistakes: PropTypes.number.isRequired,
  goToWelcome: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  goToWelcome() {
    dispatch(ActionCreator.goToWelcome());
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
