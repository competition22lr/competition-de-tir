import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

const nomParticipants = ['0624-i - Mathys Appocher', '0624-i - Mathys Appocher', '0624-i - Mathys Appocher', '0624-i - Mathys Appocher', '0945 - Rene Beland', '0619 - Carl David Hoffman', '0251 - Gaetan Martel', '0624 - Charles Marchand', '0624 - Charles Marchand', '0624 - Charles Marchand', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0624 - Charles Marchand', '0624 - Charles Marchand', '0251 - Gaetan Martel', '0251 - Gaetan Martel',
  '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0920-i - Zachary Lebel', '0920 - Mathieu Patry', '1415 - Adam-Luc Belec', '1415 - Adam-Luc Belec', '0945 - Rene Beland', '0624-i - Mathys Appocher', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0920 - Mathieu Patry', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0945 - Rene Beland', '0945 - Rene Beland', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel',
  '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0945 - Rene Beland', '0945 - Rene Beland', '0945 - Rene Beland', '0619 - Carl David Hoffman', '0619 - Carl David Hoffman', '1415 - Adam-Luc Belec', '0624-i - Mathys Appocher', '0624-i - Mathys Appocher', '0624-i - Mathys Appocher', '0624-i - Mathys Appocher',
  '0945 - Rene Beland', '0619 - Carl David Hoffman', '0251 - Gaetan Martel', '0624 - Charles Marchand', '0624 - Charles Marchand', '0624 - Charles Marchand', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0624 - Charles Marchand', '0624 - Charles Marchand', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0920-i - Zachary Lebel', '0920 - Mathieu Patry', '1415 - Adam-Luc Belec', '1415 - Adam-Luc Belec', '0945 - Rene Beland', '0624-i - Mathys Appocher', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0920 - Mathieu Patry', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0945 - Rene Beland', '0945 - Rene Beland', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0138 - Robert Guilbault',
  '0138 - Robert Guilbault', '0945 - Rene Beland', '0945 - Rene Beland', '0945 - Rene Beland', '0619 - Carl David Hoffman', '0619 - Carl David Hoffman', '1415 - Adam-Luc Belec', '0624-i - Mathys Appocher', '0624-i - Mathys Appocher', '0624-i - Mathys Appocher', '0624-i - Mathys Appocher', '0945 - Rene Beland', '0619 - Carl David Hoffman', '0251 - Gaetan Martel', '0624 - Charles Marchand', '0624 - Charles Marchand',
  '0624 - Charles Marchand', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0624 - Charles Marchand', '0624 - Charles Marchand', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0920-i - Zachary Lebel', '0920 - Mathieu Patry', '1415 - Adam-Luc Belec',
  '1415 - Adam-Luc Belec', '0945 - Rene Beland', '0624-i - Mathys Appocher', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0920 - Mathieu Patry', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0945 - Rene Beland', '0945 - Rene Beland', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0251 - Gaetan Martel', '0138 - Robert Guilbault', '0138 - Robert Guilbault', '0945 - Rene Beland', '0945 - Rene Beland', '0945 - Rene Beland', '0619 - Carl David Hoffman', '0619 - Carl David Hoffman', '1415 - Adam-Luc Belec'
]


interface Participant {
  id: number;
  name: string;
}

@Component({
  selector: 'app-roue-fortune',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roue-fortune.component.html',
  styleUrls: ['./roue-fortune.component.css']
})
export class RoueFortuneComponent implements AfterViewInit {
  names: Participant[] = nomParticipants.map((name, index) => ({
    id: index + 1,
    name
  }));

  displayedNames: Participant[] = [];
  isSpinning = false;
  winner: Participant | null = null;

  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  private colorMap = new Map<string, string>();
  private itemWidth = 0;

  ngOnInit() {
    this.shuffleNames();
    this.displayedNames = [...this.names];
  }

  ngAfterViewInit() {
    const itemEl = this.carousel.nativeElement.querySelector('.item') as HTMLElement;
    this.itemWidth = itemEl.offsetWidth;
  }

  shuffleNames() {
    for (let i = this.names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.names[i], this.names[j]] = [this.names[j], this.names[i]];
    }
  }

  spin() {
    if (this.isSpinning) return;
    this.isSpinning = true;
    this.winner = null;

    const carouselEl = this.carousel.nativeElement;
    const totalItems = this.displayedNames.length;

    const centerIndex = Math.floor(Math.random() * totalItems);
    const scrollTo = this.itemWidth * centerIndex - (carouselEl.offsetWidth / 2 - this.itemWidth / 2);

    this.animateScroll(carouselEl, scrollTo, 4000).then(() => {
      const centerOfViewport = carouselEl.scrollLeft + carouselEl.offsetWidth / 2;
      const actualIndex = Math.round(centerOfViewport / this.itemWidth);

      this.winner = this.displayedNames[actualIndex];
      this.isSpinning = false;
    });
  }

  animateScroll(element: HTMLElement, to: number, duration: number): Promise<void> {
    const start = element.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    return new Promise(resolve => {
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.scrollLeft = start + change * this.easeOutCubic(progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(animate);
    });
  }

  easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  getColor(name: string): string {
    if (!this.colorMap.has(name)) {
      const hue = Math.floor(Math.random() * 360);
      this.colorMap.set(name, `hsl(${hue}, 70%, 50%)`);
    }
    return this.colorMap.get(name)!;
  }

  getContrastColor(bgColor: string): string {
    const rgb = bgColor.match(/\d+/g)?.map(Number);
    if (!rgb || rgb.length < 3) return 'black';
    const [r, g, b] = rgb;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? 'black' : 'white';
  }
}
