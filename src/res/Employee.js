class Employee {
  constructor(company) {
    this.employee = {
      name: null,
      email: null,
      password: 'Salespoint2020',
      gender: null,
      position: null,
      cellphone: null,
      company: company,
      photo: 'http://localhost:8000/'
    };
  }

  build(event) {
    const target = event.target;
    this.employee.name = (target.name && target.last) ?
      target.name.value + ' ' + target.last.value : '';
    this.employee.email = (target.email) ? target.email.value : '';
    this.employee.pass = (target.pass) ? target.pass.value : '';
    this.employee.gender = (target.gender) ? target.gender.value : '';
    this.employee.position = (target.position) ? target.position.value : '';
    this.employee.cellphone = (target.cellphone) ? target.cellphone.value : '';
  }

  copy(employee) {
    this.employee = employee;
  }

  serialize() {
    return {
      employee: {
        type: 'employee',
        template: this.employee
      }
    };
  }

  setName(name, last) {
    this.name = name + ' ' + last;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(pass) {
    this.password = pass;
  }

  setGender(gender) {
    this.gender = gender;
  }

  setPosition(position) {
    this.position = position;
  }

  setCellphone(cellphone) {
    this.cellphone = cellphone;
  }

  setCompany(company) {
    this.company = company;
  }
}

module.exports = Employee;
