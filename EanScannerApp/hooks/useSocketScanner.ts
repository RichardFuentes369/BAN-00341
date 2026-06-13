// En tu archivo useSocketScanner.ts
import { useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocketScanner = (url: string) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [producto, setProducto] = useState(null);
  const socketRef = useRef<Socket | null>(null);

  const clearProducto = useCallback(() => {
    setProducto(null);
  }, []);

  const connect = useCallback((serverUrl: string) => {
    // Si ya hay una conexión, la cerramos antes de abrir una nueva
    if (socketRef.current) socketRef.current.disconnect();

    socketRef.current = io(serverUrl);

    socketRef.current.on('connect', () => {
      setSocketConnected(true); 
      console.log('Conectado al servidor');
    });

    socketRef.current.on('disconnect', () => {
      setSocketConnected(false); 
      console.log('Desconectado');
    });

    socketRef.current.on('socket_result_product_react', (data) => {
      setProducto(data.data);
    });
  }, []);

  const emitScan = (data: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('scan', data);
    }
  };

  return { socketConnected, producto, emitScan, connect, clearProducto };
};