const ExampleService = {
  getAllLists(db) {
    return db
      .select('*')
      .from('lists');
  },
  postList(db, newList) {
    return db
      .insert(newList)
      .into('lists')
      .returning('*')
      .then(res => res[0]);
  }
};

module.exports = ExampleService;