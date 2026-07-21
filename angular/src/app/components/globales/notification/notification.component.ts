import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-globales-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {

  isDarkMode: string = ''

  @HostListener('window:themeChanged', ['$event'])
  onThemeChanged(event: Event): void {
    const customEvent = event as CustomEvent;
    this.isDarkMode = customEvent.detail;
  }

}
