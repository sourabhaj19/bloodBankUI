import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { apiService } from '../../../../services/apiService';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Router } from '@angular/router';
import { State } from '../state.model';

@Component({
  selector: 'app-state-list',
  imports: [CommonModule, NzTableModule, NzButtonModule, NzCardModule],
  templateUrl: './state-list.component.html',
  styleUrl: './state-list.component.scss'
})
export class StateListComponent {

  apiService = inject(apiService);
  route = inject(Router);

  listOfStates: any[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getStates();
  }

  getStates() {
    this.apiService.getStates().subscribe((data: any) => {
      this.listOfStates = data?.content;
      console.log(this.listOfStates);
    });
  }

  editState(id: State['id'] | null = null): void {
    if (id) {
      this.route.navigate(['/state/', id]);
    } else {
      this.route.navigate(['/state/new']);
    }
  }
}
