import NameSpaces from "../name-space.js";
import {createSelector} from "reselect";

export const getQuestions = (state) => {
  return state[NameSpaces.DATA].questions;
};

const randomFilter = () => {
  return Math.random > 0.5;
};

export const getArtistQuestions = createSelector(
    getQuestions,
    randomFilter,
    (resultOne, resultOTwo) => {
      return resultOne.filter((it) => resultOTwo && it.type === `artist`);
    }
);

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((it) => it.type === `genre`);
    }
);
