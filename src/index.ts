import koaCors from "@koa/cors";
import Koa from "koa";
import { PassThrough } from "stream";

const app = new Koa();

/**
 * Use a timeout to give time for the response stream buffer to flush
 *
 * We use a long time interval for demoing purposes. In the real world use 0 or better setImmediate instead.
 */
async function flushTaskQueue(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

app.use(koaCors()).use(async (ctx) => {
  const stream = new PassThrough();
  ctx.type = "text/plain";

  // Attach the stream to the body so the response is chunked. Then pipe the stream to the response
  // so the chunks are delivered incrementally.
  ctx.body = stream;
  stream.pipe(ctx.res);

  try {
    for (let i = 1; i <= 10; i++) {
      stream.write(`Hello World ${i}\r\n`);
      await flushTaskQueue();
    }

    stream.push("Server done!\n");
  } finally {
    // Close the stream at the end
    stream.end();
  }
});

app.listen(3000);
