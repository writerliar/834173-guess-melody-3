import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

configure({
  adapter: new Adapter(),
});

const question = {
  type: `artist`,
  song: {
    artist: ``,
    src: ``,
  },
  answers: [
    {
      picture: `artist-1`,
      artist: `one`,
    },
    {
      picture: `artist-2`,
      artist: `two`,
    },
    {
      picture: `artist-3`,
      artist: `tree`,
    },
  ],
};

const mockEvent = {
  preventDefault() {}
};

it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const onAnswer = jest.fn();
  const renderPlayer = jest.fn();
  const userAnswer = {
    artist: `one`,
    picture: `artist-1`,
  };

  const artistQuestion = shallow(
      <ArtistQuestionScreen
        onAnswer={onAnswer}
        question={question}
        renderPlayer={renderPlayer}
      />
  );

  const answerInputs = artistQuestion.find(`input`);
  const answerOne = answerInputs.at(0);

  answerOne.simulate(`change`, mockEvent);

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer).toHaveBeenLastCalledWith(question, userAnswer);
});
