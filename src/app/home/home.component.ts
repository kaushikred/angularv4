import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Http}  from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
	homeImageList = [];
	req : any;

  constructor(private http:Http,private router:Router) { }

  ngOnInit() {
   this.req =	this.http.get('assets/data/video.json')
   .subscribe(data=>{
   	data.json().filter(item =>{
   		if(item.featured){
   			this.homeImageList.push(item)
   		}
   	})
   })

  }

  ngOnDestroy(){
  	this.req.unsubscribe();
  }
  
  preventNormal(event:MouseEvent, image:any){
  	if(!image.prevented){
  		event.preventDefault()
  		// image.link = "/videos";
  		// console.log(image)
  		// image.prevented = true;
  		this.router.navigate(['./videos'])
  	}

  }


}
