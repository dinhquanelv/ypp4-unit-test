import 'reflect-metadata';
import { setGlobalPrefix } from '../core/global-prefix';
import { Controller } from '../decorator/controller';
import { Delete, Get, Patch, Post } from '../decorator/routes';
import { RouteMetadata } from '../types';
import { compileRoutes } from './index';

setGlobalPrefix('api');

@Controller('users')
export class UserController {
  @Post()
  create() {
    return 'create user';
  }

  @Get()
  findAll() {
    return 'find all users';
  }

  @Get(':id')
  findOne() {
    return 'find one user';
  }

  @Get('search')
  search() {
    return 'search users';
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

describe('Routes', () => {
  it('should return metadata of fullRoutes', () => {
    compileRoutes(UserController);

    const metadata: RouteMetadata[] = Reflect.getMetadata(
      'fullRoutes',
      UserController,
    ) as RouteMetadata[];

    expect(metadata).toEqual([
      { method: 'POST', path: '/api/users/', handler: 'create' },
      { method: 'GET', path: '/api/users/', handler: 'findAll' },
      { method: 'GET', path: '/api/users/:id', handler: 'findOne' },
      { method: 'GET', path: '/api/users/search', handler: 'search' },
      { method: 'PATCH', path: '/api/users/:id', handler: 'update' },
      { method: 'DELETE', path: '/api/users/:id', handler: 'remove' },
    ]);
  });
});
