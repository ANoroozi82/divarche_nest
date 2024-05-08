import { UserService } from '../services/user/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    get(): Promise<any>;
}
