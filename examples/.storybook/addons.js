
import addons from '@storybook/addons';

import '@storybook/addon-actions/register';
console.log("After actions", addons.loaders)
import '@storybook/addon-links/register';
console.log("After links", addons.loaders)
import '@storybook/addon-xstate/register';
console.log("After state", addons.loaders)

console.log("After all the imports", addons)
