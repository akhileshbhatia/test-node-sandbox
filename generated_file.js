const { NodeVM } = require('vm2');
  const nodeVm = new NodeVM(
    {sandbox: {}, 
    require: false});
    try {
      const val = nodeVm.run(`module.exports = testerrorhere++;`,__filename);
      process.send({msg: val});
    } catch(err){
      process.send({err: err.message});
    }
  