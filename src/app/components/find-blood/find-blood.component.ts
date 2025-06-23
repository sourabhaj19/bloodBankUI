import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableFilterFn, NzTableFilterList, NzTableModule, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';
import { apiService } from '../../services/apiService';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';


interface ItemData {
  id: number;
  firstName: string;
  age: number;
  address: string;
}

interface ColumnItem {
  firstName: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ItemData> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ItemData> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-find-blood',
  imports: [NzInputModule, NzFormModule, NzCardModule, ReactiveFormsModule, RouterModule, NzButtonModule, NzSelectModule, NzDatePickerModule, NzTableModule, NzDividerModule, NzIconModule],
  templateUrl: './find-blood.component.html',
  styleUrl: './find-blood.component.scss'
})
export class FindBloodComponent {
  apiService = inject(apiService);
  filterquery  : String = ''
  listOfSearchBlood : any = [];
  searchBloodForm! : FormGroup;
  fb = inject(NonNullableFormBuilder)
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initilizeForm();
  }

  initilizeForm(){
    this.searchBloodForm = this.fb.group({
      bloodGroup: [null] ,         // e.g. 'A+', 'O-', etc.
      city: [null],
      state: [null],
      gender: [null]
    });
    
    this.searchBloodForm.valueChanges.subscribe((data) => {
      this.submitForm(data)
    });
  }

  submitForm(filterObject:any){
    this.apiService.searchBlood(filterObject).subscribe((data) => {
      this.listOfSearchBlood = data.body;
    });
  }

}
