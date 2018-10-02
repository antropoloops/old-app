import { v4 as uuid } from "node-uuid";
import { db } from "../firebase";

const initialState = [];

const createActionName = name => `app/audiosets/${name}`;

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_AUDIOSET:
      return [...state, { ...action.payload, id: uuid() }];
    default:
      return state;
  }
}

// selectors
export const selectAllAudiosets = state => state.notifications;

// actions
export const LOADING_AUDIOSET = createActionName("LOADING_AUDIOSET");
export const ADD_AUDIOSET = createActionName("ADD_AUDIOSET");

// action creators
export const loadAllAudiosets = () => dispatch => {
  db
    .collection("audiosets")
    .get()
    .then(collection => {
      collection.forEach(set => {
        dispatch(addAudioset(set.data()));
      });
    });
};

export const loadAudioset = id => dispatch => {
  dispatch({ type: LOADING_AUDIOSET, payload: { id } });
  db
    .collection("audiosets")
    .doc(id)
    .get()
    .then(result => {
      console.log("joder", result.data());
    });
};

export const addAudioset = payload => ({ payload, type: ADD_AUDIOSET });
