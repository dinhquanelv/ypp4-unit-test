import 'reflect-metadata';
import { ParamMetadata } from '../../common/types';
import {
  Body,
  getParameterMetadata,
  Param,
  Query,
} from './parameter.decorator';
import { ParamType } from '../../common/enums';

class ParameterController {
  testParameterFunc(
    @Param('id') id: string,
    @Body() body: { name: string; email: string },
    @Query('age') age: string,
  ) {
    return `User ID: ${id}, Name: ${body.name}, Email: ${body.email}, Age: ${age}`;
  }
}

describe('ParameterController', () => {
  it('should return parameter metadata', () => {
    const metadata: ParamMetadata[] = getParameterMetadata(
      ParameterController.prototype,
      'testParameterFunc',
    );

    expect(metadata).toEqual([
      { type: ParamType.Query, key: 'age', index: 2 },
      { type: ParamType.Body, key: undefined, index: 1 },
      { type: ParamType.Param, key: 'id', index: 0 },
    ]);
  });
});
