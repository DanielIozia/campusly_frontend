import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  conversations: { id: number; name: string; avatar: string; lastMessage: string; time: string; unread: number; online: boolean; isAnonymous: boolean }[] = [];

  activeChat: any = null;

  messages: { id: number; text: string; time: string; isMine: boolean }[] = [];

  newMessage = '';

  selectChat(conversation: typeof this.conversations[0]): void {
    this.activeChat = conversation;
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    this.messages.push({
      id: this.messages.length + 1,
      text: this.newMessage.trim(),
      time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    });
    this.newMessage = '';
  }
}
