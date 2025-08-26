import { Controller } from './decorator/controller/controller.decorator';
import { AppService } from './app.service';
import { Get } from './decorator/routes/routes.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
