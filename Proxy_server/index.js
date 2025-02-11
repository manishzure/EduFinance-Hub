const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(
  "/huggingface",
  createProxyMiddleware({
    target: "https://huggingface.co/spaces/Akshayram1/Stock",
    changeOrigin: true,
    pathRewrite: { "^/huggingface": "" },
  })
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
