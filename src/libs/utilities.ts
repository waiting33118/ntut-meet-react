export const uuid = () => {
  return Math.random().toString(36).slice(2);
};

export const toJSON = (msgFormat: IMsgFormat) => {
  return JSON.stringify({
    event: msgFormat.event,
    payload: msgFormat.payload
  });
};
