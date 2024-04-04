import { v4 as uuid } from "uuid";

const subscriptions = {};
const map = new Map();

const subscribe = (type, callback) => {
  const id = uuid();

  if (!subscriptions[type]) {
    subscriptions[type] = {};
  }

  subscriptions[type][id] = callback;

  let last = map.get(type);

  if (last) {
    callback(last);
  }

  return {
    unsubscribe: () => {
      delete subscriptions[type][id];

      if (Object.keys(subscriptions[type]).length === 0) {
        delete subscriptions[type];
      }
    },
  };
};

const publish = (type, payload) => {
  console.log("react-event", type, payload);
  map.set(type, payload);
  if (!subscriptions[type]) return;

  Object.keys(subscriptions[type]).forEach((key) => {
    setTimeout(() => {
      subscriptions[type][key](payload);
    }, 0);
  });
};

export { subscribe, publish, map };
