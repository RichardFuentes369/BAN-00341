import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://192.168.1.9:3000');
  }

  // Escucha los eventos que emite NestJS
  listenForScans(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('new-scan', (data: { code: string }) => {
        observer.next(data.code);
      });
    });
  }
}