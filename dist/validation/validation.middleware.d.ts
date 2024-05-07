import { NestMiddleware } from '@nestjs/common';
export declare class ValidationMiddleware implements NestMiddleware {
    private ajv;
    private validate;
    use(req: any, res: any, next: () => void): void;
}
