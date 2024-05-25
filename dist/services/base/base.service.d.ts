export declare class baseService {
    tablename: any;
    whereQuery: any;
    connection: any;
    wheres: any[];
    selectParams: string;
    constructor(tableName: any);
    where(condition: any): this;
    insert(KEYS: any, VALUES: any): Promise<any>;
    update(KEY: any, VALUE: any): Promise<any>;
    get(): Promise<any>;
    getSpecificRecord(params: any, conditions: Array<string>): Promise<any>;
    deleteSpecificRecord(conditions: Array<string>): Promise<object>;
    updateSpecificRecord(values: string, conditions: Array<string>): Promise<object>;
}
