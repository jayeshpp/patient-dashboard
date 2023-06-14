export interface IPatientDetails {
  firstName: string
  id?: string
  lastName: string
  nhsNumber: string
  vaccineDate?: number
  vaccineType: string
}

export interface PatientDetailsProps {
  search?: string
}