const lodash = require('lodash');
let obj = {
  dashboard: {
    order: 0,
    info: 'mydata',
    data: {
      myObj: (output) => output.info
    }
  },
  search: (client) => client.data,
  condition: (response) => !!response.hits.total
}

const stringified = JSON.stringify(obj, (key, val) => {
  return (typeof val == 'function') ? val.toString() : val;
},2);

const lodashified = lodash.cloneDeepWith(obj, function(val) {
  // console.log(val);
  if (typeof val == 'function') {
    return val.toString();
  }
});

console.log(lodashified);
