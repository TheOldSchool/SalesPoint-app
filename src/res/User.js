class User {
  constructor(email, pass) {
    this.username = null;
    this.email = email;
    this.password = pass;
    this.company = null;
    this.cellphone = null;
    this.gender = null;
    this.company_turn = null;
    this.rfc = null;
    this.address = null;
    this.colony = null;
    this.postal_code = null;
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

  setCompanyTurn(turn) {
    this.company_turn = turn;
  }

  setRFC(rfc) {
    this.rfc = rfc;
  }

  setAddress(address) {
    this.address = address;
  }

  setColony(colony) {
    this.colony = colony;
  }

  setpostalCode(postal_code) {
    this.postal_code = postal_code;
  }

  setCellphone(cellphone) {
    this.cellphone = cellphone;
  }

  setGender(gender) {
    this.gender = gender;
  }
}

module.exports = User;
