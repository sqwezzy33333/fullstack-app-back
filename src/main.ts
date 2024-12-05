import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {CustomValidationPipe} from "./validation/custom-validation-pipe";
import {HttpExceptionFilter} from "./exception-filter/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new CustomValidationPipe());
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter());
    const PORT = process.env.PORT;

    const options = new DocumentBuilder()
        .setTitle('Library')
        .setDescription('Application')
        .setVersion('1.0')
        .addServer(`http://localhost:${PORT}/`, 'Local environment')
        .addTag('Your API Tag')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(PORT ?? 3000);
}

bootstrap();
