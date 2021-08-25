const dbAddUserBlankInputs = (req, res, next) => {
  res.render('user/add', {
    title: 'Add New User',
    name: '',
    age: '',
    email: '',
  });
};

module.exports = dbAddUserBlankInputs;
