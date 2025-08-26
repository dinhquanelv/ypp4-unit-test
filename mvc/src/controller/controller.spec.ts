import { Delete, Get, Patch, Post, RouteMetadata } from './index';

class TestController {
  @Post()
  create() {
    return 'create something';
  }

  @Get()
  findAll() {
    return 'find all something';
  }

  @Get(':id')
  findOne() {
    return 'find one something';
  }

  @Patch(':id')
  update() {
    return 'update something';
  }

  @Delete(':id')
  remove() {
    return 'remove something';
  }
}

describe('Route Decorators', () => {
  it('should return metadata of routes', () => {
    const metadata: RouteMetadata[] = Reflect.getMetadata(
      'routes',
      TestController,
    ) as RouteMetadata[];

    expect(metadata).toEqual([
      { method: 'POST', path: '/', handler: 'create' },
      { method: 'GET', path: '/', handler: 'findAll' },
      { method: 'GET', path: '/:id', handler: 'findOne' },
      { method: 'PATCH', path: '/:id', handler: 'update' },
      { method: 'DELETE', path: '/:id', handler: 'remove' },
    ]);
  });
});
