import React from "react";
import {configure, shallow, mount} from "enzyme";
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
  const onChange = jest.fn();
  const renderPlayer = jest.fn();
  const genreQuestion = mount(
      <GenreQuestionScreen
        question={question}
        onAnswer={onAnswer}
        renderPlayer={renderPlayer}
        userAnswers={[false, true, true, false]}
        onChange={onChange}
      />
  );

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();

  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);

  expect(renderPlayer).toHaveBeenCalledTimes(question.answers.length);
  expect(renderPlayer).toHaveBeenCalledWith(question.answers[0].src, 0);
  expect(renderPlayer).toHaveBeenCalledWith(question.answers[1].src, 1);
  expect(renderPlayer).toHaveBeenCalledWith(question.answers[2].src, 2);
  expect(renderPlayer).toHaveBeenCalledWith(question.answers[3].src, 3);
});

it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
  const onAnswer = jest.fn((...args) => [...args]);
  const onChange = jest.fn((...args) => [...args]);
  const renderPlayer = jest.fn();
  const userAnswers = [false, true, false, false];

  const genreQuestion = mount(
      <GenreQuestionScreen
        onAnswer={onAnswer}
        question={question}
        renderPlayer={renderPlayer}
        userAnswers={userAnswers}
        onChange={onChange}
      />
  );

  const inputTwo = genreQuestion.find(`input`).at(1);
  inputTwo.simulate(`change`, {target: {checked: true}});

  const form = genreQuestion.find(`form`);

  expect(renderPlayer).toHaveBeenCalledTimes(4);
  expect(renderPlayer).toHaveBeenLastCalledWith(question.answers[3].src, 3);

  form.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer).toHaveBeenLastCalledWith(question, userAnswers);
  expect(onAnswer).toHaveBeenLastCalledWith(void 0);

  expect(
      genreQuestion.find(`input`).map((it) => it.prop(`checked`))
  ).toEqual(userAnswers);
});
