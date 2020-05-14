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
    cellphone = cellphone + '';
    if(cellphone.length == 10 && parseInt(cellphone) > 0)
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

  validNumeric(val) {
    if(isNaN(val))
      return 'El valor debe ser númerico';
    else
      return '';
  }

  isEmpty(struct) {
    return (struct.length == 0) ? 'Uno o varios de los campos obligatorios esta vacio.' : '';
  }

  onlyLetters(e){
    var onlyletter = true;
    var text = e.target.value;
    var letras = "@`~!#$%^&*()<>?/-_+={}[];:'|";

    letras.split('').forEach(element => {
      if(text.indexOf(element) != -1)
        onlyletter = false;
    });

    return onlyletter;
  }

  correctForm(id_label){
      const label = document.getElementById(id_label);
      if (this.type_error){
        label.style.display = 'inline-block';
      }
      else{
        label.style.display = 'none';
      }
  }

  validDate(date) {
    const regDate = /^\d{4}[/](0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])$/
    if(date.match(regDate))
      return true;
    else
      return false;
  }
}

module.exports = Validator;
