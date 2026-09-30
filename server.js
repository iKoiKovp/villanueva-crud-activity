const http = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');

const port = Number(process.env.PORT) || 3000;

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (request.method !== 'GET' || !['/', '/index.html'].includes(url.pathname)) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  try {
    const page = await readFile(path.join(__dirname, 'public', 'index.html'));
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(page);
  } catch {
    response.writeHead(500);
    response.end('Unable to load the app.');
  }
});

server.listen(port, () => {
  console.log(`CRUD demo running at http://localhost:${port}`);
});