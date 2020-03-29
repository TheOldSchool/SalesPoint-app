class User {
  constructor() {
    this.user = {
      username: null,
      email:  null,
      pass: null,
      company:  null,
      cellphone: null,
      gender: null,
      company_turn: null,
      rfc: null,
      address: null,
      colony: null,
      postal_code: null
    }
  }

  build(event, company) {
    const target = event.target;
    this.user.username = (target.username) ? target.username.value : '';
    this.user.email = (target.email) ? target.email.value : '';
    this.user.pass = (target.pass) ? target.pass.value : '';
    this.user.company = company;
    this.user.cellphone = (target.cellphone) ? target.cellphone.value : '';
    this.user.gender = (target.gender) ? target.gender.value : '';
    this.user.company_turn = (target.company_turn) ? target.company_turn.value : '';
    this.user.rfc = (target.rfc) ? target.rfc.value : '';
    this.user.address = (target.address) ? target.address.value : '';
    this.user.colony = (target.colony) ? target.colony.value : '';
    this.user.postal_code = (target.postal_code) ? target.postal_code.value : '';
  }

  serialize() {
    return {
      user: {
        type: 'user',
        template: this.user
      }
    };
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
