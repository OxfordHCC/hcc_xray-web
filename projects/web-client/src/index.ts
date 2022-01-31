import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './ts/components/Root';

const root = document.getElementById("react-root");
ReactDOM.render(React.createElement(Root,{}), root);
