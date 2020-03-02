import React from "react";
import renderer from "react-test-renderer";
import GameWinScreen from "./game-win-screen.jsx";

it(`Should GameWinScreen render correctly`, () => {
  const tree = renderer.create(
      <GameWinScreen questionsCount={5} mistakesCount={2} onReplayButtonClick={()=>{}}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
