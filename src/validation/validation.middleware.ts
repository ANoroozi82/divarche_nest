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
      "GET" : async () =>  nothing
    },
    "/products/product": {
      "POST" : async (body : object) => {
        if (Object.keys(body).includes("categories_id")) { 
          const result = await this.getRequired(body);
          let postSchema = Object.assign({}, addProduct);
  
          postSchema["properties"]["data"]["required"] = this.convertStringToArray(result.fields);
  
          return postSchema;
        } else {
          throw new Error();
        }
      },
      "PUT" : () => nothing,
      "DELETE" : () => deleteProduct
    },
    "/products/fields": {
      "GET" : async () => fields
    },
    "/products/category": {
      "GET" : async () => nothing
    },
    "/products/categories": {
      "GET" : async () => nothing
    }
  };

  async use(req: any, res: any, next: () => void) {
    if (Object.keys(req.query).length === 0) {
      let valid;
      try {
        valid = this.ajv.compile(await this.validate[req._parsedUrl.pathname][req.method](req.body));
      } catch (e) {
        res.status(409).json(ResponseService.setMeta({ message: e.message || e}));
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

  async getRequired(body: any) {
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
