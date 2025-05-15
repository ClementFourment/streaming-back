
const isLocal = false;

const hostsBack = ['https://d4d8-2a04-cec2-b-9e25-7439-f02c-ed0c-a7ae.ngrok-free.app', 'http://localhost:3000'];
const hostsFront = ['https://92db-2a04-cec2-b-9e25-7439-f02c-ed0c-a7ae.ngrok-free.app', 'http://localhost:2000'];

const hosts = {hostsBack: hostsBack[+isLocal], hostsFront: hostsFront[+isLocal]};

export default hosts;