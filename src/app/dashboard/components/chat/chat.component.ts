import { Component } from '@angular/core';
import { ChatGptService } from '../../services/chat-gpt.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  messages: any[] = [];
  userMessage: string = '';

  constructor(private chatGptService: ChatGptService) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ role: 'user', content: this.userMessage });

    this.chatGptService.sendMessage(this.userMessage).subscribe((response) => {
      const botReply = response.choices[0].message.content;
      this.messages.push({ role: 'assistant', content: botReply });
    });

    this.userMessage = '';
  }
}
