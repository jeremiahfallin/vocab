import { useReducer } from "react";

function copyObject() {
  // Returns a deep copy of the given object(s), with properties of later
  // objects overriding those of earlier objects.
  var result = {};
  var a, key;

  for (a = 0; a < arguments.length; a++) {
    for (key in arguments[a]) {
      if (arguments[a].hasOwnProperty(key)) {
        if (arguments[a][key] && typeof arguments[a][key] === "object") {
          if (Array.isArray(arguments[a][key])) {
            result[key] = copyArray(arguments[a][key]);
          } else {
            result[key] = copyObject(arguments[a][key]);
          }
        } else {
          result[key] = arguments[a][key];
        }
      }
    }
  }
  return result;
}

function copyArray(array) {
  // Returns a deep copy of the given data array.
  var result = [];
  var i;
  for (i = 0; i < array.length; i++) {
    if (array[i] && typeof array[i] === "object") {
      if (Array.isArray(array[i])) {
        result[i] = copyArray(array[i]);
      } else {
        result[i] = copyObject(array[i]);
      }
    } else {
      result[i] = array[i];
    }
  }
  return result;
}

const saveState = (localStorageKey, state) => {
  // Saves the given state in localStorage, assuming it is available.
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

const loadState = (localStorageKey) => {
  // Returns the state stored in localStorage, if there is one.
  var state;
  try {
    state = JSON.parse(localStorage.getItem(localStorageKey));
  } catch (e) {
    return null;
  }

  return state;
};

const useStoreWords = ({ storageKey }) => {
  const defaultState = {
    localStorageKey: storageKey,
    definitions: [],
    loading: false,
  };
  let initialState = defaultState;
  if (loadState(storageKey) !== null) {
    initialState = loadState(storageKey);
  }

  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "START": {
        return { ...state };
      }
      case "ADD_WORD": {
        const newState = {
          ...state,
          definitions: [...state.definitions, action.def],
          loading: false,
        };
        saveState(state.localStorageKey, newState);
        return newState;
      }

      case "LOADING": {
        return { ...state, loading: true };
      }

      case "RESET": {
        const newState = {
          ...defaultState,
        };
        saveState(state.localStorageKey, newState);
        return newState;
      }

      default: {
        throw new Error("Unrecognized state");
      }
    }
  }, initialState);

  return [state, dispatch];
};

export default useStoreWords;
