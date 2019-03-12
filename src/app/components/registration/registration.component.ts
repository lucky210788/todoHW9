import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationFormGroup: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern('^[0-9]*$')]],
    password: ['', [Validators.required, Validators.minLength(9)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  isControlInvalid(controlName: string): boolean {
    const control = this.registrationFormGroup.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit() {
    this.authService.registration(this.registrationFormGroup.value).subscribe((data) => {
      if (data) {
        alert('Are you registered!');
        this.router.navigate(['/login']);
      }
    }, error => {
      console.log(error);
    });
  }
}
