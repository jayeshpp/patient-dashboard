import { Col, Row } from "react-bootstrap"
import { IPatientDetails } from "./PatientTypes"

//TODO: these functions can be move to global scope for scalability
function getFullName(firstName: string, lastName: string) {
  const nameArray = [firstName, lastName]
  return nameArray.join(' ')
}

function PatientCard({firstName, lastName, nhsNumber, vaccineType}:IPatientDetails) {
  return (
    <div className={`p-3 bg-white mb-2`} data-testid='patient-card'>
      <Row>
        <Col xs={12} sm={4} className='mb-xs-2'><span className='d-block d-sm-none label-text'>Name </span>{getFullName(firstName, lastName)}</Col>
        <Col xs={6} sm={4}><span className='d-block d-sm-none label-text'>NHS Number </span>{nhsNumber}</Col>
        <Col xs={6} sm={4} className='text-sm-end'><span className='d-block d-sm-none label-text'>Vaccine Type </span>{vaccineType}</Col>
      </Row>
    </div>
  )
}

export default PatientCard
