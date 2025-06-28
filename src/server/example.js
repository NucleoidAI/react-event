import { EventServer } from './index.js';

// 3000 portunda bir event server başlat
const server = new EventServer({ port: 3000 });
console.log('Event server started on ws://localhost:3000'); 