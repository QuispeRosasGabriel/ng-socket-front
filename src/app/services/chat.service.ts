import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public _webSocketService: WebsocketService) {}

  sendMessage(mensaje: string) {
    const paylaod = {
      de: 'Gabriel',
      cuerpo: mensaje,
    };

    this._webSocketService.emit('mensaje', paylaod);
  }

  getMessages() {
    return this._webSocketService.listen('mensaje-nuevo');
  }
}
