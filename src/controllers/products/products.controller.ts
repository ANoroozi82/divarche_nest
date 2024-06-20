import { Body, Res, Controller, Delete, Get, Post, Put, Req } from "@nestjs/common";
import { ResponseService } from "../../services/response/response.service";
import { ProductsService } from "../../services/products/products.service";
import { Response } from "express";
import * as  ShortID from "shortid";
import { CategoryService } from "../../services/category/category.service";
import { FieldsService } from "../../services/fields/fields.service";
import { CategoriesService } from "../../services/categories/categories.service";
import { RolesGuard } from "src/roles/roles.decorator";
import { Role } from "../../roles/roles.enum";
import { CitiesService } from "src/services/city/cities.service";
import { StateService } from "src/services/state/state.service";
import { UserService } from "src/services/user/user.service";
import { sessionService } from "src/services/session/session.service";

@Controller("products")
export class PostsController {

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private fieldsService: FieldsService,
    private categoriesService: CategoriesService,
    private citiesService: CitiesService,
    private stateService: StateService,
    private userService: UserService,
    private sessionService: sessionService
  ) {
  }

  @RolesGuard(Role.Admin, Role.User)
  @Get("products")
  async getPosts(@Res() res: Response) {
    try {
      const result = await this.productsService.get();
      for (const resultElement of result) {
        resultElement.data = JSON.parse(resultElement.data);
        resultElement.pathImages = JSON.parse(resultElement.pathImages);
      }
      return res.status(200).json(ResponseService.setMeta(result));

    } catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }

  }


  @RolesGuard(Role.Admin)
  @Post("product")
  async createPost(@Body() body: object, @Res() res: Response, @Req() req: Request) {
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
      values.push(await this.getUserId(req))
      const valuesString = values.map(this.ensureQuoted);
      const post = await this.productsService.insert(keys, valuesString);

      return res.status(200).json(ResponseService.setMeta({
        message: post === 1 ? "Success" : post
      }));
    } catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin)
  @Delete("product")
  async deleteProduct(@Body() body: object, @Res() res: Response) {
    try {

      const result = await this.productsService.deleteSpecificRecord(["product_id", "=", `${body["product_id"]}`]);

      return res.status(result["affectedRows"] === 1 ? 200 : 409).json(ResponseService.setMeta({
        message: result["affectedRows"] === 1 ? `${result["affectedRows"]} record deleted` : `product '${body["product_id"]}' not found!!`
      }));
    } catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin)
  @Put("product")
  async updateProduct(@Body() body: object, @Res() res: Response) {
    try {

      body["data"] = JSON.stringify(body["data"]);

      const result = await this.productsService.updateSpecificRecord(this.buildUpdateValues(body), ["product_id", "=", `${body["product_id"]}`]);

      return res.status(result["affectedRows"] === 1 ? 200 : 409).json(ResponseService.setMeta({
        message: result["affectedRows"] === 1 ? `${result["affectedRows"]} record updated` : `product '${body["product_id"]}' not found!!`
      }));
    } catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin)
  @Get("fields")
  async getFields(@Body() body: object, @Res() res: Response) {
    try {

      const categories_id = await this.categoriesService.getSpecificRecord("fields_id", ["categories_id", "=", `${body["categories_id"]}`]);

      if (categories_id.length !== 0) {
        const result = await this.fieldsService.getSpecificRecord(null, ["fields_id", "=", `${categories_id[0]["fields_id"]}`]);
        return res.status(200).json(ResponseService.setMeta(this.buildArray(result[0]["fields"])));
      } else {
        return res.status(409).json(ResponseService.setMeta({
          errors: `categories_id '${body["categories_id"]}' not found!!`
        }));
      }
    } catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin, Role.User)
  @Get("category")
  async getCategory(@Res() res: Response) {
    try {
      const result = await this.categoryService.get();

      return res.status(200).json(ResponseService.setMeta(result));
    } catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin, Role.User)
  @Get("categories")
  async getCategories(@Res() res: Response) {
    try {
      const result = await this.categoriesService.get();

      return res.status(200).json(ResponseService.setMeta(result));
    } catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin, Role.User)
  @Get("cities")
  async getCities(@Res() res: Response) {
    try {
      const result = await this.citiesService.get();

      return res.status(200).json(ResponseService.setMeta(result));
    } catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin, Role.User)
  @Get("state")
  async getState(@Res() res: Response) {
    try {
      const result = await this.stateService.get();

      return res.status(200).json(ResponseService.setMeta(result));
    } catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin, Role.User)
  @Get('products/city')
  async getProductsAccordingToCity(@Res() res: Response, @Body() body: Request) { 
    try { 
      let send: Array<object> = [];
      const users = await this.userService.getSpecificRecord('user_id', ['city_id', '=', body['city_id']]);

      for (const user of users) {
        const products = await this.productsService.getSpecificRecord('*', ['user_id', '=', user['user_id']]);
        send.push(...products);
      }

      return res.status(200).json(send)
    }
    catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin, Role.User)
  @Get('products/categories')
  async getProductsAccordingToCategories(@Res() res: Response, @Body() body: Request) { 
    try { 
      const products = await this.productsService.getSpecificRecord('*', ['categories_id', '=', body['categories_id']]);

      return res.status(200).json(products)
    }
    catch (e) {
      return res.status(500).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  async getUserId(req: Request): Promise<string> {
    const sessionRes = await this.sessionService.getSpecificRecord('info', ['token', '=', req['cookies']['token']]);
    const user = await this.userService.getSpecificRecord("*", ["username", "=", JSON.parse(sessionRes[0]['info'])['username']]);

    return user[0].user_id;
  }

  ensureQuoted(value: string): string {
    if (!value.startsWith("'")) {
      value = "'" + value;
    }
    if (!value.endsWith("'")) {
      value += "'";
    }
    return value;
  }

  buildArray(value: string) {
    return JSON.parse(value.replaceAll("\n", "").replace(/'/g, "\""));
  }

  buildUpdateValues(input: object) {
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
}
