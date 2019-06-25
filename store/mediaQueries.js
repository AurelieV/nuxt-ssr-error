/* eslint-disable no-shadow */
import breakpoints from "~/utils/breakpoints.json";

const MODULE_NAME = "mediaQueries";
const ON_SIZE_SELECTION_MUTATION = "onSizeSelection";
const GET_CURRENT_SIZE = "getCurrent";
const IS_EQUAL = "isEqual";
const IS_SMALLER_THAN = "isSmallerThan";
const IS_EQUAL_OR_SMALLER_THAN = "isEqualOrSmallerThan";
const IS_GREATER_THAN = "isGreaterThan";
const IS_EQUAL_OR_GREATER_THAN = "isEqualOrGreaterThan";

export const MEDIA_QUERIES_ON_SIZE_SELECTION_MUTATION = `${MODULE_NAME}/${ON_SIZE_SELECTION_MUTATION}`;
export const MEDIA_QUERIES_GET_CURRENT_SIZE = `${MODULE_NAME}/${GET_CURRENT_SIZE}`;
export const MEDIA_QUERIES_IS_EQUAL = `${MODULE_NAME}/${IS_EQUAL}`;
export const MEDIA_QUERIES_IS_SMALLER_THAN = `${MODULE_NAME}/${IS_SMALLER_THAN}`;
export const MEDIA_QUERIES_IS_EQUAL_OR_SMALLER_THAN = `${MODULE_NAME}/${IS_EQUAL_OR_SMALLER_THAN}`;
export const MEDIA_QUERIES_IS_GREATER_THAN = `${MODULE_NAME}/${IS_GREATER_THAN}`;
export const MEDIA_QUERIES_IS_EQUAL_OR_GREATER_THAN = `${MODULE_NAME}/${IS_EQUAL_OR_GREATER_THAN}`;

// Sizes ordered by breakpoint value
const sizes = Object.keys(breakpoints).sort(
  (a, b) => breakpoints[a] - breakpoints[b]
);

// By default (ssr) we want to render for the smallest size
export const state = () =>
  sizes.map((size, index) => ({ size, selected: index === 0 }));

export const getters = {
  [GET_CURRENT_SIZE](state) {
    const currentSizeState = state.find(sizeState => sizeState.selected);

    return currentSizeState ? currentSizeState.size : null;
  },
  [IS_EQUAL]: state => size => {
    const sizeState = state.find(sizeState => sizeState.size === size);

    return sizeState && sizeState.selected;
  },
  [IS_SMALLER_THAN]: state => size => {
    const sizeStateIndex = state.findIndex(
      sizeState => sizeState.size === size
    );
    if (sizeStateIndex === -1) return false;

    return (
      state.findIndex(
        (sizeState, index) => index < sizeStateIndex && sizeState.selected
      ) !== -1
    );
  },
  [IS_EQUAL_OR_SMALLER_THAN]: state => size => {
    const sizeStateIndex = state.findIndex(
      sizeState => sizeState.size === size
    );
    if (sizeStateIndex === -1) return false;

    return (
      state.findIndex(
        (sizeState, index) => index <= sizeStateIndex && sizeState.selected
      ) !== -1
    );
  },
  [IS_GREATER_THAN]: state => size => {
    const sizeStateIndex = state.findIndex(
      sizeState => sizeState.size === size
    );
    if (sizeStateIndex === -1) return true;

    return (
      state.findIndex(
        (sizeState, index) => index > sizeStateIndex && sizeState.selected
      ) !== -1
    );
  },
  [IS_EQUAL_OR_GREATER_THAN]: state => size => {
    const sizeStateIndex = state.findIndex(
      sizeState => sizeState.size === size
    );
    if (sizeStateIndex === -1) return true;

    return (
      state.findIndex(
        (sizeState, index) => index >= sizeStateIndex && sizeState.selected
      ) !== -1
    );
  }
};

export const mutations = {
  [ON_SIZE_SELECTION_MUTATION](state, size) {
    state.forEach(sizeState => {
      sizeState.selected = sizeState.size === size;
    });
  }
};
