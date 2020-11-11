import { Component, OnInit } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  spaceX:any;
  spaceXLaunchSuccessFilter:any;
  spaceXLaunchandLandFilter:any;
  list:any = [];
  dev_name: string="Soumik Maiti";
  launchYearList:any = [];
  launchYearListUnique:any = [];
  constructor( public http:HttpClient){
    
  }
  ngOnInit(){
    this.getSpaceXList();
  }
  getSpaceXList(){
    this.http.get('https://api.spaceXdata.com/v3/launches?limit=100').subscribe((response) =>{
      this.spaceX = response;
      this.myFunc();
    });
  }
  getSpaceXLaunchSuccessFilterList(){
    this.spaceX = "";
    this.http.get('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true').subscribe((response) =>{
      this.spaceX = response;
    });
  }
  getSpaceXLaunchandLandFilterList(){
    this.spaceX = "";
    this.http.get('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true').subscribe((response) =>{
      this.spaceX = response;
    });
  }
  myFunc(){
    console.log(this.spaceX);
    this.list= this.spaceX;
    this.list.forEach((v:any,k:any)=>{
      this.launchYearList.push(this.list[k].launch_year);
    });
     this.launchYearListUnique = [...new Set(...[this.launchYearList])];
     console.log(this.launchYearListUnique);
  }
  getYear(year:number){
    this.list = [];
    this.spaceX.forEach((v:any,k:any)=>{
      if(this.spaceX[k].launch_year === year){
        this.list.push(this.spaceX[k]);
      }
    });
  }
  getSuccessfulLauchValue(successfulLaunch:any){
    console.log(successfulLaunch);
    this.list = [];
    if(successfulLaunch == 'T'){
      this.spaceX.forEach((v:any,k:any)=>{
        if(this.spaceX[k].launch_success){
          this.list.push(this.spaceX[k]);
        }
      });
    } else {
      this.spaceX.forEach((v:any,k:any)=>{
        if(!this.spaceX[k].launch_success){
          this.list.push(this.spaceX[k]);
        }
      });
    }
  }
  getSuccessfulLandingValue(successfulLanding:any){
    console.log(this.spaceX);
    this.list = [];
    if(successfulLanding){
      this.spaceX.forEach((v:any,k:any)=>{
        if(this.spaceX[k].launch_landing){
          this.list.push(this.spaceX[k]);
        }
      });
    } else {
      this.spaceX.forEach((v:any,k:any)=>{
        if(!this.spaceX[k].launch_landing){
          this.list.push(this.spaceX[k]);
        }
      });
    }
  }
}
