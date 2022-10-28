import { v4 as uuid } from "uuid";

const subscriptions = {};
const eventMap = new Map();

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
  setTimeout(() => {
    if (!subscriptions[type]) return;
    Object.keys(subscriptions[type]).forEach((key) => {
      subscriptions[type][key](payload);
    });
  }, 0);
};

export { subscribe, publish, eventMap };
