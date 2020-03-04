const { fork, exec } = require('child_process');
const writeFileSync = require('fs').writeFileSync;


const infiniteLoop = `2;
while(true) {
  console.log('inside the infinite loop');
}`;

const testError = `testerrorhere++;`

function createTempFile(script, sandboxObjects={}, canRequire=false){
  const require = canRequire ? {
    builtin: ['util'],
    external: ['lodash', 'moment', 'moment-timezone', 'rison']
  } : false;
  const fileContents = `const { NodeVM } = require('vm2');
  const nodeVm = new NodeVM(
    {sandbox: ${JSON.stringify(sandboxObjects)}, 
    require: ${JSON.stringify(require)}});
    try {
      const val = nodeVm.run(\`module.exports = ${script}\`,__filename);
      process.send({msg: val});
    } catch(err){
      process.send({err: err.message});
    }
  `;
  writeFileSync('generated_file.js', fileContents);
}

createTempFile(testError);

const forked = fork('generated_file');

const timeoutId = setTimeout(() => {
  forked.kill();
  console.log('killed after 1 sec')
  clearTimeout(timeoutId);
},100);

forked.on('message', (response) => {
  if (response.err) {
    console.log('Error here ', response.err);
    clearTimeout(timeoutId);
    return;
  }
  const { msg } = response;
  console.log('message from child => ',msg);
  clearTimeout(timeoutId);
});

