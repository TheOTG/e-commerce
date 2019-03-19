module.exports = {
  dropCollection(collection) {
    const Collection = require(`../models/${collection}`);
    Collection.deleteMany({})
    .then(() => {
      console.log('success drop collection');
    })
    .catch(err => {
      console.log('error drop collection');
    })
  }
};