enum SERVER_URL {
  DEV = 'ws://localhost:3030',
  PROD = 'wss://aiotlab-drone-cloud.ga:3030'
}

const WS_URL =
  process.env.NODE_ENV === 'production' ? SERVER_URL.PROD : SERVER_URL.DEV;

const connect = () => {
  return new WebSocket(WS_URL);
};

const detectDisconnect = () => {
  ws.addEventListener('close', reconnect, { once: true });
};

const reconnect = () => {
  console.log('Detect disconnection,try reconnect in 3 second...');
  setTimeout(() => {
    ws = connect();
    ws.addEventListener('open', () => console.log('Reconnect successfully!'), {
      once: true
    });
    detectDisconnect();
  }, 3000);
};

export let ws = connect();
detectDisconnect();
