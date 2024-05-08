import { ProductsService } from "../services/products/products.service";
export declare class PostsController {
    private postsService;
    private PostsLogic;
    constructor(postsService: ProductsService);
    getPosts(): Promise<{
        meta: {
            date: string;
        };
        data: object;
    }>;
    createPost(body: object): Promise<{
        meta: {
            date: string;
        };
        data: object;
    }>;
    ensureQuoted(value: string): string;
}
