class Requester {
  constructor() {
    this.url = 'http://localhost:8000/api';
    this.config = {
      method: 'POST',
      body: {},
      params: {},
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  async get(route, params) {
    this.config.method = 'GET';
    this.options.params = JSON.stringify(params);
    return await this.request(route, params);
  }

  async post(route, params) {
    this.config.method = 'POST';
    this.config.body = JSON.stringify(params);
    return await this.request(route);
  }

  async postFile(route, params) {
    this.config.method = 'POST';
    this.config.body = params;
    this.config.headers = {};
    return await this.request(route);
  }

  async request(route) {
    const url = this.url + route;
    console.log(url);
    const response = await fetch(url, this.config);
    return await response.json();
  }
}

module.exports = Requester;
