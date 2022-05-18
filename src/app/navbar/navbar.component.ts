import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

@Injectable()
export class NavbarComponent implements OnInit {

  form = new FormGroup({
    search: new FormControl('')
  })

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  onChange(e: any) {
    if (e.key == 'Enter') {
      this.searchService.setSearchData(e.target.value)
    }
  }

  onClick() {
    const data = this.form.controls['search'].value;
    this.searchService.setSearchData(data);
  }

}
