import { Injectable } from './decorator/dependency-injection/di.decorator';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
