import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private socket: Socket;

  constructor() {
    // IMPORTANTE: Asegúrate de usar la IP de tu PC aquí también
    this.socket = io('http://192.168.1.6:3000');
  }

  // Escucha los eventos que emite NestJS
  listenForScans(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('new-scan', (data: string) => {
        observer.next(data);
      });
    });
  }
}