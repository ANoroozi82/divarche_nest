import { UserService } from "../../services/user/user.service";
import { Response } from "express";
import { sessionService } from "../../services/session/session.service";
export declare class UserinfoController {
    private readonly userService;
    private readonly sessionService;
    constructor(userService: UserService, sessionService: sessionService);
    signup(res: Response, body: object): Promise<Response<any, Record<string, any>>>;
    login(res: Response, body: object): Promise<Response<any, Record<string, any>>>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
    getInfo(res: Response, body: object): Promise<Response<any, Record<string, any>>>;
    updateInfo(res: Response, body: object): Promise<Response<any, Record<string, any>>>;
}
