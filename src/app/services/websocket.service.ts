import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus: boolean = false;
  public usuario: Usuario = null;

  constructor(private socket: Socket, private router: Router) {
    this.checkStatus();
    this.cargarStorage();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  loginWebSocket(nombre: string) {
    return new Promise((res, rej) => {
      this.socket.emit('configurar-usuario', { nombre }, () => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        res();
      });
    });
  }

  logoutWebSocket() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre',
    };
    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('');
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWebSocket(this.usuario.nombre);
    }
  }
}
