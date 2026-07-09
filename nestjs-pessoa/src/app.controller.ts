/**
 * Controller raiz da aplicação.
 *
 * @author Gustavo Camerino
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Retorna a mensagem de saudação padrão da aplicação.
   *
   * @returns mensagem de boas-vindas
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
