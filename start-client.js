process.chdir('client');
const args = [ 'start' ];
const opts = { stdio: 'inherit' };
require('child_process').spawn('npm', args, opts);
