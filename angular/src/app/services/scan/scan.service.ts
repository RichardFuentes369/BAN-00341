import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { VarsService } from '@service/globales/vars/vars.service';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private socket: Socket | null = null;

  constructor(private varsService: VarsService) { }

  private async conectar(): Promise<Socket> {
    // Si ya existe una conexión activa, la reutilizamos
    if (this.socket && this.socket.connected) {
      return this.socket;
    }

    try {
      // Llamada directa a la BD
      const obtener_socket_barcode = await this.varsService.obtenerJson('socket_barcode');
      
      let config: any;
      const valorConfig = obtener_socket_barcode?.valor;

      // Procesamos el valor dependiendo de cómo se obtenga de la BD
      if (typeof valorConfig === 'string') {
        config = JSON.parse(valorConfig);
      } else {
        config = valorConfig;
      }

      const protocolo = config.protocolo_socket_barcode;
      const ip = config.ip_socket_barcode;
      const puerto = config.puerto_socket_barcode;

      const url = `${protocolo}://${ip}:${puerto}`;
      
      this.socket = io(url, {
        transports: ['websocket', 'polling']
      });

      return this.socket;
    } catch (error) {
      console.error('Error al conectar con el socket de barras:', error);
      throw error;
    }
  }

  listenForScans(): Observable<string> {
    return new Observable<string>(observer => {
      let activeSocket: Socket;

      this.conectar().then(socket => {
        activeSocket = socket;

        const handler = (payload: { data: { codigo_barras: string } }) => {
          if (payload && payload.data) {
            observer.next(payload.data.codigo_barras);
          }
        };

        activeSocket.on('socket_result_barcode_angular', handler);
      }).catch(err => {
        observer.error(err);
      });

      return () => {
        if (activeSocket) {
          activeSocket.off('socket_result_barcode_angular');
        }
      };
    });
  }
}