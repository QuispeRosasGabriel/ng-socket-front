import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  nombre: string = '';
  constructor(public _webSocketService: WebsocketService) {}

  ngOnInit(): void {}

  ingresar() {
    if (!this.nombre.trim().length) {
      return;
    }
    this._webSocketService.loginWebSocket(this.nombre);
  }
}
