import { UserService } from "../../services/user/user.service";
import { Response } from "express";
import { sessionService } from "../../services/session/session.service";
export declare class UserinfoController {
    private readonly userService;
    private readonly sessionService;
    constructor(userService: UserService, sessionService: sessionService);
    saltRounnds: number;
    signup(res: Response, body: object): Promise<Response<any, Record<string, any>>>;
    login(res: Response, body: object): Promise<Response<any, Record<string, any>>>;
    logout(res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    getInfo(req: Request, res: Response, body: object): Promise<Response<any, Record<string, any>>>;
    updateInfo(res: Response, body: object): Promise<Response<any, Record<string, any>>>;
    encryptPassword(password: string): Promise<string>;
    checkPassword(reqPassword: string, resPassword: string): Promise<boolean>;
    extractKeyAndValue(body: object): {
        keys: string;
        values: string;
    };
    deleteUserSessions(username: any): Promise<boolean>;
}
