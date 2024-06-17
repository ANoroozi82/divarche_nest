"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = exports.deleteProduct = exports.nothing = exports.getInfo = exports.addProduct = exports.signup = exports.updateInfo = exports.login = void 0;
exports.login = {
    "type": "object",
    "properties": {
        "username": { "type": "string" },
        "password": { "type": "string" }
    },
    "required": [
        "username",
        "password"
    ],
    "additionalProperties": false
};
exports.updateInfo = {
    "type": "object",
    "properties": {
        'id': { "type": "string" },
        "city_id": {
            "type": "string"
        },
        "phone_number": {
            "type": "string"
        }
    },
    "required": [],
    "additionalProperties": false
};
exports.signup = {
    "type": "object",
    "properties": {
        "full_name": { "type": "string" },
        "phone_number": { "type": "string" },
        "city_id": { "type": "string" },
        "role_name": { "type": "string" },
        "username": { "type": "string" },
        "password": { "type": "string" }
    },
    "required": [
        "full_name",
        "phone_number",
        "city_id",
        "role_name",
        "username",
        "password"
    ],
    "additionalProperties": false
};
exports.addProduct = {
    "type": "object",
    "properties": {
        "title": { "type": "string" },
        "description": { "type": "string" },
        "price": { "type": "string" },
        "address": { "type": "string" },
        "categories_id": { "type": "string" },
        "user_id": { "type": "string" },
        "status": { "type": "string" },
        "pathImages": { "type": "array" },
        "data": {
            "type": "object",
            "properties": {
                "سال تولید": { "type": "string" },
                "برند": { "type": "string" },
                "رنگ": { "type": "string" },
                "وضعیت شاسی": { "type": "string" },
                "گیربکس": { "type": "string" },
                "بیمه": { "type": "string" },
                "مدل": { "type": "string" },
                "نوع سوخت": { "type": "string" },
                "حافظه داخلی": { "type": "string" },
                "مقدار رم": { "type": "string" },
                "تعداد سیمکارت": { "type": "string" },
                "اندازه صفحه": { "type": "string" },
                "سیستم عامل": { "type": "string" },
                "پردازنده": { "type": "string" },
                "پردازنده گرافیکی": { "type": "string" },
                "تعداد دسته همراه": { "type": "string" },
                "تعداد روز": { "type": "string" },
                "نوع دسته": { "type": "string" }
            },
            "required": [],
            "additionalProperties": false
        }
    },
    "required": [
        "title",
        "description",
        "price",
        "categories_id",
        "user_id",
        "status",
        "address",
        "data",
        "pathImages"
    ],
    "additionalProperties": false
};
exports.getInfo = {
    "type": "object",
    "properties": {},
    "required": [],
    "additionalProperties": false
};
exports.nothing = {
    "type": "object",
    "properties": {},
    "required": [],
    "additionalProperties": false
};
exports.deleteProduct = {
    "type": "object",
    "properties": {
        "product_id": { "type": "string" }
    },
    "required": [
        "product_id"
    ],
    "additionalProperties": false
};
exports.fields = {
    "type": "object",
    "properties": {
        "categories_id": { "type": "string" }
    },
    "required": [
        "categories_id"
    ],
    "additionalProperties": false
};
//# sourceMappingURL=schemas.js.map