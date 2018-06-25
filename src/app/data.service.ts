import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private goals = new BehaviorSubject<any>(['the initial goal', 'Another silly life goal']);
  goal = this.goals.asObservable();
  constructor() { }

  changeGoal(goal){
    this.goals.next(goal);
  }
}