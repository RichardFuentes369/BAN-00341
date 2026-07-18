import { Component } from '@angular/core';

@Component({
  selector: 'app-globales-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {

  toggleNotifications = () => {
    console.log('abrir notificaciónes')
  };

}
