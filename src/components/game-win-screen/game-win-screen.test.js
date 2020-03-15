import React from "react";
import renderer from "react-test-renderer";
import GameWinScreen from "./game-win-screen.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

it(`Should GameWinScreen render correctly`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <GameWinScreen questionsCount={5} mistakesCount={2} onReplayButtonClick={()=>{}}/>
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
