import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'top-bar',
    templateUrl: 'top-bar.component.html',
    styleUrls: ['top-bar.component.scss']
})

export class TopBarComponent {
    
    currentRoute: string;

    constructor(private router: Router, private location: Location){
        router.events.subscribe((val)=> {
            this.currentRoute = location.path().replace('/','');
        })
    }
}