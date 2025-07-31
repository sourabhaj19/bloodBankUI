import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { apiService } from '../../../../services/apiService';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-city-list',
  imports: [CommonModule, NzTableModule, NzButtonModule, NzCardModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss'
})
export class CityListComponent {
apiService = inject(apiService);

  listOfCities: any[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getcities();
  }

  getcities() {
    this.apiService.getCities().subscribe((data: any) => {
      this.listOfCities = data.body?.content;
      console.log(this.listOfCities);
    });
  }
}
