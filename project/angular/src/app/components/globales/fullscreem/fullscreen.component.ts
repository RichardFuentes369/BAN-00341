import { Component } from '@angular/core';

@Component({
  selector: 'app-globales-fullscreem',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss']
})
export class FullscreenComponent {

  fullscreem: boolean = false
  
  toggleFullScreen(): void {
    this.fullscreem = !this.fullscreem
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error al intentar habilitar pantalla completa: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  openFullScreen(): void {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }
}