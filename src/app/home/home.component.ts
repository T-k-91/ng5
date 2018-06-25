import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
      transition('* => *',[//this animation will be activated when pretty much any state goes to any state
        query(':enter',style({opacity: 0}), {optional:true}),

        query(':enter', stagger('300ms',[//stagger: is a function that allows you to take a number of elements in the dom like our list, and the delay we set up will place a delay on when each subsequent dom element will start to animate.
          animate('.6s ease-in', keyframes([
            style({opacity:0, transform:'translateY(-75%)', offset:0}),
            style({opacity:.5, transform:'translateY(35px)', offset:.3}),
            style({opacity:1, transform:'translateY(0)', offset:1})
          ]))]),{optional:true}),

          query(':leave', stagger('300ms',[//stagger: is a function that allows you to take a number of elements in the dom like our list, and the delay we set up will place a delay on when each subsequent dom element will start to animate.
            animate('.6s ease-in', keyframes([
              style({opacity:1, transform:'translateY(0)', offset:0}),
              style({opacity:.5, transform:'translateY(35px)', offset:.3}),
              style({opacity:0, transform:'translateY(-75%)', offset:1})
            ]))]),{optional:true}),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  itemCount: number = 4;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  goals=[];

  constructor(private _data: DataService) { }

  ngOnInit() {
    
    this._data.goal.subscribe(res => this.goals= res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }
  addItem(){
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }
  removeItem(i){
    this.goals.splice(i,1);
    this._data.changeGoal(this.goals);
  }
}
