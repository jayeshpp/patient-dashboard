import { Container } from "react-bootstrap";

interface ErrorProps {
  message: string
}

function Error({message}:ErrorProps) {
  return <Container role='error-page' fluid className='p-3 bg-white'>Error: {message}</Container>;
}

export default Error