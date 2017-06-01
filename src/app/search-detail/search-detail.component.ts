import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VideosService } from '../videos/videos.service';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css'],
  providers: [VideosService]
})
export class SearchDetailComponent implements OnInit, OnDestroy {
   private routeSub:any;
   private req: any;
   query: string;
   videoList: [any];

   

  constructor(private route: ActivatedRoute, private _video:VideosService) { }

  ngOnInit() {
      this.routeSub = this.route.params.subscribe(params=>{
          this.query = params['q']
           this.req = this._video.search(this.query).subscribe(data=>{
              this.videoList = data as [any];
            })
      })
  }

  ngOnDestroy(){
      this.routeSub.unsubscribe()
      this.req.unsubscribe()
  }

  getEmbedUrl(item){
    return 'https://www.youtube.com/embed/' + item.embed + '?ecver=2'
  }

}
