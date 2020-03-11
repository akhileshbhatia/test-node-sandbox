const { NodeVM } = require('vm2');

class ABC {

    constructor() {
        
        this.nodeVM = new NodeVM();
        this.output = { ...this, ...this.nodeVM } ;
    }
    
    getServices = (param) => console.log('test value ', param);

    // getServices = function (param) {
    //     console.log('test value', param);
    // }

    vmRun = () => {
        // const data = this.nodeVM.run('module.exports = function() {return {"a" : "b" }}');
        const data2 = this.nodeVM.run.bind(this.output)('module.exports = this.getServices("some value")');
        // console.log(data2);
    }
}

const abcObj = new ABC();
// abcObj.getServices();
abcObj.vmRun();