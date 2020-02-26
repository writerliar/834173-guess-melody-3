import {reducer, ActionType, ActionCreator} from "./reducer";
import {Steps} from "./const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    step: Steps.NO_STEPS,
    mistakes: 0,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    step: Steps.NO_STEPS,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  })).toEqual({
    step: 0,
    mistakes: 0,
  });

  expect(reducer({
    step: Steps.NO_STEPS,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0,
  })).toEqual({
    step: Steps.NO_STEPS,
    mistakes: 0,
  });
});

it(`Reducer should increment number of mistakes by a given value`, () => {
  expect(reducer({
    step: Steps.NO_STEPS,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1,
  })).toEqual({
    step: Steps.NO_STEPS,
    mistakes: 1,
  });

  expect(reducer({
    step: Steps.NO_STEPS,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 0,
  })).toEqual({
    step: Steps.NO_STEPS,
    mistakes: 0,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });
});
