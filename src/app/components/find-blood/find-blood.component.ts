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
import { NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import { MapViewComponent } from '../shared/map-view/map-view.component';



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
  imports: [NzInputModule, NzModalModule, NzFormModule, NzCardModule, ReactiveFormsModule, RouterModule, NzButtonModule, NzSelectModule, NzDatePickerModule, NzTableModule, NzDividerModule, NzIconModule],
  providers: [NzModalService],
  templateUrl: './find-blood.component.html',
  styleUrl: './find-blood.component.scss'
})
export class FindBloodComponent{

  apiService = inject(apiService);
  modal = inject(NzModalService);
  filterquery: String = '';
  listOfSearchBlood: any[] = []; // Always an array
  searchBloodForm!: FormGroup;
  fb = inject(NonNullableFormBuilder);
  listOfCountries: any[] = [];
  filteredCountries: any[] = [];
  listOfStates: any[] = [];
  filteredStates: any[] = [];
  filteredBlood: any[] = [];
  listOfCities: any[] = [];
  filteredCities: any[] = [];
  filtersToGetUsers = {
    'bloodGroup.equals': null,
    'city.equals': null,
    'state.equals': null,
    'gender.equals': null,
    'country.equals': null
  };
  listOfSearchedUsers: any[] = [];

  ngOnInit(): void {
    this.initilizeForm();
    this.getDataForFilter();
    this.getFilteredUsers();
  }

  initilizeForm() {
    this.searchBloodForm = this.fb.group({
      bloodGroup: [null],
      city: [null],
      state: [null],
      country: [null],
      gender: [null]
    });
  }

  getDataForFilter() {
    this.apiService.getAvailableCountries().subscribe({
      next: (data: any) => {
        this.listOfCountries = data?.body?.content || [];
        this.filteredCountries = [...this.listOfCountries];
      },
      error: () => {
        this.listOfCountries = [];
        this.filteredCountries = [];
      }
    });
  }

  getFilteredUsers() {
    this.submitForm(this.searchBloodForm.value);
  }

  onCountryChange(event: any) {
    if (!event?.id) {
      this.listOfStates = [];
      this.filteredStates = [];
      this.listOfCities = [];
      this.filteredCities = [];
      this.searchBloodForm.patchValue({ state: null, city: null });
      this.submitForm(this.searchBloodForm.value);
      return;
    }
    this.apiService.getAvailableStates({ "countryId.equals": event.id }).subscribe({
      next: (data: any) => {
        this.listOfStates = data?.body?.content || [];
        this.filteredStates = [...this.listOfStates];
        this.listOfCities = [];
        this.filteredCities = [];
        this.searchBloodForm.patchValue({ state: null, city: null });
        this.submitForm(this.searchBloodForm.value);
      },
      error: () => {
        this.listOfStates = [];
        this.filteredStates = [];
        this.listOfCities = [];
        this.filteredCities = [];
      }
    });
  }

  onStateChange(event: any) {
    if (!event?.id) {
      this.listOfCities = [];
      this.filteredCities = [];
      this.searchBloodForm.patchValue({ city: null });
      this.submitForm(this.searchBloodForm.value);
      return;
    }
    this.apiService.getAvailableCities({ "stateId.equals": event.id }).subscribe({
      next: (data: any) => {
        this.listOfCities = data?.body?.content || [];
        this.filteredCities = [...this.listOfCities];
        this.searchBloodForm.patchValue({ city: null });
        this.submitForm(this.searchBloodForm.value);
      },
      error: () => {
        this.listOfCities = [];
        this.filteredCities = [];
      }
    });
  }

  onCityChange(event: any) {
    this.submitForm(this.searchBloodForm.value);
    this.apiService.getAvailableBlood().subscribe({
      next: (data: any) => {
        this.listOfSearchBlood = data?.body || [];
      },
      error: () => {
        this.listOfSearchBlood = [];
      }
    });
  }

  OnGenderChange(event: any) {
    this.submitForm(this.searchBloodForm.value);
  }

  countryFilter(search: string) {
    if (!search) {
      this.filteredCountries = [...this.listOfCountries];
      return;
    }
    this.filteredCountries = this.listOfCountries.filter((country: any) =>
      (country?.name || '').toLowerCase().includes(search.toLowerCase())
    );
  }

  stateFilter(search: string) {
    if (!search) {
      this.filteredStates = [...this.listOfStates];
      return;
    }
    this.filteredStates = this.listOfStates.filter((state: any) =>
      (state?.name || '').toLowerCase().includes(search.toLowerCase())
    );
  }
  bloodGroupFilter(search: string) {
    if (!search) {
      this.filteredBlood = [...this.listOfSearchBlood];
      return;
    }
    this.filteredBlood = this.listOfSearchBlood.filter((state: any) =>
      (state?.name || '').toLowerCase().includes(search.toLowerCase())
    );
  }

  cityFilter(search: string) {
    if (!search) {
      this.filteredCities = [...this.listOfCities];
      return;
    }
    this.filteredCities = this.listOfCities.filter((city: any) =>
      (city?.name || '').toLowerCase().includes(search.toLowerCase())
    );
  }

  OnBloodGroupChange(event: any) {
    this.submitForm(this.searchBloodForm.value);
  }

  submitForm(filterObject: any) {
    const constructedFilterObject = {
      'bloodGroup.equals': filterObject?.bloodGroup || null,
      'city.equals': filterObject?.city?.name || null,
      'state.equals': filterObject?.state?.name || null,
      'gender.equals': filterObject?.gender || null,
      'country.equals': filterObject?.country?.name || null,
    };
    this.apiService.getUsers(constructedFilterObject).subscribe({
      next: (data: any) => {
        this.listOfSearchedUsers = data?.body?.content || [];
      },
      error: () => {
        this.listOfSearchedUsers = [];
      }
    });
  }


  showUserOnMap(user: any | any[]) {
    this.modal.create({
      nzTitle: user?.fullName ? `Location of ${user.fullName}` : 'Search Locations',
      nzContent: MapViewComponent, // Your Leaflet component
      nzData:  {user} , // Pass user data
      nzWidth: 700,
      nzBodyStyle: { padding: '0' }, // Remove padding for full-width map
    });
  }

  
}
