import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions:CorsOptions={
    origin:['http://localhost'],
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true
  };
  app.enableCors(corsOptions);
  app.use(cookieParser());
  await app.listen(3030);
}

bootstrap();
