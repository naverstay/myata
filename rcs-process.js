const rcsCore = require('rcs-core');
const rcs = require('rename-css-selectors');

// if you want to include the .rcsrc config
rcs.config.load();

const htmlFolderPath = 'deploy/';
const options = {};

rcs.config.load();

rcs.process.auto([
    htmlFolderPath + '**/*.js',
    htmlFolderPath + '**/*.html',
    htmlFolderPath + '**/*.css'],
  options)
  .then(() => rcs.mapping.generate(htmlFolderPath, {overwrite: true}))
  .catch(console.error);
