import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen.jsx";

configure({
  adapter: new Adapter(),
});

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      src: `path`,
      genre: `rock`,
    },
    {
      src: `path`,
      genre: `blues`,
    },
    {
      src: `path`,
      genre: `jazz`,
    },
    {
      src: `path`,
      genre: `rock`,
    },
  ],
};

it(`When user answers genre question form is not sent`, () => {
  const onAnswer = jest.fn();
  const renderPlayer = jest.fn();
  const genreQuestion = shallow(
      <GenreQuestionScreen
        question={question}
        onAnswer={onAnswer}
        renderPlayer={renderPlayer}
      />
  );

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();

  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);

  expect(renderPlayer).toHaveBeenCalledTimes(4);
  expect(renderPlayer).toHaveBeenLastCalledWith(question.answers[3].src, 3);
});

it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
  const onAnswer = jest.fn((...args) => [...args]);
  const renderPlayer = jest.fn();
  const userAnswers = [false, true, false, false];

  const genreQuestion = shallow(
      <GenreQuestionScreen
        onAnswer={onAnswer}
        question={question}
        renderPlayer={renderPlayer}
      />
  );

  const inputTwo = genreQuestion.find(`input`).at(1);
  inputTwo.simulate(`change`, {target: {checked: true}});

  const form = genreQuestion.find(`form`);
  form.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer).toHaveBeenLastCalledWith(question, userAnswers);

  expect(
      genreQuestion.find(`input`).map((it) => it.prop(`checked`))
  ).toEqual(userAnswers);

  expect(renderPlayer).toHaveBeenCalledTimes(8);
  expect(renderPlayer).toHaveBeenLastCalledWith(question.answers[3].src, 3);
});
