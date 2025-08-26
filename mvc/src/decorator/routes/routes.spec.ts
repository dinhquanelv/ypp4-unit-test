import 'reflect-metadata';
import { RouteMetadata } from '../../common/types';
import { Delete, Get, Patch, Post } from './routes.decorator';

class UserController {
  @Post()
  create() {
    return 'create user';
  }

  @Get()
  findAll() {
    return 'find all user';
  }

  @Get(':id')
  findOne() {
    return 'find one user';
  }

  @Patch(':id')
  update() {
    return 'update user';
  }

  @Delete(':id')
  remove() {
    return 'remove user';
  }
}

describe('Route Decorators', () => {
  it('should return metadata of routes', () => {
    const metadata: RouteMetadata[] = Reflect.getMetadata(
      'routes',
      UserController,
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
