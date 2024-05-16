import { NestMiddleware } from "@nestjs/common";
export declare class ValidationMiddleware implements NestMiddleware {
    private ajv;
    private validate;
    use(req: any, res: any, next: () => void): Promise<void>;
    getRequired(body: any): Promise<any>;
    convertStringToArray(inputString: string): string[];
}
