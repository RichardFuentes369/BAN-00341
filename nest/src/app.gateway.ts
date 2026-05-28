import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('scan')
  handleScan(@MessageBody() data: string): void {
    console.log(`EAN-13 recibido: ${data}`);
    // Emitimos el evento a todos los clientes conectados
    this.server.emit('new-scan', { code: data, timestamp: new Date() });
  }
}