import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { ApiService } from './core/services/api/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private auth: ApiService) {}

  ngOnInit(): void {
    this.auth.healthCheck().subscribe({
      next: (res) => console.log('✅ Backend connesso:', res),
      error: (err) => console.error('❌ Backend non raggiungibile:', err)
    });
  }
}
