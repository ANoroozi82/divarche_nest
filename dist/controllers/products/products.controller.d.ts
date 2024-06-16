import { ProductsService } from "../../services/products/products.service";
import { Response } from "express";
import { CategoryService } from "../../services/category/category.service";
import { FieldsService } from "../../services/fields/fields.service";
import { CategoriesService } from "../../services/categories/categories.service";
import { sessionService } from "../../services/session/session.service";
export declare class PostsController {
    private productsService;
    private categoryService;
    private fieldsService;
    private categoriesService;
    private readonly sessionService;
    constructor(productsService: ProductsService, categoryService: CategoryService, fieldsService: FieldsService, categoriesService: CategoriesService, sessionService: sessionService);
    getPosts(res: Response): Promise<Response<any, Record<string, any>>>;
    createPost(body: object, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteProduct(body: object, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProduct(body: object, res: Response): Promise<Response<any, Record<string, any>>>;
    getFields(body: object, res: Response): Promise<Response<any, Record<string, any>>>;
    getCategory(res: Response): Promise<Response<any, Record<string, any>>>;
    getCategories(res: Response): Promise<Response<any, Record<string, any>>>;
    ensureQuoted(value: string): string;
    buildArray(value: string): any;
    buildUpdateValues(input: object): string;
}
