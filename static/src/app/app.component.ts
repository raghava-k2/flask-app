import { Component, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faSearch=faSearch;
  @ViewChild('places', { static: true }) places: GooglePlaceDirective;

  public onChange(address: any) {
    if (address.photos && address.photos.length > 0) {
      console.dir(address.photos[0].getUrl({ maxHeight: 500, maxWidth: 500 }));
    }
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON());
    console.log(address.geometry.viewport.getNorthEast());
  }
}
