class Getter {
  constructor() { }

  getUser() {
    const thereLocal = localStorage.getItem('user');
    const thereSession = sessionStorage.getItem('user');
    let user = null;


    if(thereLocal == undefined && thereSession == undefined)
      user = null;
    else
      user = JSON.parse((thereLocal != undefined) ? thereLocal : thereSession);

    return user;
  }

  setUser(user) {
    const thereLocal = localStorage.getItem('user');
    const thereSession = sessionStorage.getItem('user');

    if(thereLocal == undefined && thereSession == undefined)
      user = null;
    else if(JSON.parse((thereLocal != undefined)))
      localStorage.setItem('user', JSON.stringify(user));
    else
      sessionStorage.setItem('user', JSON.stringify(user));

    return user;
  }

  getRandomKey() {
    let mask = 'abcdefghijklmnopqrstuvwyz';
    mask += 'ABCDEFGHIJKLMNOPQRSTUVWYZ';
    mask += '0123456789';
    let generated_key = '';

    for (var i = 15; i > 0; --i)
      generated_key += mask[Math.floor(Math.random() * mask.length)];
    return generated_key;
  }
}

module.exports = Getter;
