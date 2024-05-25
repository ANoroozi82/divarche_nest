"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const validation_middleware_1 = require("./validation/validation.middleware");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const posts_controller_1 = require("./posts/posts.controller");
const userinfo_controller_1 = require("./controllers/userinfo.controller");
const user_service_1 = require("./services/user/user.service");
const response_service_1 = require("./services/response/response.service");
const products_service_1 = require("./services/products/products.service");
const categories_service_1 = require("./services/categories/categories.service");
const category_service_1 = require("./services/category/category.service");
const fields_service_1 = require("./services/fields/fields.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(validation_middleware_1.ValidationMiddleware).forRoutes({ path: "/products/products", method: common_1.RequestMethod.GET }, { path: "/products/product", method: common_1.RequestMethod.POST }, { path: "/products/product", method: common_1.RequestMethod.PUT }, { path: "/products/product", method: common_1.RequestMethod.DELETE }, { path: "/products/fields", method: common_1.RequestMethod.GET }, { path: "/products/category", method: common_1.RequestMethod.GET }, { path: "/products/categories", method: common_1.RequestMethod.GET }, { path: "/user/signup", method: common_1.RequestMethod.POST }, { path: "/user/login", method: common_1.RequestMethod.PUT }, { path: "/user/logout", method: common_1.RequestMethod.PUT }, { path: "/user/getInfo", method: common_1.RequestMethod.GET }, { path: "/user/updateInfo", method: common_1.RequestMethod.POST }, { path: "/user/delete", method: common_1.RequestMethod.DELETE });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController, posts_controller_1.PostsController, userinfo_controller_1.UserinfoController],
        providers: [app_service_1.AppService, user_service_1.UserService, response_service_1.ResponseService, products_service_1.ProductsService, categories_service_1.CategoriesService, fields_service_1.FieldsService, category_service_1.CategoryService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map