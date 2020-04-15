class Validator {
  constructor() { }

  validRFC(rfc, type) {
    if(type == 0){
      const re1 = /^([A-ZÑ&]{4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;

      if(rfc.match(re1))
        return '';
      else
        return 'El RFC debe cumplir con las condiciones establecidas dependiendo de la Persona Fisica (ABCD123456XXX).';
    } else{
      const re2 = /^([A-ZÑ&]{3}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;

      if(rfc.match(re2))
        return '';
      else
        return 'El RFC debe cumplir con las condiciones establecidas dependiendo de la Persona Moral (ABC123456XXX).';
    }
  }

  validPhone(cellphone) {
    if(cellphone.length == 10)
      return '';
    else
      return 'El numero celular debe tener 10 digitos y ser numeros positivos';
  }

  validTerms(terms) {
    if(terms)
      return '';
    else
      return 'Debe aceptar los terminos y condiciones de uso.';
  }

  validPass(pass_word) {
    const re3 = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    if(pass_word.match(re3))
      return '';
    else
      return 'La contraseña debe cumplir los requisitos del sistema.';
  }
}

module.exports = Validator;
