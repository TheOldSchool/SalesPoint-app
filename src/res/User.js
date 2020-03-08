class User {
  constructor(email, pass) {
    this.username = null;
    this.email = email;
    this.password = pass;
    this.company = null;
    this.cellphone = null;
    this.gender = null;
    this.company_turn = null;
  }

  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(pass) {
    this.password = pass;
  }

  setCompany(company) {
    this.company = company;
  }

  setCellphone(cellphone) {
    this.cellphone = cellphone;
  }

  setGender(gender) {
    this.gender = gender;
  }

  setCompanyTurn(turn) {
    this.company_turn = turn;
  }
}

module.exports = User;
