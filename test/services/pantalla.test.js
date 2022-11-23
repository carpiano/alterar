const assert = require('assert');
const app = require('../../src/app');

describe('\'pantalla\' service', () => {
  it('registered the service', () => {
    const service = app.service('pantalla');

    assert.ok(service, 'Registered the service');
  });
});
