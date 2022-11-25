import { v4 as uuid } from "uuid";

const subscriptions = {};
const map = new Map();

const subscribe = (type, callback) => {
  const id = uuid();
  if (!subscriptions[type]) subscriptions[type] = {};
  subscriptions[type][id] = callback;

  return {
    unsubscribe: () => {
      delete subscriptions[type][id];
      if (Object.keys(subscriptions[type]).length === 0)
        delete subscriptions[type];
    },
  };
};

const publish = (type, payload) => {
  return new Promise((resolve) => {
    if (!subscriptions[type]) return;
    Object.keys(subscriptions[type]).forEach((key) => {
      subscriptions[type][key](payload);
      resolve();
    });
  });
};

export { subscribe, publish, map };
