import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ValidationMiddleware } from "./validation/validation.middleware";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsController } from "./posts/posts.controller";
import { UserinfoController } from "./controllers/userinfo.controller";
import { UserService } from "./services/user/user.service";
import { ResponseService } from "./services/response/response.service";
import { ProductsService } from "./services/products/products.service";
import { CategoriesService } from "./services/categories/categories.service";
import { CategoryService } from "./services/category/category.service";
import { FieldsService } from "./services/fields/fields.service";
import { ImagesService } from "./services/images/images.service";

@Module({
  imports: [],
  controllers: [AppController, PostsController, UserinfoController],
  providers: [AppService, UserService, ResponseService, ProductsService, CategoriesService, FieldsService, CategoryService, ImagesService]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationMiddleware).forRoutes(
      { path: "/products/products", method: RequestMethod.GET },

      { path: "/products/product", method: RequestMethod.POST },

      { path: "/products/product", method: RequestMethod.PUT },

      { path: "/products/product", method: RequestMethod.DELETE },

      { path: "/products/fields", method: RequestMethod.GET },

      { path: "/products/category", method: RequestMethod.GET },

      { path: "/products/categories", method: RequestMethod.GET },

      { path: "/user/signup", method: RequestMethod.POST },

      { path: "/user/login", method: RequestMethod.PUT },

      { path: "/user/logout", method: RequestMethod.PUT },

      { path: "/user/getInfo", method: RequestMethod.GET },

      { path: "/user/updateInfo", method: RequestMethod.POST },

      { path: "/user/delete", method: RequestMethod.DELETE }
    );
  }
}
