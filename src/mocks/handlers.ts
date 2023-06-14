import { rest } from "msw";
import { IPatientDetails } from "../modules/patient-details/PatientTypes";
import {patientData} from "./mockData";
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const handlers = [
  rest.get(`${BASE_URL}/patients`, (req, res, ctx) => {
    return res(
      ctx.json<IPatientDetails[]>(patientData));
  })
]
