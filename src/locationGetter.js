import LocationInputDialog from './locationInputDialog';

export default class LocationGetter {
  constructor() {
    this.dialog = new LocationInputDialog('.locationInputDialog');
  }

  getLocation(onSuccess) {
    navigator.geolocation.getCurrentPosition(
      (position) => onSuccess(`[${position.coords.latitude}, ${position.coords.longitude}]`),
      () => this.dialog.showDialog(onSuccess),
    );
  }
}
