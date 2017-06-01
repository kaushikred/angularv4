import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideosService } from '../videos/videos.service'
   
@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  providers: [VideosService]
})
export class VideoListComponent implements OnInit, OnDestroy {

  //We are not using let keyword as we are declaring them here so they are taken as parameter of the class not variable of the class 
  title = "Video List";
  todayDate;
  private req:any;

//  videoList=["item1","item2","item3"]
  videoList : [any]
  constructor(private _video:VideosService) { }

  ngOnInit() {
  	this.todayDate = Date();
    this.req = this._video.list()
    .subscribe(data => {
      console.log(data)
      this.videoList = data as [any];
    })
  }

  ngOnDestroy(){
    this.req.unsubscribe()
  }

  getEmbedUrl(item){
  //	console.log(item)
    return 'https://www.youtube.com/embed/' + item.embed + '?ecver=2'
  }

}
