'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });

  it('should send multi requests', async () => {
    // 使用 generator function 方式写测试用例，可以在一个用例中串行发起多次请求
    await app.httpRequest()
      .get('/')
      .expect(200) // 期望返回 status 200
      .expect('hi, egg'); // 期望 body 是 hello world

    // 再请求一次
    const result = await app.httpRequest()
      .get('/')
      .expect(200)
      .expect('hi, egg');

    // 也可以这样验证
    assert(result.status === 200);
  });
});
