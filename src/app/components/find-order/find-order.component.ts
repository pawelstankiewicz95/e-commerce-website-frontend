import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.css']
})
export class FindOrderComponent {
  searchForm!: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: ['', Validators.required],
      searchType: ['option1']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.searchForm.value.searchType === 'option1') {
        this.option1Function();
    } else if (this.searchForm.value.searchType === 'option2') {
      this.option2Function();
    }
    else if (this.searchForm.value.searchType === 'option3') {
      this.option3Function();
    }
  }


  option1Function() {
    return 'Result from Option 1 function';
  }

  option2Function() {
    return 'Result from Option 2 function';
  }

  option3Function() {
    return 'Result from Option 2 function';
  }
}
