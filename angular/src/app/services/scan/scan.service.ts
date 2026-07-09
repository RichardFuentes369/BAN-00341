import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { VarService } from '@mod/vars/admin/pages/var/service/var.service';
import { VarsService } from '@service/globales/vars/vars.service';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private socket: Socket | null = null;

  constructor(private varsService: VarsService) { }

  async conectar() {
    const obtener_socket_barcode = await this.varsService.obtenerJson('socket_barcode');
    const protocolo_socket_barcode = JSON.parse(obtener_socket_barcode.valor).protocolo_socket_barcode
    const ip_socket_barcode = JSON.parse(obtener_socket_barcode.valor).ip_socket_barcode
    const puerto_socket_barcode = JSON.parse(obtener_socket_barcode.valor).puerto_socket_barcode
    this.socket = io(`${protocolo_socket_barcode}://${ip_socket_barcode}:${+puerto_socket_barcode}`);
  }

  listenForScans(): Observable<string> {
    return new Observable<string>(observer => {
      this.conectar().then(() => {
        if (!this.socket) {
          observer.error('Socket no inicializado.');
          return;
        }
        const handler = (payload: { data: { codigo_barras: string } }) => {
          observer.next(payload.data.codigo_barras);
        };
        this.socket.on('socket_result_barcode_angular', handler);
        return () => {
          if (this.socket) {
            this.socket.off('socket_result_barcode_angular', handler);
          }
        };
      }).catch(err => observer.error(err));
    });
  }
}
