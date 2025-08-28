import { Injectable } from './core/di/di.decorator';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
