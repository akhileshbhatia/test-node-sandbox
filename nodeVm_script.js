const { NodeVM } = require('vm2');
const nodeVm = new NodeVM();
const infiniteLoop = `2;
while(true) {
  console.log('inside the infinite loop');
}`
const val = nodeVm.run('module.exports = '+infiniteLoop);
process.send({msg: val});