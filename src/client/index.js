let WebSocketImpl;
if (typeof window !== "undefined" && window.WebSocket) {
  WebSocketImpl = window.WebSocket;
} else {
  WebSocketImpl = (await import('ws')).default;
}

import React from 'react';

const subscriptions = {};
const messages = new Map();
let socket = null;
let sendQueue = [];
let isConnecting = false;

function connect(url) {
  if (!socket) {
    socket = new WebSocketImpl(url);
    isConnecting = true;
    socket.onopen = () => {
      isConnecting = false;
      // Kuyruktaki mesajları gönder
      while (sendQueue.length > 0) {
        socket.send(sendQueue.shift());
      }
    };
    socket.onmessage = (msg) => {
      try {
        const { event, data } = JSON.parse(msg.data);
        messages.set(event, data);
        Object.keys(subscriptions[event] || {}).forEach((key) => {
          const registry = subscriptions[event][key];
          setTimeout(() => {
            registry.callback(data, registry);
          }, 0);
        });
      } catch {}
    };
    socket.onclose = () => {
      socket = null;
      isConnecting = false;
    };
  }
  return socket;
}

const subscribe = (...args) => {
  if (args.length < 3) {
    throw new Error('subscribe requires at least 3 arguments: url, event, callback');
  }
  const callback = args.pop();
  const event = args.pop();
  const url = args[0];
  if (!subscriptions[event]) subscriptions[event] = {};
  const id = Math.random().toString(36).slice(2);
  const registry = {
    id,
    event,
    callback,
    unsubscribe: () => {
      delete subscriptions[event][id];
      if (Object.keys(subscriptions[event]).length === 0) delete subscriptions[event];
    },
  };
  subscriptions[event][id] = registry;
  // Son event'i varsa hemen callback'e ilet
  let last = messages.get(event);
  if (last) callback(last, registry);
  return registry;
};

const publish = (...args) => {
  if (args.length < 3) throw new Error('publish requires at least 3 arguments: url, event, payload');
  const payload = args.pop();
  const event = args.pop();
  const url = args[0];
  const ws = connect(url);
  const msg = JSON.stringify({ event, data: payload });
  if (ws.readyState === 1) {
    ws.send(msg);
  } else {
    sendQueue.push(msg);
  }
};

function last(event, init) {
  if (messages.has(event)) return messages.get(event);
  return init;
}

const useEvent = (...args) => {
  const init = args.pop();
  const event = args.pop();
  const url = args[0];
  const [payload, setPayload] = React.useState(last(event, init));
  React.useEffect(() => {
    const registry = subscribe(url, event, (data) => setPayload(data));
    return () => registry.unsubscribe();
  }, [url, event]);
  return [payload, (data) => publish(url, event, data)];
};

export { subscribe, publish, useEvent }; 