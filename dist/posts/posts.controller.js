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
const postsLogic_1 = require("../logics/postsLogic");
const ShortID = require("shortid");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
        this.PostsLogic = new postsLogic_1.PostsLogic(this.postsService);
    }
    async getPosts() {
        try {
            const posts = await this.postsService.get();
            return response_service_1.ResponseService.setMeta(posts);
        }
        catch (e) {
            return response_service_1.ResponseService.setMeta({
                errors: e.message
            });
        }
    }
    async createPost(body) {
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
            const post = await this.postsService.insert(keys, valuesString);
            return response_service_1.ResponseService.setMeta({
                message: post === 1 ? "Success" : post
            });
        }
        catch (e) {
            return response_service_1.ResponseService.setMeta({
                errors: e.message
            });
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
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)("products"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Post)("products"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)("products"),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map