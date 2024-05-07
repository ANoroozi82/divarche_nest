export const login : object = {
  "type" : "object",
  "properties" : {
    "user" : {"type" : "string"},
    "pass" : {"type" : "string"}
  },
  "required" : [
    "user",
    "pass"
  ],
  "additionalProperties" : false
};

export const logout : object = {
  "type" : "object",
  "properties" : {},
  "required" : [],
  "additionalProperties" : false
};

export const getInfo : object = {
  "type" : "object",
  "properties" : {},
  "required" : [],
  "additionalProperties" : false
};

export const updateInfo : object = {
  "type" : "object",
  "properties" : {
    "role_name" : {
      "type" : "string"
    },
    "city_id" : {
      "type" : "string"
    },
    "phone_number": {
      "type" : "string"
    }
  },
  "required" : [],
  "additionalProperties" : false
};

export const signup : object = {
  "type" : "object",
  "properties" : {
    "user" : {"type" : "string"},
    "pass" : {"type" : "string"},
    "role_name" : {"type" : "string"},
    "city_id" : {"type" : "string"},
    "phone_number" : {"type" : "string"}
  },
  "required" : [
    "user",
    "pass",
    "role_name",
    "city_id",
    "phone_number"
  ],
  "additionalProperties" : false
};

export const add : object = {
  "type" : "object",
  "properties" : {
    "name" : {"type" : "string"},
    "description" : {"type" : "string"},
    "price" : {"type" : "number"},
    "category_id" : {"type" : "string"},
    "city_id" : {"type" : "string"}
  },
  "required" : [
    "name",
    "description",
    "price",
    "category_id",
    "city_id"
  ],
  "additionalProperties" : false
}