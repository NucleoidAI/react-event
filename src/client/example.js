import { publish, subscribe } from './index.js';

const WS_URL = 'ws://localhost:3000';

subscribe(WS_URL, 'MY_EVENT', (data) => {
  console.log('MY_EVENT received:', data);
});

setTimeout(() => {
  publish(WS_URL, 'MY_EVENT', { message: 'Hello from client!' });
}, 2000); 