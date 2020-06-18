import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-socket-front';
  constructor(
    public _webSocketService: WebsocketService,
    public _chatService: ChatService
  ) {}

  ngOnInit() {
    this._chatService.sendMessage('HOLA desde Angular');
  }
}
