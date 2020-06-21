import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  texto: string = '';
  mensajesSubs: Subscription;

  constructor(public _chatService: ChatService) {}

  ngOnInit(): void {
    this.mensajesSubs = this._chatService.getMessages().subscribe((msg) => {
      console.log(msg);
    });
  }

  ngOnDestroy() {
    this.mensajesSubs.unsubscribe();
  }

  enviar() {
    console.log(this.texto);
    this._chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
