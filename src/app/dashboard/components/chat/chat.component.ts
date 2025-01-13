import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Assuming this is correctly imported
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  chatVisible: boolean = false;
  userMessage: string = ''; // User input message
  messages: { text: string; isUser: boolean }[] = []; // Store the chat messages
  isFullscreen: boolean = false; // Control fullscreen state
  isLoading = false;

  private _GoogleGenerativeAI: GoogleGenerativeAI;

  constructor() {
    this._GoogleGenerativeAI = new GoogleGenerativeAI(
      'AIzaSyDfmhWCPKoMkSNyW95ax9vw69RbUivhh18'
    );
  }
  // Toggle the fullscreen state
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }
  // Toggle the chat visibility
  toggleChat() {
    this.chatVisible = !this.chatVisible;
  }

  // Handle the send button click
  async sendMessage() {
    if (this.userMessage.trim()) {
      // Add user message to the chat
      this.messages.push({ text: this.userMessage, isUser: true });
      this.onChangeMoving();
      // Clear the input
      const userInput = this.userMessage;
      this.userMessage = '';
      // Show loading animation
      this.isLoading = true;
      // Call the API with the user's message
      const response = await this.generateText(userInput);

      // Add the response to the chat
      this.messages.push({ text: response, isUser: false });

      // Hide loading animation
      this.isLoading = false;
      this.onChangeMoving();
    }
  }

  // Function to generate response from the API
  async generateText(prompt: string): Promise<string> {
    try {
      const model = this._GoogleGenerativeAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text(); // Return the text response from the API
    } catch (error) {
      console.error('Error generating text:', error);
      return 'Sorry, something went wrong. Please try again later.';
    }
  }
  @ViewChildren('Answer') Answer!: QueryList<ElementRef>;
  onChangeMoving(): void {
    setTimeout(() => {
      console.log(this.Answer.last.nativeElement);
      const lastChild = this.Answer.last.nativeElement;
      lastChild.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 0);
  }
}
