"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const response_service_1 = require("../../services/response/response.service");
const products_service_1 = require("../../services/products/products.service");
const ShortID = require("shortid");
const category_service_1 = require("../../services/category/category.service");
const fields_service_1 = require("../../services/fields/fields.service");
const categories_service_1 = require("../../services/categories/categories.service");
const roles_decorator_1 = require("../../roles/roles.decorator");
const roles_enum_1 = require("../../roles/roles.enum");
const cities_service_1 = require("../../services/city/cities.service");
const state_service_1 = require("../../services/state/state.service");
const user_service_1 = require("../../services/user/user.service");
const session_service_1 = require("../../services/session/session.service");
let PostsController = class PostsController {
    constructor(productsService, categoryService, fieldsService, categoriesService, citiesService, stateService, userService, sessionService) {
        this.productsService = productsService;
        this.categoryService = categoryService;
        this.fieldsService = fieldsService;
        this.categoriesService = categoriesService;
        this.citiesService = citiesService;
        this.stateService = stateService;
        this.userService = userService;
        this.sessionService = sessionService;
    }
    async getPosts(res) {
        try {
            const result = await this.productsService.get();
            for (const resultElement of result) {
                resultElement.data = JSON.parse(resultElement.data);
                resultElement.pathImages = JSON.parse(resultElement.pathImages);
            }
            return res.status(200).json(response_service_1.ResponseService.setMeta(result));
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getMyProducts(res, req) {
        try {
            const user = await this.getUserId(req);
            const result = await this.productsService.getSpecificRecord('*', ['user_id', '=', `${user}`]);
            return res.status(200).json(result);
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async createPost(body, res, req) {
        try {
            const keys = Object.keys(body);
            keys.push("product_id");
            keys.push('user_id');
            const values = Object.values(body);
            values.forEach((value, index) => {
                if (typeof value === "object") {
                    values[index] = JSON.stringify(value);
                }
            });
            values.push(ShortID.generate());
            values.push(await this.getUserId(req));
            const valuesString = values.map(this.ensureQuoted);
            const post = await this.productsService.insert(keys, valuesString);
            return res.status(200).json(response_service_1.ResponseService.setMeta({
                message: post === 1 ? "Success" : post
            }));
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async deleteProduct(body, res) {
        try {
            const result = await this.productsService.deleteSpecificRecord(["product_id", "=", `${body["product_id"]}`]);
            return res.status(result["affectedRows"] === 1 ? 200 : 409).json(response_service_1.ResponseService.setMeta({
                message: result["affectedRows"] === 1 ? `${result["affectedRows"]} record deleted` : `product '${body["product_id"]}' not found!!`
            }));
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async updateProduct(body, res) {
        try {
            body["data"] = JSON.stringify(body["data"]);
            const result = await this.productsService.updateSpecificRecord(this.buildUpdateValues(body), ["product_id", "=", `${body["product_id"]}`]);
            return res.status(result["affectedRows"] === 1 ? 200 : 409).json(response_service_1.ResponseService.setMeta({
                message: result["affectedRows"] === 1 ? `${result["affectedRows"]} record updated` : `product '${body["product_id"]}' not found!!`
            }));
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getFields(body, res) {
        try {
            const categories_id = await this.categoriesService.getSpecificRecord("fields_id", ["categories_id", "=", `${body["categories_id"]}`]);
            if (categories_id.length !== 0) {
                const result = await this.fieldsService.getSpecificRecord(null, ["fields_id", "=", `${categories_id[0]["fields_id"]}`]);
                return res.status(200).json(response_service_1.ResponseService.setMeta(this.buildArray(result[0]["fields"])));
            }
            else {
                return res.status(409).json(response_service_1.ResponseService.setMeta({
                    errors: `categories_id '${body["categories_id"]}' not found!!`
                }));
            }
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getCategory(res) {
        try {
            const result = await this.categoryService.get();
            return res.status(200).json(response_service_1.ResponseService.setMeta(result));
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getCategories(res) {
        try {
            const result = await this.categoriesService.get();
            return res.status(200).json(response_service_1.ResponseService.setMeta(result));
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getCities(res) {
        try {
            const result = await this.citiesService.get();
            return res.status(200).json(response_service_1.ResponseService.setMeta(result));
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getState(res) {
        try {
            const result = await this.stateService.get();
            return res.status(200).json(response_service_1.ResponseService.setMeta(result));
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getProductsAccordingToCity(res, body) {
        try {
            let send = [];
            const users = await this.userService.getSpecificRecord('user_id', ['city_id', '=', body['city_id']]);
            for (const user of users) {
                const products = await this.productsService.getSpecificRecord('*', ['user_id', '=', user['user_id']]);
                send.push(...products);
            }
            return res.status(200).json(send);
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getProductsAccordingToCategories(res, body) {
        try {
            const products = await this.productsService.getSpecificRecord('*', ['categories_id', '=', body['categories_id']]);
            return res.status(200).json(products);
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getUserId(req) {
        const sessionRes = await this.sessionService.getSpecificRecord('info', ['token', '=', req['cookies']['token']]);
        const user = await this.userService.getSpecificRecord("*", ["username", "=", JSON.parse(sessionRes[0]['info'])['username']]);
        return user[0].user_id;
    }
    ensureQuoted(value) {
        if (!value.startsWith("'")) {
            value = "'" + value;
        }
        if (!value.endsWith("'")) {
            value += "'";
        }
        return value;
    }
    buildArray(value) {
        return JSON.parse(value.replaceAll("\n", "").replace(/'/g, "\""));
    }
    buildUpdateValues(input) {
        const keys = Object.keys(input);
        const values = Object.values(input);
        let returnValue = "";
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] !== "product_id") {
                returnValue += `${keys[i]} = '${values[i]}'${i !== keys.length - 1 ? ", " : ""}`;
            }
        }
        return returnValue;
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin, roles_enum_1.Role.User),
    (0, common_1.Get)("products"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin),
    (0, common_1.Get)("myproducts"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getMyProducts", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin),
    (0, common_1.Post)("product"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Request]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin),
    (0, common_1.Delete)("product"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deleteProduct", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin),
    (0, common_1.Put)("product"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updateProduct", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin),
    (0, common_1.Get)("fields"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getFields", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin, roles_enum_1.Role.User),
    (0, common_1.Get)("category"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getCategory", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin, roles_enum_1.Role.User),
    (0, common_1.Get)("categories"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getCategories", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin, roles_enum_1.Role.User),
    (0, common_1.Get)("cities"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getCities", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin, roles_enum_1.Role.User),
    (0, common_1.Get)("state"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getState", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin, roles_enum_1.Role.User),
    (0, common_1.Get)('products/city'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getProductsAccordingToCity", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin, roles_enum_1.Role.User),
    (0, common_1.Get)('products/categories'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getProductsAccordingToCategories", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)("products"),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        category_service_1.CategoryService,
        fields_service_1.FieldsService,
        categories_service_1.CategoriesService,
        cities_service_1.CitiesService,
        state_service_1.StateService,
        user_service_1.UserService,
        session_service_1.sessionService])
], PostsController);
//# sourceMappingURL=products.controller.js.map