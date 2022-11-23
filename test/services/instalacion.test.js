const assert = require('assert');
const app = require('../../src/app');

describe('\'instalacion\' service', () => {
  it('registered the service', () => {
    const service = app.service('instalacion');

    assert.ok(service, 'Registered the service');
  });
});
