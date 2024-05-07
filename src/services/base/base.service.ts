import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql';

@Injectable()
export class baseService {
  public tablename;
  public whereQuery;
  public connection;
  public wheres = [];
  public selectParams = '*';

  constructor(tableName) {
    this.tablename = tableName;
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'divarche',
    });
    this.connection.connect((error) => {
      if (error) throw error;
      console.log(`connected model ${this.tablename}`);
    });
  }
  async all() {
    return this;
  }
  async where(condition) {
    this.wheres = condition;
    if (this.whereQuery) {
      this.whereQuery += 'AND';
    }
    this.whereQuery += ` ${condition[0]} ${condition[1]} '${condition[2]}'`;
    return this;
  }

  async insert(KEYS, VALUES): Promise<any> {
    if (this.whereQuery) this.whereQuery = `WHERE ${this.whereQuery}`;
    else {
      this.whereQuery = '';
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

  async update(KEY, VALUE): Promise<any> {
    if (this.whereQuery) this.whereQuery = `WHERE ${this.whereQuery}`;
    else {
      this.whereQuery = '';
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

  async get(): Promise<any> {
    if (this.whereQuery) this.whereQuery = `WHERE ${this.whereQuery}`;
    else {
      this.whereQuery = '';
    }
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
}
