export declare class baseService {
    tablename: any;
    whereQuery: any;
    connection: any;
    wheres: any[];
    selectParams: string;
    constructor(tableName: any);
    all(): Promise<this>;
    where(condition: any): Promise<this>;
    insert(KEYS: any, VALUES: any): Promise<any>;
    update(KEY: any, VALUE: any): Promise<any>;
    get(): Promise<any>;
}
