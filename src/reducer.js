import {extend} from "./utils.js";
import {Steps} from "./const.js";

const initialState = {
  mistakes: 0,
  step: Steps.NO_STEPS,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),
  incrementMistakes: () => ({
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
