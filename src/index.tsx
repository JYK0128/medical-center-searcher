import React from 'react';
import { createRoot } from 'react-dom/client';
import { enableMapSet } from 'immer';
import { App } from './app/App';

enableMapSet();
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
