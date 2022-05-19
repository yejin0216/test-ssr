import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

ReactDom.hydrate(<App initPage='home' />, document.getElementById('root'));
