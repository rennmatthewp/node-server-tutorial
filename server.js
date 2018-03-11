const http = require('http');
const url = require('url');
const server = http.createServer();

server.listen(3000, () => {
  console.log('http server listening at port 3000.');
});

let messages = [
  { id: 1, user: 'britanny storoz', message: 'hi there!' },
  { id: 2, user: 'bob loblaw', message: 'check out my law blog' },
  { id: 3, user: 'loren iposm', message: 'dolors set amet' }
];

const getAllMessages = response => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(messages));
  response.end();
};

const addMessage = (newMessage, response) => {
  messages.push(newMessage);
  response.writeHead(201, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(newMessage));
  response.end();
};

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  } else if (request.method === 'POST') {
    let newMessage = { id: new Date() };

    request.on('data', data => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});
