import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import { Router } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
loading = true;
  constructor(public location: Location,  private router: Router, ) { }



  ngOnInit() {

    setTimeout( () => {
      this.loading = false;
    },6000);
    
  }

}
