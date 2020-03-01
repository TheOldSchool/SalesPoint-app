class Validator {
  constructor() {

  }

  sessionRequest(user) {
    let validEmail = !(this.isempty(user.email) || this.sqlInjection(user.email));
    let validPass = !(this.isempty(user.password) || this.sqlInjection(user.password));
    return validEmail && validPass;
  }

  isempty(field) {
    return field == '' || field === undefined || field.length == 0;
  }

  sqlInjection(field) {
    let injection = field.indexOf('\'') != -1 && field.indexOf('"') != -1;
    if(injection)
      field.replace("'", "\'").replace('"', '\"');
    return false;
  }
}

module.exports = Validator;