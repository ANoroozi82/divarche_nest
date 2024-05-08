import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import  { ValidationMiddleware} from './validation/validation.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user/user.service';
import { ResponseService } from './services/response/response.service';
import { ProductsService } from './services/products/products.service';

@Module({
  imports: [],
  controllers: [AppController, PostsController, UserController],
  providers: [AppService, UserService, ResponseService, ProductsService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationMiddleware).forRoutes(
      { path: '/posts/add', method: RequestMethod.POST},

      { path: '/products/update', method: RequestMethod.POST},

      { path: '/products/data', method: RequestMethod.GET},

      { path: '/products/selectdata', method: RequestMethod.GET},

      { path: '/products/delete', method: RequestMethod.DELETE},

      { path: '/user/signup', method: RequestMethod.POST},

      { path: '/user/login', method: RequestMethod.PUT},

      { path: '/user/logout', method: RequestMethod.PUT},

      { path: '/user/getInfo', method: RequestMethod.GET},

      { path: '/user/updateInfo', method: RequestMethod.POST},

      { path: '/user/delete', method: RequestMethod.DELETE}
    );
  }
}
