const { NodeVM } = require('vm2');

class ABC {

    constructor() {
        this.nodeVM = new NodeVM({
          sandbox: { getServices: this.getServices() }
        });
        this.input = { ...this, ...this.nodeVM } ;
    }
    
    getServices = (param) => {
      console.log('test value ', param);
    }

    vmRun = () => {
        const data2 = this.nodeVM.run('module.exports = getServices("some value")');
    }
}

const abcObj = new ABC();
abcObj.vmRun();