export const login: object = {
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

export const updateInfo: object = {
  "type": "object",
  "properties": {
    'id':{"type":"string"},
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

export const signup: object = {
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

export const addProduct: object = {
  "type": "object",
  "properties": {
    "title": { "type": "string" },
    "description": { "type": "string" },
    "price": { "type": "string" },
    "address": { "type": "string" },
    "categories_id": { "type": "string" },
    "user_id": { "type": "string" },
    "status": { "type": "string" },
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
    "data"
  ],
  "additionalProperties": false
};
export const getInfo: object = {
  "type": "object",
  "properties": {
    "id": { "type": "string" }
  },
  "required": ["id"],
  "additionalProperties": false
};

export const nothing: object = {
  "type": "object",
  "properties": {},
  "required": [],
  "additionalProperties": false
};

export const deleteProduct: object = {
  "type": "object",
  "properties": {
    "product_id": { "type": "string" }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
};

export const fields: object = {
  "type": "object",
  "properties": {
    "categories_id": { "type": "string" }
  },
  "required": [
    "categories_id"
  ],
  "additionalProperties": false
};