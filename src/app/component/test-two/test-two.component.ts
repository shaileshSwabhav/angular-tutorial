import { Component, OnInit } from '@angular/core';
import { TestSubjectService } from 'src/app/service/test-subject/test-subject.service';

@Component({
  selector: 'app-test-two',
  templateUrl: './test-two.component.html',
  styleUrls: ['./test-two.component.scss']
})
export class TestTwoComponent implements OnInit {

  constructor(
    private subjectService: TestSubjectService,
  ) { }

  ngOnInit(): void {
    this.subjectService.sUsername.subscribe((response:  String) => {
      console.log("subject from test two -> ", response);
    })

    this.subjectService.bsUsername.subscribe((response:  String) => {
      console.log("behaviour subject from test two -> ", response);
    })

  }

  changeSubjectUser(): void {
    this.subjectService.sUsername.next("its a new value for subject from test two")
  }

  changeBehaviourSubjectUser(): void {
    this.subjectService.bsUsername.next("its a new value for bs from test two")
  }

}
