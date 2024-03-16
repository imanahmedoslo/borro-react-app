import { getGeocode } from "./Maps"; // assuming ILocation is defined in Maps.tsx

export async function calculateDistance(
  userAddress: string,
  postAddress: string,
): Promise<number> {
  // getGeocode seems to be defined in Maps.tsx.
  // You may want to move this function to this file or another common file so
  // it can be imported in Maps and here.
  const loc1 = await getGeocode(userAddress);
  const loc2 = await getGeocode(postAddress);

  const latLng1 = new window.google.maps.LatLng(loc1.lat, loc1.lng);
  const latLng2 = new window.google.maps.LatLng(loc2.lat, loc2.lng);

  const distanceInMeters =
    window.google.maps.geometry.spherical.computeDistanceBetween(
      latLng1,
      latLng2,
    );
  const distanceInKm = parseFloat((distanceInMeters / 1000).toFixed(2));

  return distanceInKm;
}
