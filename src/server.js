import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';

const app = express();
const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf-8',
);
app.use('/dist', express.static('dist')); // URL이 /dist로 시작하는 경우, dist 폴더 밑에 있는 정적 파일로 연결한다.
app.get('/favicon.ico', (req, res) => res.sendStatus(204)); // favicon.ico 처리하지 않기
app.get('*', (req, res) => {
  const renderString = renderToString(<App initPage='home' />); // renderToString 함수로 App 컴포넌트를 반환한다.
  const result = html.replace(
    "<div id='root'></div>",
    `<div id="root>${renderString}</div>`,
  );
  res.send(result);
});

app.listen(3000); // 포트번호
