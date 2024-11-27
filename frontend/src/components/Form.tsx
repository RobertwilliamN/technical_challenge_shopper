import React, { useState } from "react";
import { Button, Form as BootstrapForm, Container } from "react-bootstrap";

interface FormProps {
  onSubmit: (data: { customer_id: string; origin: string; destination: string }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [customer_id, setCustomerId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Evita recarregar a página
    onSubmit({ customer_id, origin, destination });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <BootstrapForm onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          <h2 className="text-center mb-4">Solicitar Corrida</h2>
          <BootstrapForm.Group className="mb-3" controlId="formCustomerId">
            <BootstrapForm.Label>Customer ID</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              value={customer_id}
              onChange={(e) => setCustomerId(e.target.value)}
              required
              placeholder="Digite o Customer ID"
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3" controlId="formOrigin">
            <BootstrapForm.Label>Origin</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              placeholder="Digite o local de origem"
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3" controlId="formDestination">
            <BootstrapForm.Label>Destination</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              placeholder="Digite o destino"
            />
          </BootstrapForm.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Solicitar Corrida
            </Button>
          </div>
        </BootstrapForm>
      </div>
    </Container>
  );
};

export default Form;
