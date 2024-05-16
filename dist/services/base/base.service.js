"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseService = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql");
let baseService = class baseService {
    constructor(tableName) {
        this.wheres = [];
        this.selectParams = "*";
        this.tablename = tableName;
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "divarche"
        });
        this.connection.connect((error) => {
            if (error)
                throw error;
            console.log(`connected model ${this.tablename}`);
        });
    }
    async all() {
        return this;
    }
    where(condition) {
        this.wheres = condition;
        if (this.whereQuery) {
            this.whereQuery += "AND";
        }
        this.whereQuery += ` ${condition[0]} ${condition[1]} '${condition[2]}'`;
        return this;
    }
    async insert(KEYS, VALUES) {
        if (this.whereQuery)
            this.whereQuery = `WHERE ${this.whereQuery}`;
        else {
            this.whereQuery = "";
        }
        const finalizer = `INSERT INTO ${this.tablename}(${KEYS}) VALUES(${VALUES}) ${this.whereQuery}`;
        return await new Promise((resolve, reject) => {
            this.connection.query(finalizer, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result.affectedRows);
            });
        });
    }
    async update(KEY, VALUE) {
        if (this.whereQuery)
            this.whereQuery = `WHERE ${this.whereQuery}`;
        else {
            this.whereQuery = "";
        }
        const finalizer = `UPDATE ${this.tablename} SET ${VALUE} ${this.whereQuery}`;
        return await new Promise((resolve, reject) => {
            this.connection.query(finalizer, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result.affectedRows);
            });
        });
    }
    async get() {
        this.whereQuery = "";
        const finalQuery = `SELECT ${this.selectParams} FROM ${this.tablename} ${this.whereQuery}`;
        return await new Promise((resolve, reject) => {
            this.connection.query(finalQuery, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    }
    async getSpecificRecord(params, conditions) {
        this.whereQuery = "";
        this.where(conditions);
        const finalizer = `SELECT ${params || "*"} FROM ${this.tablename} WHERE ${this.whereQuery}`;
        return await new Promise((resolve, reject) => {
            this.connection.query(finalizer, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    }
    async deleteSpecificRecord(conditions) {
        this.whereQuery = "";
        this.where(conditions);
        const finalizer = `DELETE FROM ${this.tablename} WHERE ${this.whereQuery}`;
        return await new Promise((resolve, reject) => {
            this.connection.query(finalizer, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    }
    async updateSpecificRecord(values, conditions) {
        this.whereQuery = "";
        this.where(conditions);
        const finalizer = `UPDATE ${this.tablename} SET ${values} WHERE ${this.whereQuery}`;
        return await new Promise((resolve, reject) => {
            this.connection.query(finalizer, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    }
};
exports.baseService = baseService;
exports.baseService = baseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], baseService);
//# sourceMappingURL=base.service.js.map