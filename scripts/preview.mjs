import { gzipSync } from "node:zlib";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let file = resolve(root, "." + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      return res.end();
    }
    let status = 200;
    try {
      const info = await stat(file);
      if (info.isDirectory()) {
        if (!url.pathname.endsWith("/")) {
          res.writeHead(308, { Location: url.pathname + "/" + url.search });
          return res.end();
        }
        file = resolve(file, "index.html");
      }
      await stat(file);
    } catch {
      status = 404;
      file = resolve(root, "404.html");
    }
    const body = await readFile(file);
    const compress =
      /gzip/.test(req.headers["accept-encoding"] || "") &&
      /\.(html|txt|xml|js|css|json|svg)$/.test(file);
    res.writeHead(status, {
      ...(compress
        ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" }
        : {}),
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY",
      "Cache-Control": "no-cache",
    });
    res.end(compress ? gzipSync(body) : body);
  } catch {
    res.writeHead(500);
    res.end("Unable to serve the exported artifact.");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Static export preview: http://127.0.0.1:${port}`),
);
