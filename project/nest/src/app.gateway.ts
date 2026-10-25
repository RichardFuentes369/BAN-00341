import { ProductService } from '@module/catalogo/product/product.service';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly productoService: ProductService) { }

  @SubscribeMessage('scan')
  async handleScan(@MessageBody() data: string) {
    const producto = await this.productoService.findOneBarcodeApi('es', data);

    let result: any = {}
    
    // console.log(producto)

    if (producto == null) {
      result = {
        // ...result,
        codigo_barras: data,
        encontrado: false,
      };
    }else{
      result = {
        // ...result,
        codigo_barras: data,
        encontrado: true,
        nombre: producto.nombre || 'N/A',
        esPerecedero: (producto.es_perecedero) ? 'Si': 'No',
        estado: (producto.estado) ? 'Activo': 'Inactivo',
        marca: producto.marca?.nombre || 'N/A',
        medida: producto.medida?.nombre || 'N/A'
      };
    }

    this.server.emit('socket_result_barcode_angular', { data: result });
    this.server.emit('socket_result_product_react', { data: result });
  }
}