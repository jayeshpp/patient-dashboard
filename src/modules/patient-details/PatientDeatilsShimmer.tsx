import { Col, Row } from "react-bootstrap";

function PatientCardShimmer() {
  return (
    <div className={`p-3 bg-white mb-2`}>
      <Row>
        <Col xs={12} sm={4} className="mb-xs-2">
          <p className="placeholder-glow m-0">
            <span className="placeholder bg-secondary col-7"></span>
          </p>
        </Col>
        <Col xs={6} sm={4}>
          <p className="placeholder-glow m-0">
            <span className="placeholder bg-secondary col-7"></span>
          </p>
        </Col>
        <Col xs={6} sm={4}>
          <p className="placeholder-glow m-0">
            <span className="placeholder bg-secondary col-7"></span>
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default function PatientDetailsShimmer() {
  return <>{Array.from(Array(10).keys()).map((_, index) => (
    <PatientCardShimmer key={index} />
  ))}</>;
}
