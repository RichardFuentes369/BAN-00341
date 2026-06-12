import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globales-colormode',
  standalone: true,
  templateUrl: './colormode.component.html',
  styleUrl: './colormode.component.scss'
})
export class ColormodeComponent implements OnInit {
  isDarkMode: boolean = false;

  ngOnInit() {
    // Sincronizar estado inicial al cargar
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  toggleTheme = () => {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };
}