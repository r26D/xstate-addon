import React from 'react';
import { configure, setAddon } from '@storybook/react';
// in your project replace to:
// import { configureDoc } from 'storybook-addon-props'
// import { configureDoc } from '../src';

// const addWithDoc = configureDoc({
//   trackerUrl:
//     'https://github.com/marc-rutkowski/storybook-addon-props/issues/%ID%',
// });

// setAddon(addWithDoc);

const req = require.context('../examples', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
