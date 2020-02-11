import React from "react";
import renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

const question = {
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
};

it(`Should ArtistQuestionScreen render correctly`, () => {
  const tree = renderer.create((
    <ArtistQuestionScreen
      question={question}
      onAnswer={() => {}}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
