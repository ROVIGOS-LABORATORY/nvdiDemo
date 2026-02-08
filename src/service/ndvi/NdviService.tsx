import { API } from "../../enums/API";
import { METHOD } from "../../enums/METHOD";
import request from "../ApiClient";

/** *
 * LocationService
 * @description This service is responsible for managing locations.
 * @author [Benjamin]
 */
const getNdviPerPlace = async (place: string) => {
  return request({
    headers: {
      "Content-Type": "application/json",
    },
    url: `${API.BASE_URL}${API.NDVI}?location=${place}&year=2025`,
    method: METHOD.GET,
  });
};

const NdviService = {
  getNdviPerPlace,
};

export default NdviService;
