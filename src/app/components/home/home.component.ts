import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCarouselModule,
    NzCardModule,
    NzButtonModule,
    NzGridModule,
    NzTypographyModule,
    NzListModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzDropDownModule,
    NzMenuModule,
    RouterModule
  ],
})
export class HomeComponent {
  // Banner images for carousel
  bannerImages = [
    'banner1.png',
    'banner.png',
    'banner1.png'
  ];

  // About section cards
  aboutCards = [
    {
      title: 'Our Mission',
      content: 'At LifeSaver Blood Bank, we are committed to providing a safe, efficient, and accessible blood donation system for those in need.'
    },
    {
      title: 'Why Donate?',
      content: 'Blood donation saves millions of lives each year. Your small effort can create a big impact. Join us in making a difference!'
    },
    {
      title: 'How We Work',
      content: 'We connect donors with recipients through a seamless and transparent system. Every drop counts, and every donor matters!'
    }
  ];

  // Stats data
  stats = [
    { value: '10,000+', label: 'Donors Registered' },
    { value: '5,000+', label: 'Lives Saved' },
    { value: '24/7', label: 'Service Availability' }
  ];

  // Contact form
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Add your form submission logic here
    } else {
      Object.values(this.contactForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}