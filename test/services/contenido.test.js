const assert = require('assert');
const app = require('../../src/app');

describe('\'contenido\' service', () => {
  it('registered the service', () => {
    const service = app.service('contenido');

    assert.ok(service, 'Registered the service');
  });
});
