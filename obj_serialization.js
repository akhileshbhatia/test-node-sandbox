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

const lodashified = lodash.cloneDeepWith(obj, function(value) {
  if (typeof value == 'function') {
    return value.toString();
  }
});

console.log(lodashified);
