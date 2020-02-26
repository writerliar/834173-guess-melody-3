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

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incrementMistakes({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        },
        {
          artist: `incorrect`,
          picture: ``,
        },
        {
          artist: `incorrect-2`,
          picture: ``,
        },
      ],
    }, {
      artist: `correct`,
      picture: ``,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incrementMistakes({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        },
        {
          artist: `incorrect`,
          picture: ``,
        },
        {
          artist: `incorrect-2`,
          picture: ``,
        },
      ],
    }, {
      artist: `incorrect`,
      picture: ``,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistakes({
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: ``,
          genre: `rock`
        },
        {
          src: ``,
          genre: `jazz`
        },
        {
          src: ``,
          genre: `blues`
        },
        {
          src: ``,
          genre: `rock`
        },
      ],
    }, [true, false, false, true])).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistakes({
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: ``,
          genre: `jazz`
        },
        {
          src: ``,
          genre: `jazz`
        },
        {
          src: ``,
          genre: `blues`
        },
        {
          src: ``,
          genre: `jazz`
        },
      ],
    }, [true, true, true, true])).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });
});
