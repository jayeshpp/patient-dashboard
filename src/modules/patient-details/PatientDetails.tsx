import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { debounce, sortBy } from "lodash";
import { fetchPatientDetails } from "./patientDetailsAPI";
import PatientCard from "./PatientCard";
import { IPatientDetails } from "./PatientTypes";
import Search from "../../components/search";
import Empty from "../../components/empty";
import Page404 from "../../components/page404";
import PatientCardShimmer from "./PatientDeatilsShimmer";
import Sort from "../../components/sort";
import Error from "../../components/error";

function PatientDetailsHead() {
  return (
    <div className={`p-3 bg-white mb-2 d-xs-none`}>
      <Row>
        <Col xs={12} sm={4}>
          <span className="d-block label-text">Name</span>
        </Col>
        <Col xs={6} sm={4}>
          <span className="d-block label-text">NHS Number</span>
        </Col>
        <Col xs={6} sm={4} className='text-sm-end'>
          <span className="d-block label-text">Vaccine Type</span>
        </Col>
      </Row>
    </div>
  );
}

function PatientDetails() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [patientsData, setPatientsData] = useState<IPatientDetails[]>([]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchKeyword(value);
    if (value.length > 2) {
      debouncedSearch(value);
    } else if (value.length === 0) {
      debouncedSearch("");
    }
  }

  function handlError(error: { status: number, message: string }) {
    setStatus(error.status);
    setError(error.message)
  }

  const debouncedSearch = useCallback(
    debounce((keyword) => {
      fetchPatientDetails(keyword)
        .then((response: any) => {
          setPatientsData(response.data);
          setStatus(response.status);
        })
        .catch(handlError);
    }, 300),
    []
  );

  function onSort(type: string) {
    setSort(type)
    setLoading(true)
    setPatientsData(currentData => {
      if(type === 'asc') {
        return sortBy(currentData, 'lastName')
      }else if(type === 'desc') {
        return sortBy(currentData, 'lastName').reverse()
      }
    });
    setTimeout(()=>{
      setLoading(false)
    },10)
  }

  useEffect(() => {
    fetchPatientDetails()
      .then((response: any) => {
        setPatientsData(response.data);
        setStatus(response.status);
        setLoading(false);
      })
      .catch(handlError);
  }, []);

  if (status === 404) {
    return <Page404 />;
  }

  if(error !== '') return <Error message={error} />

  return (
    <>
      <Search
        onChange={onChange}
        value={searchKeyword}
        placeholder="eg: John"
        ariaLabel="Search by patients name"
        labelText="Search a patient"
        name="patient-search"
        id="patient-search"
      />
      <Container fluid className="p-3 ">
        <div className="d-flex justify-content-between align-items-center pb-2 search-block">
          <h1 className='m-0'>Patients List</h1>
          <div className="sort-block">
            <Sort
              onSelect={onSort}
              id="sort"
              labelText="Sort by name"
              ariaLabel="Sort name"
              selected={sort}
            />
          </div>
        </div>
        <PatientDetailsHead />
        {isLoading && <PatientCardShimmer />}
        {!patientsData.length && !isLoading && <Empty />}
        {patientsData?.map((patient) => (
          <PatientCard
            key={patient.id}
            firstName={patient.firstName}
            lastName={patient.lastName}
            nhsNumber={patient.nhsNumber}
            vaccineType={patient.vaccineType}
          />
        ))}
      </Container>
    </>
  );
}

export default PatientDetails;
