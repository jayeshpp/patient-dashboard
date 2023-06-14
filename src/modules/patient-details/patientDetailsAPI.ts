import { stringify } from "../../utils/queryString";
import { PatientDetailsProps } from "./PatientTypes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

/* 
  TODO: fetch could be replaced with a fetch wrapper or with axios instance for reusability
*/
export function fetchPatientDetails(search?: PatientDetailsProps) {
  const qs = stringify({ search })
  let url = `${BASE_URL}/patients`
  if(search) url += qs
  const abortController = new AbortController();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((response) => {
        //the api is not standard hence checking if it is returning a valid array 
        if (Array.isArray(response)) {
          resolve({
            status: 200,
            message: 'success',
            data: response
          })
        } else {
          reject({
            status: 404,
            message: 'Not found'
          })
        }
      })
      .catch(error => {
        reject({
          status: 400,
          message: error.message
        })
      });
  });
}
