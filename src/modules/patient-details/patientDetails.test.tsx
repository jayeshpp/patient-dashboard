import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import PatientDetails from "./PatientDetails";
import { patientData } from '../../mocks/mockData';
import { server } from '../../mocks/server';
import { rest } from "msw";
const BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
* @vitest-environment jsdom
*/

describe("Patient Details Page", () => {
  it("Render patients details list", async () => {
    render(<PatientDetails />);
  
    const productCards = await waitFor(() => screen.getAllByTestId('patient-card'))
    patientData.forEach((patient) => {
      expect(screen.getByText([patient.firstName, patient.lastName].join(' '))).toBeInTheDocument()
    })
    expect(productCards).toHaveLength(5)
  });

  it("Render 404 page", async () => {
    server.use(
      rest.get(`${BASE_URL}/patients`, (req, res, ctx) => res(ctx.json("Not found")))
    )
    render(<PatientDetails />);
    const container = await waitFor(() => screen.getByRole("notfound-page"));
    expect(container).toBeInTheDocument()
  })

  it("Render Error page", async () => {
    server.use(
      rest.get(`${BASE_URL}/patients`, (req, res, ctx) => res(ctx.status(500)))
    )
    render(<PatientDetails />);
    const container = await waitFor(() => screen.getByRole("error-page"));
    expect(container).toBeInTheDocument()
  })

  it("Render Empty result page", async () => {
    server.use(
      rest.get(`${BASE_URL}/patients`, (req, res, ctx) => res(ctx.json([])))
    )
    render(<PatientDetails />);
    const container = await waitFor(() => screen.getByRole("empty-page"));
    expect(container).toBeInTheDocument()
  })

  it("Render search input value", async () => {
    render(<PatientDetails />);
    screen.debug()
    const input = screen.getByLabelText(/Search a patient/i)
    expect(input).toHaveValue('')
    await userEvent.type(input, 'pasta')
    expect(input).toHaveValue('pasta')
  })
})
