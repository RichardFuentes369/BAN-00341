import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // Habilita CORS para que Angular y Expo conecten
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('scan') // Escucha el evento 'scan' enviado por el móvil
  handleScan(@MessageBody() data: string): void {
    console.log('Código recibido:', data);
    // Retransmite el código a todos los clientes (Angular)
    this.server.emit('new-scan', data); 
  }
}