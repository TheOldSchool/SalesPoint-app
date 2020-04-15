class Provider {
  constructor(getter) {
    this.getter = getter;
    this.provider = {
      id: this.getter.getRandomKey(),
      photo: 'http://localhost:8000/',
      name:'',
      address: '',
      tel: '',
      rfc: '',
      contact: '',
      email: '',
      codepostal: '',
      company: this.getter.getUser().company
    };
  }

  build(event) {
    const target = event.target;
    this.provider.name = (target.company) ? target.company.value : '';
    this.provider.address = (target.address) ? target.address.value : '';
    this.provider.tel = (target.tel) ? target.tel.value : '';
    this.provider.rfc = (target.rfc) ? target.rfc.value : '';
    this.provider.contact = (target.contact) ? target.contact.value : '';
    this.provider.email = (target.email) ? target.email.value : '';
    this.provider.codepostal = (target.codepostal) ? target.codepostal.value : '';
  }

  copy(provider) {
    this.provider = provider;
  }

  serialize() {
    return {
      provider: {
        type: 'provider',
        template: this.provider
      }
    };
  }
}

module.exports = Provider;
