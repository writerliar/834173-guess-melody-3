import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Steps, MAX_MISTAKES} from "../../const.js";

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `blues`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `jazz`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      },
    ],
  },
  {
    type: `artist`,
    song: {
      artist: `Ramones`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [
      {
        picture: `https://api.adorable.io/avatars/128/1`,
        artist: `Ramones`,
      },
      {
        picture: `https://api.adorable.io/avatars/128/2`,
        artist: `Nirvana`,
      },
      {
        picture: `https://api.adorable.io/avatars/128/3`,
        artist: `Cranberries`,
      },
    ],
  }
];

describe(`Render App`, () => {
  it(`Render WelcomeScreen`, () => {
    const tree = renderer
      .create(<App
        errorsCount={MAX_MISTAKES}
        questions={questions}
        onUserAnswer={() => {}}
        onWelcomeButtonClick={() => {}}
        step={Steps.NO_STEPS}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreQuestionScreen`, () => {
    const tree = renderer
      .create(<App
        errorsCount={MAX_MISTAKES}
        questions={questions}
        onUserAnswer={() => {}}
        onWelcomeButtonClick={() => {}}
        step={Steps.GENRE}
      />, {
        createNodeMock: () => {
          return {};
        }
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render ArtistQuestionScreen`, () => {
    const tree = renderer
      .create(<App
        errorsCount={MAX_MISTAKES}
        questions={questions}
        onUserAnswer={() => {}}
        onWelcomeButtonClick={() => {}}
        step={Steps.ARTIST}
      />, {
        createNodeMock: () => {
          return {};
        }
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
