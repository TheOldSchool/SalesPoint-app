const Getter = require('./Getter.js');

class Historical {
  constructor() {
    this.getter = new Getter();
  }

  renderHistorical(obj) {
    const template = this.template();
    template.states = this.getState(obj.oper);
    const headers = this.getHeader(obj);

    template.action = headers[0];
    template.details = headers[1] + this.assambly(obj);
    return {
      historical: {
        type: 'historical',
        template: template
      }
    };
  }

  getState(type) {
    console.log(type);
    switch(type) {
      case 'shop':
        return 0;
      case 'sell':
        return 1;
      default:
        return 2;
    }
  }

  getHeader(obj) {
    switch(obj.oper) {
      case 'add': case 'shop':
        return this.getAddHeaders(obj.type);
      case 'upd':
        return this.getUpdHeaders(obj.type);
      case 'del':
        return this.getDelHeaders(obj.type);
    }
  }

  getAddHeaders(type) {
    switch(type) {
      case 'product':
        return ['Alta de producto', 'Se realizo un alta de un producto'];
      case 'shop':
        return ['Compra', 'Se realizo una compra:'];
    }
  }

  getUpdHeaders(type) {
    switch(type) {
      case 'product':
        return ['Modificacion de producto', 'Se realizo un modificacion de un producto'];
    }
  }

  getDelHeaders(type) {
    switch(type) {
      case 'product':
        return ['Baja de producto', 'Se realizo una baja de un producto'];
    }
  }

  delete() {

  }

  template() {
    const g_key = this.getter.getRandomKey();
    const key = g_key;
    const user = this.getter.getUser();
    console.log(user);
    const company = user.company;
    const responsable = (user.username) ? user.username : user.name;
    const time = (new Date()).toLocaleString();

    return {
      key: key,
      company: company,
      responsable: responsable,
      details: '',
      time: time,
    };
  }

  assambly(obj) {
    switch(obj.type) {
      case 'product':
        return this.assamblyProduct(obj.template);
      case 'shop':
        return this.assamblyShop(obj.template);
    }
  }

  assamblyProduct(obj) {
    let details = '';
    let comodin = '';

    if(obj.struct_ingredients) {
      comodin = '';
      for(let i = 0; i < obj.struct_ingredients.length; i++)
        comodin += obj.struct_ingredients[i].name + ' x ' + obj.struct_ingredients[i].amount + '\n';
    }

    details += (obj.key) ? `ID: ${obj.key}\n` : '';
    details += (obj.name) ? `Nombre: ${obj.name}\n` : '';
    details += (obj.desc) ? `Descripcion: ${obj.desc}\n` : '';
    details += (obj.price) ? `Precio: ${obj.price}\n` : '';
    details += (comodin != '') ? `Ingredientes: ${comodin}\n` : '';
    return details;
  }

  assamblyShop(obj) {
    console.log(obj);
    let details = `ID: ${obj.id}\n`;
    details += `Proveedor: ${obj.provider}\n`;
    let status = (obj.status == 0) ? 'Completado' : 'Parcial';
    details += `Estado: ${status}\n`;
    let type = (obj.type == 0) ? 'Contado' : 'Credito';
    details += type + '\n';
    details += `Precio: ${obj.price}\n`;
    details += `IVA: ${obj.iva}\n`;
    details += `Total: ${obj.total}\n`;
    details += `Detalles: \n\n${obj.details}`;
    return details;
  }
}

module.exports = Historical;
