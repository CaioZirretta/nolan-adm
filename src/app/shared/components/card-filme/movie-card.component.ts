import { Component, Input } from '@angular/core';
import { Animation } from "../../services/animation.service";

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  animations: [Animation.fadeIn(300)]
})
export class MovieCardComponent {
  @Input({ required: true }) imageSrc: string = "";
  @Input({ required: true }) title: string = "";
}
