import { Controller, Get, Post, Delete, Body } from "@nestjs/common";
import { ResponseService } from "../services/response/response.service";
import { ProductsService } from "../services/products/products.service";
import { PostsLogic } from "../logics/postsLogic";
import * as  ShortID from "shortid";

@Controller("products")
export class PostsController {

  private PostsLogic;

  constructor(private postsService: ProductsService) {
    this.PostsLogic = new PostsLogic(this.postsService);
  }

  @Get("products")
  async getPosts() {
    try {
      const posts = await this.postsService.get();

      return ResponseService.setMeta(posts);
    } catch (e) {
      return ResponseService.setMeta({
        errors: e.message
      });
    }
  }

  @Post("products")
  async createPost(@Body() body: object) {
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

      return ResponseService.setMeta({
        message: post === 1 ? "Success" : post
      });
    } catch (e) {
      return ResponseService.setMeta({
        errors: e.message
      });
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
}
