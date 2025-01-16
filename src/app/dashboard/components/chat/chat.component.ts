import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Assuming this is correctly imported
import moment from 'moment-hijri'; // Import the Hijri moment library
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { StaticsService } from '../../services/statics.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
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

  constructor(private _StaticsService: StaticsService) {
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
        generationConfig: {
          temperature: 2,
        },
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

  currentTime: string = '';
  showTimeDiv: boolean = false;
  position: any = 'bottomleft';
  message: string = ''; // To store the full message
  textToShow: string = ''; // The text that will be typed out
  private typingInterval: any; // To hold the typing interval reference

  showTime() {
    this.showTimeDiv = !this.showTimeDiv;
    this._StaticsService.getStatics().subscribe({
      next: (res) => {
        console.log(res.latestBlogs[0].created_at);
        this.currentTime = moment(res.latestBlogs[0].created_at)
          .format('iDD iMMMM iYYYY [الساعة] hh:mm A')
          .replace('AM', 'ص') // Replacing AM with ص
          .replace('PM', 'م'); // Replacing PM with م
        // Set the text that will be typed
        this.textToShow = `
        انتبه!
        آخر مرة قمت فيها بنشر مدونة كانت في ${this.currentTime}.`;
        this.startTypingEffect();
      },
    });
  }
  ngOnInit() {
    // Automatically show the time every hour
    setInterval(() => {
      this.showTime(); // Call showTime every hour
    }, 3600000); // 3600000 ms = 1 hour
  }
  startTypingEffect() {
    let i = 0;
    const speed = 35; // The speed at which each letter is typed (milliseconds)

    // Clear any previous text and reset the typing process
    this.message = '';

    // Clear any previous typing interval if it's still active
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }

    // Start typing the message
    this.typingInterval = setInterval(() => {
      if (i < this.textToShow.length) {
        this.message += this.textToShow.charAt(i);
        i++;
      } else {
        clearInterval(this.typingInterval); // Stop the interval when all characters are typed
      }
    }, speed);
  }
}
