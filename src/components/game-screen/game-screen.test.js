import React from "react";
import renderer from "react-test-renderer";
import {GameScreen} from "./game-screen.jsx";
import {GameTypes, MAX_MISTAKES} from "../../const";

const children = <div className="children-component" />;

describe(`GameScreen component render correctly`, () => {
  it(`with type GameTypes.ARTIST`, () => {
    const tree = renderer.create(
        <GameScreen
          mistakes={MAX_MISTAKES}
          type={GameTypes.ARTIST}
        >
          {children}
        </GameScreen>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with type GameTypes.GENRE`, () => {
    const tree = renderer.create(
        <GameScreen
          mistakes={MAX_MISTAKES}
          type={GameTypes.GENRE}
        >
          {children}
        </GameScreen>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
