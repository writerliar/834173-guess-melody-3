import NameSpase from "../name-space.js";

export const getAuthorizationStatus = (state) => {
  return state[NameSpase.USER].authorizationStatus;
};
