import { v4 as uuid } from "uuid";

const subscriptions = {};
const messages = new Map();

const subscribe = (type, callback) => {
  const id = uuid();
  console.debug("react-event", "subscribe", type, id);

  if (!subscriptions[type]) {
    subscriptions[type] = {};
  }

  subscriptions[type][id] = callback;

  let last = messages.get(type);

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
  console.log("react-event", "publish", type, payload);
  messages.set(type, payload);

  Object.keys(subscriptions[type] || {}).forEach((key) => {
    setTimeout(() => {
      subscriptions[type][key](payload);
    }, 0);
  });
};

function last(type, init) {
  if (messages.has(type)) {
    return messages.get(type);
  } else {
    return init;
  }
}

export { subscribe, publish, messages, last };
