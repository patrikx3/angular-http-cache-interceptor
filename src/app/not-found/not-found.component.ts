import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'p3x-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
