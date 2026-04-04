import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    this.loadCustomFonts();
  }

  private loadCustomFonts(): void {
    const document = inject(DOCUMENT);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap';
    document.head.appendChild(link);
  }
}
