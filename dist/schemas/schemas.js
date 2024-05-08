"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.signup = exports.updateInfo = exports.getInfo = exports.logout = exports.login = void 0;
exports.login = {
    "type": "object",
    "properties": {
        "user": { "type": "string" },
        "pass": { "type": "string" }
    },
    "required": [
        "user",
        "pass"
    ],
    "additionalProperties": false
};
exports.logout = {
    "type": "object",
    "properties": {},
    "required": [],
    "additionalProperties": false
};
exports.getInfo = {
    "type": "object",
    "properties": {},
    "required": [],
    "additionalProperties": false
};
exports.updateInfo = {
    "type": "object",
    "properties": {
        "role_name": {
            "type": "string"
        },
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
        "user": { "type": "string" },
        "pass": { "type": "string" },
        "role_name": { "type": "string" },
        "city_id": { "type": "string" },
        "phone_number": { "type": "string" }
    },
    "required": [
        "user",
        "pass",
        "role_name",
        "city_id",
        "phone_number"
    ],
    "additionalProperties": false
};
exports.add = {
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "price": { "type": "number" },
        "category_id": { "type": "string" },
        "city_id": { "type": "string" }
    },
    "required": [
        "name",
        "description",
        "price",
        "category_id",
        "city_id"
    ],
    "additionalProperties": false
};
//# sourceMappingURL=schemas.js.map