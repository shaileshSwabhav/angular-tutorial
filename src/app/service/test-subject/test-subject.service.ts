import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestSubjectService {

  sUsername: Subject<String> = new Subject<String>();
  bsUsername: BehaviorSubject<String> = new BehaviorSubject<String>("It's behaviour subject")

  constructor() { }
}
