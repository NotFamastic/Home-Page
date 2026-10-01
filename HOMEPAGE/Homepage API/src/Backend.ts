export {};

import express from "express";
const app = express();

app.post("/save", (request, response) => {
  const data = request.body;
  let Html;

  response.json({
    Html:Html,
    status:""
  });
});
