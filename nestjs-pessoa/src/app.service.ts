/**
 * Serviço raiz da aplicação.
 *
 * @author Gustavo Camerino
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Gera a mensagem de saudação padrão.
   *
   * @returns texto fixo "Hello World!"
   */
  getHello(): string {
    return 'Hello World!';
  }
}
