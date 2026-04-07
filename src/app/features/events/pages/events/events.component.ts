import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  events: { id: number; title: string; emoji: string; category: string; image: string; date: string; location: string; attendees: number; isErasmus: boolean }[] = [];

  selectedEvent: any = null;

  eventDetail: any = null;

  selectEvent(event: typeof this.events[0]): void {
    this.selectedEvent = event;
  }

  goBack(): void {
    this.selectedEvent = null;
  }
}
