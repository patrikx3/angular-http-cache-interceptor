import {Component, OnInit} from '@angular/core';


import packageInfo from '../../package.json';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from "@angular/router";
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'p3x-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [MatToolbarModule, MatTabsModule, NgFor, RouterLinkActive, RouterLink, MatCardModule, MatButtonModule, MatDividerModule, RouterOutlet]
})
export class AppComponent implements OnInit {

  public version: string = packageInfo.version;

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {

    this.navLinks = [
      {
        label: 'Default',
        link: './default',
        index: 0
      }, {
        label: 'Configured caching',
        link: './cache',
        index: 1
      }, {
        label: 'Configured non-caching',
        link: './non-cache',
        index: 2
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }


}
