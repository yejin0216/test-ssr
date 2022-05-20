import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';
import * as url from 'url';
import { ServerStyleSheet } from 'styled-components';

const app = express();

const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf-8',
);

app.use('/dist', express.static('dist')); // URL이 /dist로 시작하는 경우, dist 폴더 밑에 있는 정적 파일로 연결한다.
app.get('/favicon.ico', (req, res) => res.sendStatus(204)); // favicon.ico 처리하지 않기

app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const initPage = parseUrl.pathname ? parseUrl.pathname.substring(1) : 'home';
  const sheet = new ServerStyleSheet(); // 스타일을 추출할 객체
  const renderString = renderToString(
    sheet.collectStyles(<App initPage={initPage} />),
  ); // renderToString 함수로 App 컴포넌트를 반환한다.
  const styles = sheet.getStyleTags();
  const initialData = { initPage };
  const result = html
    .replace("<div id='root'></div>", `<div id="root>${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(initialData))
    .replace('__STYLE_FROM_SERVER__', styles);
  res.send(result);
});

app.listen(3000); // 포트번호
