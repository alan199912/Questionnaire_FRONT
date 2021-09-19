import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-counter',
  templateUrl: './initial-counter.component.html',
  styleUrls: ['./initial-counter.component.scss'],
})
export class InitialCounterComponent implements OnInit, OnDestroy {
  public counter = 3;
  private setInterval: ReturnType<typeof setTimeout>;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.playInitialCounter();
  }

  public playInitialCounter(): void {
    this.setInterval = setInterval(() => {
      if (this.counter === 0) {
        this.router.navigate(['/play/play-questionnaire']);
      }
      this.counter -= 1;
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }
}
