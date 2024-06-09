"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const ajv_1 = require("ajv");
const common_1 = require("@nestjs/common");
const response_service_1 = require("../services/response/response.service");
const schemas_1 = require("../schemas/schemas");
const categories_service_1 = require("../services/categories/categories.service");
const fields_service_1 = require("../services/fields/fields.service");
let ValidationMiddleware = class ValidationMiddleware {
    constructor() {
        this.ajv = new ajv_1.default({ allErrors: true });
        this.validate = {
            "/user/signup": {
                "POST": async () => schemas_1.signup
            },
            "/user/login": {
                "PUT": async () => schemas_1.login
            },
            "/user/logout": {
                "PUT": async () => schemas_1.nothing
            },
            "/user/getInfo": {
                "GET": async () => schemas_1.getInfo
            },
            "/user/updateInfo": {
                "POST": async () => schemas_1.updateInfo
            },
            "/products/products": {
                "GET": async () => schemas_1.nothing
            },
            "/products/product": {
                "POST": this.bothPutandPost,
                "PUT": this.bothPutandPost,
                "DELETE": () => schemas_1.deleteProduct
            },
            "/products/fields": {
                "GET": async () => schemas_1.fields
            },
            "/products/category": {
                "GET": async () => schemas_1.nothing
            },
            "/products/categories": {
                "GET": async () => schemas_1.nothing
            }
        };
    }
    async use(req, res, next) {
        if (Object.keys(req.query).length === 0) {
            let valid;
            try {
                valid = this.ajv.compile(await this.validate[req._parsedUrl.pathname][req.method](req.body, req.method, this));
            }
            catch (e) {
                res.status(409).json(response_service_1.ResponseService.setMeta({ message: e.message || e }));
            }
            if (valid(req.body)) {
                next();
            }
            else {
                res.status(409).json(response_service_1.ResponseService.setMeta(valid.errors));
            }
        }
        else {
            res.status(409).json(response_service_1.ResponseService.setMeta({ message: "queryParams must be null" }));
        }
    }
    async bothPutandPost(body, method, thisClass) {
        if (method === "POST" ? Object.keys(body).includes("categories_id") : (Object.keys(body).includes("categories_id") && Object.keys(body).includes("product_id"))) {
            const result = await thisClass.getPostProductRequired(body);
            let postSchema = Object.assign({}, schemas_1.addProduct);
            postSchema["properties"]["data"]["required"] = thisClass.convertStringToArray(result.fields);
            if (method === "PUT") {
                if (!postSchema["required"].includes("product_id")) {
                    postSchema["properties"]["product_id"] = { type: "string" };
                    postSchema["required"].push("product_id");
                }
                postSchema["required"] = postSchema["required"].filter(item => item != "user_id");
            }
            return postSchema;
        }
        else {
            if (method === "POST") {
                throw new Error("body must have categories_id");
            }
            throw new Error("body must have product_id");
        }
    }
    async signupAjv() {
        let userSchema = Object.assign({}, schemas_1.signup);
    }
    async getPostProductRequired(body) {
        const categoriesService = new categories_service_1.CategoriesService();
        const fieldsService = new fields_service_1.FieldsService();
        const categoriesResult = await categoriesService.getSpecificRecord("fields_id", ["categories_id", "=", `${body["categories_id"]}`]);
        const result = await fieldsService.getSpecificRecord("fields", ["fields_id", "=", `${categoriesResult[0]["fields_id"]}`]);
        return result[0];
    }
    convertStringToArray(inputString) {
        return inputString.replaceAll("\n", "").replaceAll("[", "").replaceAll("]", "").replaceAll("'", "").replaceAll("\r", "").split(",");
    }
};
exports.ValidationMiddleware = ValidationMiddleware;
exports.ValidationMiddleware = ValidationMiddleware = __decorate([
    (0, common_1.Injectable)()
], ValidationMiddleware);
//# sourceMappingURL=validation.middleware.js.map