import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { VideosService } from '../videos/videos.service'

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'] ,
  providers:[VideosService]
})
export class VideoDetailComponent implements OnInit, OnDestroy {
  
  private routeSub:any;
  slug: string;
  title = "Vedio Detail";
  video: any;
  req:any;


  constructor(private route: ActivatedRoute, private _video: VideosService) { }

  ngOnInit() {

   //  this.route.params.subscribe(function(params){
  	// 	console.log(params)
  	// })  	
    
    this.routeSub =	this.route.params.subscribe(params =>{
  		this.slug = params.slug ;
      this.req = this._video.get(this.slug) 
      .subscribe(data =>{
        this.video = data
        // data.json().filter(item =>{
        //    if(item.slug==this.slug){
        //       this.video = item
        //    //   console.log(item)
        //     }
        //   }
        // )
       
      })
  	})

  }

  ngOnDestroy(){
    	this.routeSub.unsubscribe()
      this.req.unsubscribe()
  }

}
