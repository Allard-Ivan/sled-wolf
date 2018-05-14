import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';

@Component({
  selector: 'image-station',
  templateUrl: './image-station.component.html',
  styleUrls: [
    'image-station.component.scss'
  ]
})
export class ImageStationComponent implements OnInit {
  
 	items: GalleryItem[];
  
  searchTxt: string;

  constructor(
    private routeInfo: ActivatedRoute,
  ) {
  }

  ngOnInit() {
		const imageData = [
      {
				srcUrl: 'http://yodobi.com/4k-Wallpapers/4k-wallpapers-phone-Is-4K-Wallpaper.jpg',
				previewUrl: 'http://yodobi.com/4k-Wallpapers/4k-wallpapers-phone-Is-4K-Wallpaper.jpg'
			},
      {
				srcUrl: 'https://wallpaperstudio10.com/static/wpdb/wallpapers/3840x2160/030736.jpg',
				previewUrl: 'https://wallpaperstudio10.com/static/wpdb/wallpapers/3840x2160/030736.jpg'
			}
			// ... more items
		];
		const imagePrefix = 'assets/images/cook/';
		for (let i = 1; i < 12; i++)
		{
			let imageUrl = imagePrefix + 'cook' + i + '.jpg';
			let data = {srcUrl: imageUrl, previewUrl: imageUrl};
			imageData.push(data);
		}
		
		this.routeInfo.params.subscribe((params: Params) => {
			this.searchTxt = params['search'];
			this.items = imageData.map(item => new ImageItem(item.srcUrl, item.previewUrl));
    });
  }

}
