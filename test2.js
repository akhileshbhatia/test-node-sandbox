const { fork, exec } = require('child_process');
const writeFileSync = require('fs').writeFileSync;


const infiniteLoop = `2;
while(true) {
  console.log('inside the infinite loop');
}`;

function createTempFile(script, sandboxObjects={}, canRequire=false){
  const require = canRequire ? {
    builtin: ['util'],
    external: ['lodash', 'moment', 'moment-timezone', 'rison']
  } : false;
  const fileContents = `const { NodeVM } = require('vm2');
  const nodeVm = new NodeVM(
    {sandbox: ${JSON.stringify(sandboxObjects)}, 
    require: ${JSON.stringify(require)}});
  const val = nodeVm.run(\`module.exports = ${script}\`);
  process.send({msg: val});`;
  writeFileSync('generated_file.js', fileContents);
}

createTempFile(infiniteLoop);
const forked = fork('generated_file');

const timeoutId = setTimeout(() => {
  forked.kill();
  console.log('killed after 1 sec')
  clearTimeout(timeoutId);
},1000);

forked.on('message', (response) => {
  const { msg } = response;
  console.log('message from child => ',msg);
  clearTimeout(timeoutId);
  console.log('cleared timeout');
});