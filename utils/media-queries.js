import breakpoints from "./breakpoints.json";

// Sizes ordered by breakpoint value
export const sizes = Object.keys(breakpoints).sort(
  (a, b) => breakpoints[a] - breakpoints[b]
);

const mediaQueryLists = sizes.map((size, index) => {
  let query;
  if (index === sizes.length - 1) {
    query = `screen and (min-width: ${breakpoints[size] / 16}rem)`;
  } else {
    const min = breakpoints[size];
    const max = breakpoints[sizes[index + 1]] - 1;
    query = `screen and (min-width: ${min / 16}rem) and (max-width: ${max /
      16}rem)`;
  }

  return {
    size,
    mediaQueryList: window.matchMedia(query)
  };
});

// Here we subscribe to all needed mediaQueries listeners, and return an unsubscribe function
// Callback will be call each time a size is selected
export function addListener(onSizeSelection) {
  const listeners = [];

  // We define a mediaQuery for each available size
  mediaQueryLists.forEach(({ size, mediaQueryList }) => {
    // We call callback only if the size is now the right one
    function onMediaQueryListChange(evt) {
      if (evt.matches) {
        onSizeSelection(size);
      }
    }

    mediaQueryList.addListener(onMediaQueryListChange);

    // We remember listener to be able to remove them
    listeners.push({ listener: onMediaQueryListChange, mediaQueryList });

    // We define the initial state because mediaQuery listeners will not be called until one value changes
    if (mediaQueryList.matches) {
      onSizeSelection(size);
    }
  });

  // We return a function to remove all listeners
  return function unsubscribe() {
    listeners.forEach(({ listener, mediaQueryList }) => {
      mediaQueryList.removeListener(listener);
    });
  };
}
