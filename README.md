# About
Demo of how to stream chunked data from a Koa based web service.

The trick is to attach a ReadableStream to the `ctx.body` and then pipe the stream to `ctx.res`. You can then write push data to the stream continuously. If you yield occasionally, this will let the buffered contents of the stream to be flushed to the client.

The best way to see this in action is to launch the server with `npm start` and then connect to http:\\localhost:3000 from Firefox. You will see the streamed response from the server output line by line in the browser. For other browsers (Chrome, Safari), load the client.html page and look at the output in the console.
