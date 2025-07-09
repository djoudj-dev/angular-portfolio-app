import { Component } from '@angular/core';
import { HomeBanner } from './home-banner/home-banner';
import { HomeIntro } from './home-intro/home-intro';

@Component({
  selector: 'app-home',
  imports: [HomeBanner, HomeIntro],
  templateUrl: './home.html',
})
export class Home {}
