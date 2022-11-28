import { Component, OnInit } from '@angular/core';
import { TestSubjectService } from 'src/app/service/test-subject/test-subject.service';

@Component({
  selector: 'app-test-one',
  templateUrl: './test-one.component.html',
  styleUrls: ['./test-one.component.scss']
})
export class TestOneComponent implements OnInit {

  constructor(
    private subjectService: TestSubjectService,
  ) { }

  ngOnInit(): void {
    this.subjectService.sUsername.subscribe((response:  String) => {
      console.log("subject from test one -> ", response);
    })

    this.subjectService.bsUsername.subscribe((response:  String) => {
      console.log("behaviour subject from test one -> ", response);
    })

  }

  changeSubjectUser(): void {
    this.subjectService.sUsername.next("its a new value for subject from test one")
  }

  changeBehaviourSubjectUser(): void {
    this.subjectService.bsUsername.next("its a new value for bs from test one")
  }

}
