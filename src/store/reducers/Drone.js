import * as actions from "../actions";

const initialState = {
  loading: false,
  latitude: null,
  longitude: null,
  error: null,
  data: {}
};

const startLoading = state => {
  return {
    ...state,
    error: null,
    loading: Object.entries(state.data).length === 0
  };
};

const droneDataRecevied = (state, action) => {
  const { data } = action;
  if (!data || data.length === 0) return state;

  const x = data.map(param => new Date(param.timestamp));
  const y = data.map(param => param.metric);

  return {
    ...state,
    error: null,
    loading: false,
    latitude: data[data.length - 1].latitude,
    longitude: data[data.length - 1].longitude,
    data: {x, y}
  };
};

const droneDataError = (state, action) => ({
  ...state,
  error: action.code,
  loading: false,
  latitude: null,
  longitude: null,
  data: {}
});

const handlers = {
  [actions.FETCH_DRONE_DATA]: startLoading,
  [actions.DRONE_DATA_RECEIVED]: droneDataRecevied,
  [actions.DRONE_API_ERROR]: droneDataError
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
