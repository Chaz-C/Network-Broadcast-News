// jshint esversion: 6
const net = require('net');

  let users = [];

let server = net.createServer((socket) => {


  users.push(socket);

  socket.write(`CONNECTED TO: 0.0.0.0:6969\n`);

  let socketAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  process.stdout.write(`CONNECTED: ${socketAddress}\n`);

  // process.stdin.on('data', (cmd) => {
  //   for ( let j = 0, len = users.length; j < len; j ++ ) {
  //     console.log('j=', j);
  //     console.log('len=', len);
  //     users[j].write(`[ADMIN] : ${cmd}`);
  //   }
  //   // socket.write(`[ADMIN] : ${cmd}`);
  //   // console.log(users.length);
  // });

  process.stdin.pipe(socket);

  socket.on('data', (chunk) => {
    process.stdout.write(`SERVER BCAST FROM ${socketAddress} : ${chunk}`);
    for ( let i = 0; i < users.length; i ++ ) {
      users[i].write(`${socketAddress}: ${chunk}`);
    }
  });

  socket.on('end', () => {
    // console.log(socket);
    users.splice(users.indexOf(socket), 1);
    console.log(users.length);
    process.stdout.write(`CLOSED: ${socketAddress}\n`);
  });


});



server.listen(6969, '0.0.0.0', () => {
  console.log(`Server listening on: ${server.address().address}:${server.address().port}`);
});