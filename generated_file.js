const { NodeVM } = require('vm2');
  const nodeVm = new NodeVM(
    {sandbox: {}, 
    require: false});
  const val = nodeVm.run(`module.exports = 2;
while(true) {
  console.log('inside the infinite loop');
}`);
  process.send({msg: val});