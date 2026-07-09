/**
 * Ponto de entrada da aplicação NestJS.
 *
 * @author Gustavo Camerino
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Cria a instância da aplicação a partir do módulo raiz e inicia
 * o servidor HTTP na porta definida pela variável de ambiente PORT
 * (ou 3000 como padrão).
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
