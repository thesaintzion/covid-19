import { Component, OnInit, HostListener  } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import {getCode} from 'country-list';
import { SharedDialogComponent } from '../../_dialog/shared-dialog/shared-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit {
  cases;
  deaths;
  recovered;
  casesByCountries = [];
  searchForm;
  searchTyping = false;
  searching = false;
  fadeOutClass = '';
  getingCoutries = true;
  getingCoutriesErr = '';
  submitted = false;
  noSearchMatch = false;

  windowScrolled: boolean; 
  headerFullWidth: boolean;
  date = new Date();
  ttt = 'https://www.countryflags.io/be/flat/64.png';
  

  missingCountries = {
    "Iran" : "IR",
    "S. Korea" : "KR",
    "USA" : "US",
    "UK" : "GB",
    "Russia" : "RU",
    "UAE" : "AE",
    "Taiwan" : "TN",
    "Vietnam" : "VN",
    "Brunei" : "BN",
    "Diamond Princess" : "US",
    "Faeroe Islands" : "FO",
    "Palestine" : "PS",
    "Moldova" : "MD",
    "Venezuela" : "VE",
    "Bolivia" : "BO",
    "Channel Islands" : "GB",
    "DRC" : "CD",
    "Ivory Coast" : "CI",
    "St. Barth" : "BL",
    "Saint Martin" : "MF",
    "Tanzania" : "TZ",
    "U.S. Virgin Islands" : "US",
    "CAR" : "CF",
    "Vatican City" : "VA",
    "St. Vincent Grenadines" : "VC",
    "Sint Maarten" : "SX",
    "Syria": "SY",
    "Turks and Caicos" : "TC",
    "British Virgin Islands": "VG",
    "Laos": "LA"
  }


  // continents = [];

  continents = {
    'North America' : 'North America', 
    'Europe': 'Europe', 
    'Asia': 'Asia', 
    'South America': 'South America',
    'Oceania': 'Oceania',
    'Africa' : 'Africa',
  }

  continents2 = {
    'North America' : 'North America', 
    'Europe': 'Europe', 
    'Asia': 'Asia', 
    'South America': 'South America',
    'Oceania': 'Oceania',
    'Africa' : 'Africa',
    'World': 'World', 
    "": ""
  }

  sort = 'Country';


  constructor(public apiService: ApiService, private formBuilder: FormBuilder, private dialog: MatDialog, private router: Router) { 
    this.searchForm = this.formBuilder.group({
      searchInput: ['', [Validators.required]]
    })   
  }

  //Handle sort
  haddleSort(sort){
this.sort = sort;
  }
  
      // 
      closeSearch(){
        this.searching = false;
         this.searchTyping = false;
         this.searchForm.patchValue({
          searchInput: ''
         });
        this.getCountries();
      }
      // 
      search(){
    this.searching = true;
    this.fadeOutClass = 'd-none';
      }
    // 
      searchType(value){
        this.searchTyping = true;
        this.noSearchMatch = false;
        console.log(this.searchForm.value.searchInput);
        if(this.searchForm.invalid){
          this.searchTyping = false;
          this.getCountries();
        }  

      }  
      // On form submit
      onSubmit(value){
        this.noSearchMatch = false;
        if(!this.searchForm.invalid){
          this.submitted = true;
          let searchInput = value.toLowerCase();
          const filterData = this.casesByCountries.filter(countries => {
            // console.log(countries.country.toLowerCase().includes(searchInput), searchInput);
            return countries.country.toLowerCase().includes(searchInput);
          });
          if(filterData.length > 0){
         
            console.log('Matched', filterData);
            this.casesByCountries = filterData;
            setTimeout(() => {
              this.submitted = false; 
            }, 1000);
          }else{
            // no search found
          
            console.log('No Match', filterData);
            setTimeout(() => {
              this.noSearchMatch = true;
              this.submitted = false; 
            }, 1000);
          }
        }
      }  


// GET GLOBAL CASES
  getGlobal(){
    this.apiService.getGlobal().subscribe(res =>{
console.log(res);
this.cases = res.cases;
this.deaths = res.deaths;
this.recovered = res.recovered;
    },
    err =>{
console.log(err);
    }
    )
    
  }

  // GET CASES BY COUNTRIES
  getCountries(){
    this.getingCoutries = true;
    this.apiService.getCountries().subscribe(
      res => {
        console.log('case bt country', res);
        this.casesByCountries = res;
        this.getingCoutries = false;
      },
      err =>{
        console.log('Error get case by country', err);
        setTimeout( () =>{
          this.getingCoutries = false;
        }, 3000);
       
        this.getingCoutriesErr = 'An error occured.. Are you offline?';
      }
    )
  }


  // 
 
  // GET COUNTRY FLAG
 getCountry(country){
   if(getCode(country) !== undefined){
     let countryCode =  getCode(country);
     return  `https://www.countryflags.io/${countryCode}/flat/64.png`;
   }
   else{
return  `https://www.countryflags.io/${this.missingCountries[country]}/flat/64.png`;
   }

  }

  // 
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 1200) {
      this.headerFullWidth = true;
    } 
   else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
    this.headerFullWidth = false;
    }
}

openDialog(): void {
  let message  = {
    p1 : 'Please stay at home to prevent the spread of this deadly virus.',
    p2: 'Come here to get the latest and accurate updates.'

  } 
  const  dialogRef = this.dialog.open(SharedDialogComponent, {  
    //  width: '300px',
     data:{message: message},
  });

  dialogRef.afterClosed().subscribe(result => {
   if(result) {
    console.log(result);
    // this.sharedService.openSnackBar('Logging Out.. Bye!!', '', 3000, '');
    // localStorage.removeItem('XXX_CHAT_PLUS');
// this.router.navigate(['/auth/login']);
    // setTimeout( ()=>{

    // }, 3000);
  }
 });
 }

 comingSoon(): void {
  let message  = {
    p1 : 'Coming soon!!',
  } 
  const  dialogRef = this.dialog.open(SharedDialogComponent, {  
     width: '300px',
     data:{message: message},
  });
  dialogRef.afterClosed().subscribe(result => {
 
 });
 }

  ngOnInit() {
    let con = 'USA';

    console.log('Country',  this.getCountry(con));
   this.getGlobal(); 
   this.getCountries();
  
  }

}
