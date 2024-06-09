import { NestMiddleware } from "@nestjs/common";
export declare class ValidationMiddleware implements NestMiddleware {
    private ajv;
    private validate;
    use(req: any, res: any, next: () => void): Promise<void>;
    bothPutandPost(body: object, method: string, thisClass: any): Promise<object>;
    signupAjv(): Promise<void>;
    getPostProductRequired(body: object): Promise<any>;
    convertStringToArray(inputString: string): string[];
}
