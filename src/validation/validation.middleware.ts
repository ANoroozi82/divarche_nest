import Ajv from "ajv";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { ResponseService } from "../services/response/response.service";
import { signup, login, updateInfo, nothing, addProduct, fields, deleteProduct } from "../schemas/schemas";
import { CategoriesService } from "../services/categories/categories.service";
import { FieldsService } from "src/services/fields/fields.service";

@Injectable()
export class ValidationMiddleware implements NestMiddleware {

  private ajv = new Ajv({ allErrors: true });
  private validate: object = {
    "/user/signup": this.ajv.compile(signup),
    "/user/login": this.ajv.compile(login),
    "/user/logout": this.ajv.compile(nothing),
    "/user/getInfo": this.ajv.compile(nothing),
    "/user/updateInfo": this.ajv.compile(updateInfo),
    "/products/products": {
      "GET": async () => nothing
    },
    "/products/product": {
      "POST": this.bothPutandPost,
      "PUT": this.bothPutandPost,
      "DELETE": () => deleteProduct
    },
    "/products/fields": {
      "GET": async () => fields
    },
    "/products/category": {
      "GET": async () => nothing
    },
    "/products/categories": {
      "GET": async () => nothing
    }
  };

  async use(req: any, res: any, next: () => void) {
    if (Object.keys(req.query).length === 0) {
      let valid;
      try {
        valid = this.ajv.compile(await this.validate[req._parsedUrl.pathname][req.method](req.body, req.method, this));
      } catch (e) {
        res.status(409).json(ResponseService.setMeta({ message: e.message || e }));
      }

      if (valid(req.body)) {
        next();
      } else {
        res.status(409).json(ResponseService.setMeta(valid.errors));
      }

    } else {
      res.status(409).json(ResponseService.setMeta({ message: "queryParams must be null" }))
    }
  }

  async bothPutandPost(body: object, method: string, thisClass: any) {
    if (method === "POST" ? Object.keys(body).includes("categories_id") : (Object.keys(body).includes("categories_id") && Object.keys(body).includes("product_id"))) {
      const result = await thisClass.getPostProductRequired(body);
      let postSchema = Object.assign({}, addProduct);

      postSchema["properties"]["data"]["required"] = thisClass.convertStringToArray(result.fields);

      if (method === "PUT") {
        if (!postSchema["required"].includes("product_id")) {
          postSchema["properties"]["product_id"] = { type: "string" };
          postSchema["required"].push("product_id");
        }
        postSchema["required"] = postSchema["required"].filter(item => item != "user_id");
      }

      return postSchema;
    } else {
      if (method === "POST") {
        throw new Error("body must have categories_id");
      }
      throw new Error("body must have product_id");
    }
  }

  async getPostProductRequired(body: object) {
    const categoriesService = new CategoriesService();
    const fieldsService = new FieldsService();
    const categoriesResult = await categoriesService.getSpecificRecord("fields_id", ["categories_id", "=", `${body["categories_id"]}`])
    const result = await fieldsService.getSpecificRecord("fields", ["fields_id", "=", `${categoriesResult[0]["fields_id"]}`]);

    return result[0];
  }

  convertStringToArray(inputString: string): string[] {

    return inputString.replaceAll('\n', '').replaceAll('[', '').replaceAll(']', '').replaceAll("'", "").replaceAll("\r", "").split(",");
  }
}
