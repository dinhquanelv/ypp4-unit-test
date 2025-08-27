import 'reflect-metadata';
import { getHttpCode, HttpCode } from './http-code.decorator';

export class HttpCodeTestController {
  @HttpCode(201)
  create() {
    return 'create something';
  }

  @HttpCode(200)
  find() {
    return 'find something';
  }

  @HttpCode(204)
  delete() {
    return 'delete something';
  }
}

describe('HttpCode decorator', () => {
  it('should return http code metadata', () => {
    const createMetadata: number | undefined = getHttpCode(
      HttpCodeTestController.prototype,
      'create',
    );
    const findMetadata: number | undefined = getHttpCode(
      HttpCodeTestController.prototype,
      'find',
    );
    const deleteMetadata: number | undefined = getHttpCode(
      HttpCodeTestController.prototype,
      'delete',
    );

    expect(createMetadata).toEqual(201);
    expect(findMetadata).toEqual(200);
    expect(deleteMetadata).toEqual(204);
  });
});
