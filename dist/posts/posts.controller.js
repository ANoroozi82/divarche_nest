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
const response_service_1 = require("../services/response/response.service");
const products_service_1 = require("../services/products/products.service");
const ShortID = require("shortid");
const category_service_1 = require("../services/category/category.service");
const fields_service_1 = require("../services/fields/fields.service");
const categories_service_1 = require("../services/categories/categories.service");
let PostsController = class PostsController {
    constructor(productsService, categoryService, fieldsService, categoriesService) {
        this.productsService = productsService;
        this.categoryService = categoryService;
        this.fieldsService = fieldsService;
        this.categoriesService = categoriesService;
    }
    async getPosts(res) {
        try {
            const result = await this.productsService.get();
            for (const resultElement of result) {
                resultElement.data = JSON.parse(resultElement.data);
            }
            return res.status(200).json(response_service_1.ResponseService.setMeta(result));
        }
        catch (e) {
            return res.status(500).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async createPost(body, res) {
        try {
            const keys = Object.keys(body);
            keys.push("product_id");
            const values = Object.values(body);
            values.forEach((value, index) => {
                if (typeof value === "object") {
                    values[index] = JSON.stringify(value);
                }
            });
            values.push(ShortID.generate());
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
                returnValue += `${keys[i]} = '${values[i]}'${i !== keys.length - 1 ? ', ' : ''}`;
            }
        }
        return returnValue;
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)("products"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Post)("product"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Delete)("product"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Put)("product"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Get)("fields"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getFields", null);
__decorate([
    (0, common_1.Get)("category"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Get)("categories"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getCategories", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)("products"),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        category_service_1.CategoryService,
        fields_service_1.FieldsService,
        categories_service_1.CategoriesService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map