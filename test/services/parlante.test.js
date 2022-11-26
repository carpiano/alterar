const assert = require('assert');
const app = require('../../src/app');

describe('\'parlante\' service', () => {
  it('registered the service', () => {
    const service = app.service('parlante');

    assert.ok(service, 'Registered the service');
  });
});
