const defaultVm = require('vm');
const safeEval = require('safe-eval');
const { NodeVM, VM } = require('vm2');
const cluster = require('cluster');
const defaultVM = require('vm');

// const nodeVM = new NodeVM();
const nodeVM = new NodeVM({
  require: {
    external: {
      modules: ['moment']
    }
  }
});
// const nodeVM = new NodeVM({
//   require:{
//     builtin: ['util'],
//     external: ['lodash', 'moment', 'moment-timezone', 'rison']
//   },
//   sandbox: {},
//   eval: false
// });
const vm = new VM({ timeout: 1});
// const vm = new VM({
//   timeout: 1
// })


// defaultVm.runInNewContext('process.exit()'); // process is not defined
// defaultVm.runInNewContext('require(fs).readdirSync(".").forEach(file => console.log(file))'); // require is not defined
// defaultVm.runInNewContext('while(true) { console.log("here indefinitely") }'); //hangs
// defaultVm.runInNewContext('let i=0; while(i<5) { console.log("Inside while ",i); i++}'); //works fine but in seperate context so doesn't print anything

// safeEval('process.exit()'); // process is not defined
// safeEval('require(fs).readdirSync(".").forEach(file => console.log(file))'); // require is not defined
// safeEval('while(true) { console.log("here indefinitely") }'); //unexpected token while
// safeEval('let i=0; while(i<5) { console.log("Inside while ",i); i++}'); //unexpected token while

// vm.run('process.exit()'); // process is not defined
// vm.run('require("fs").readdirSync(".").forEach(file => console.log(file))'); // require is not defined
// vm.run('while(true) { console.log("here indefinitely") }'); //hangs or times out depending on object initialization
// vm.run('let i=0; while(i<2000) { console.log("Inside while ",i); i++}'); //executes but in seperate context so doesn't print anything or times out depending on object initialization

// nodeVM.run('process.exit()'); // process is not defined
// nodeVM.run('require("fs").readdirSync(".").forEach(file => console.log(file))'); // access denied or works depending on object initialization
// nodeVM.run('const moment = require("moment"); console.log(moment.now())',__filename); //infinite loop or times out depending on object initialization
// nodeVM.run('let i=0; while(i<10000) { console.log("Inside while ",i); i++}'); //executes or times out depending on object initialization
// console.log(nodeVM.run('3'));

// const a = 'test'
// const scriptSourceOriginal = `module.exports = ({
//   dashboard: {
//     order: 0
//   },
//   search: (client, searchParams) => client.search(searchParams.defaultRequest),
//   condition: response => !!response.hits.total,
//   myFunc: () => console.log('thing: ', a)
// });`;

// const a = vm.run(scriptSourceOriginal);
// console.log('from vm', a);
// const b = nodeVM.run(scriptSourceOriginal);
// console.log('from nodevm', b);
// b.myFunc()
// nodeVM.run('module.exports = 2; while(true) {console.log("inside the loop")}');
if(cluster.isMaster) {
  const fn = cluster.fork();
  console.log(typeof fn);
  setTimeout(_=>fn.process.kill(),55);
} else {
    nodeVM.run(`module.exports = 2;while(true) {console.log("inside the loop ")}`);
}
console.log('****the message AFTER the loop****');

defaultVm.Script('',{})