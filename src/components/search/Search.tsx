import { Col, Container, Form, Row } from "react-bootstrap";
import styles from "./Search.module.css";

interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  ariaLabel: string;
  labelText: string;
  id: string;
  name: string;
}

function Search({ ariaLabel, labelText, id, ...props }: SearchProps) {
  return (
    <Container
      fluid
      className={`p-3 position-sticky sticky-top bg-white ${styles["search-block"]}`}
    >
      <Row>
        <Col xs={12} lg={4}>
          <Form>
            <Form.Group controlId={id}>
              <Form.Label>{labelText}</Form.Label>
              <Form.Control
                type="text"
                className="w-100"
                aria-label={ariaLabel}
                {...props}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
