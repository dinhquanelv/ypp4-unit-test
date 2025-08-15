import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { ListModule } from './modules/list/list.module';
import { TemplateModule } from './modules/template/template.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { ListTypeModule } from './modules/list-type/list-type.module';
import { ListViewModule } from './modules/list-view/list-view.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AccountModule,
    ListModule,
    TemplateModule,
    WorkspaceModule,
    ListTypeModule,
    ListViewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
