import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-information-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() img: string = '';
  @Input() title: string = '';
  
  // Variable que realmente se muestra en el HTML
  displayValue: number = 0;
  private _content: number = 0;

  @Input() 
  set content(value: string | number) {
    // Convertimos a número por si llega como string
    const newValue = Number(value) || 0;
    this._content = newValue;
    this.animateCount(newValue);
  }

  private animateCount(endValue: number) {
    const duration = 1500; // 1.5 segundos
    const startValue = this.displayValue;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Efecto "easeOutExpo" para que se vea fluido
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      this.displayValue = Math.floor(easeOut * (endValue - startValue) + startValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}