import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public _webSocketService: WebsocketService) {}

  sendMessage(mensaje: string) {
    const paylaod = {
      de: this._webSocketService.getUsuario().nombre,
      cuerpo: mensaje,
    };

    this._webSocketService.emit('mensaje', paylaod);
  }

  getMessages() {
    return this._webSocketService.listen('mensaje-nuevo');
  }

  getPrivateMessages() {
    return this._webSocketService.listen('mensaje-privado');
  }

  getUsuariosActivos() {
    return this._webSocketService.listen('usuarios-activos');
  }

  emitirUsuariosActivos() {
    this._webSocketService.emit('obtener-usuarios');
  }
}
