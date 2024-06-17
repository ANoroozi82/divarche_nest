import { Body, Res, Controller, Delete, Get, Post, Put, Param } from "@nestjs/common";
import { ResponseService } from "../../services/response/response.service";
import { ProductsService } from "../../services/products/products.service";
import { Response } from "express";
import * as  ShortID from "shortid";
import { CategoryService } from "../../services/category/category.service";
import { FieldsService } from "../../services/fields/fields.service";
import { CategoriesService } from "../../services/categories/categories.service";
import { RolesGuard } from "src/roles/roles.decorator";
import { Role } from "../../roles/roles.enum";

@Controller("products")
export class PostsController {

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private fieldsService: FieldsService,
    private categoriesService: CategoriesService,
  ) {
  }

  @RolesGuard(Role.Admin)
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
  async createPost(@Body() body: object, @Res() res: Response) {
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
