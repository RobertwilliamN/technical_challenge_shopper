import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import api from "../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

interface RideOption {
  id: number;
  name?: string;
  description?: string;
  vehicle?: string;
  review?: {
    rating: number;
    comment: string;
  };
  value?: number;
}

interface RideResponse {
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  options: RideOption[];
  routeResponse: {
    routes: Array<{
      bounds: {
        northeast: { lat: number; lng: number };
        southwest: { lat: number; lng: number };
      };
      copyrights: string;
      legs: Array<{
        distance: {
          text: string;
          value: number;
        };
        duration: {
          text: string;
          value: number;
        };
        end_address: string;
        end_location: { lat: number; lng: number };
        start_address: string;
        start_location: { lat: number; lng: number };
        steps: Array<any>;
      }>;
    }>;
  };
}

const RequestRide: React.FC = () => {
  const [options, setOptions] = useState<RideOption[]>([]);
  const [route, setRoute] = useState<any>(null);
  const [rideDetails, setRideDetails] = useState<RideResponse | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(true);  // State to toggle form visibility
  const navigate = useNavigate();

  const handleFormSubmit = async (data: { customer_id: string; origin: string; destination: string }) => {
    try {
      setCustomerId(data.customer_id);
      const response = await api.post("/ride/estimate", data);

      if (
        !response.data || 
        !response.data.options || 
        !response.data.routeResponse || 
        !response.data.routeResponse.routes
      ) {
        throw new Error("Missing necessary data in the API response.");
      }

      setRideDetails(response.data);
      setOptions(response.data.options);
      setRoute(response.data.routeResponse.routes[0].legs[0]);
      setIsFormVisible(false);  // Hide the form after submission
    } catch (error) {
      console.error("Error estimating ride:", error);
    }
  };

  const handleChooseDriver = async (driverId: number) => {
    if (!rideDetails) return;

    const selectedOption = options.find((opt) => opt.id === driverId);
    if (!selectedOption) {
      alert("Driver not found.");
      return;
    }

    const confirmationData = {
      customer_id: customerId,
      origin: rideDetails.origin,
      destination: rideDetails.destination,
      distance: rideDetails.distance,
      duration: rideDetails.duration,
      driver: {
        id: driverId,
        name: selectedOption.name,
      },
      value: selectedOption.value,
    };

    try {
      const response = await api.patch("/ride/confirm", confirmationData);
      console.log("Ride confirmed:", response.data);
      navigate('/history/');
    } catch (error) {
      console.error("Error confirming ride:", error);
      alert("Failed to confirm ride. Please try again.");
    }
  };

  const sortedOptions = [...options].sort((a, b) => (a.value || 0) - (b.value || 0));

  useEffect(() => {
    if (rideDetails) {
      setOptions(rideDetails.options);
    }
  }, [rideDetails]);

  return (
    <Container className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Form will be hidden once it's submitted */}
          {isFormVisible && <Form onSubmit={handleFormSubmit} />}

          {rideDetails && (
            <div className="mt-2 text-center">
              <h4><strong>Origem: </strong>{rideDetails.origin}</h4> 
              <h4><strong>Destino: </strong> {rideDetails.destination}</h4> 
    
              {route && (
                <div className="mb-4 text-center">
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?size=800x400&markers=color:red|${route.start_location.lat},${route.start_location.lng}&markers=color:blue|${route.end_location.lat},${route.end_location.lng}&path=weight:3|color:0x0000ff|${route.start_location.lat},${route.start_location.lng}|${route.end_location.lat},${route.end_location.lng}&key=AIzaSyDwpKmmDbU0nTz3QauE9iW1xBSqK_TSbg0`}
                    alt="Route Map"
                    className="img-fluid"
                  />
                </div>
              )}
            </div>
          )}

          {sortedOptions.length > 0 && (
            <div className="mt-5 text-center">
              <h2>Opções de Corridas</h2>
              <Row className="justify-content-center">
                {sortedOptions.map((option) => (
                  <Col key={option.id} sm={12} md={6} lg={12} className="mb-5">
                    <Card className="w-100">
                      <Card.Body>
                        <Card.Title className="text-dark font-weight-bold">{option.name || "N/A"}</Card.Title>
                        <Card.Subtitle className="mb-4 text-muted">{option.vehicle || "N/A"}</Card.Subtitle>
                        <Card.Text>
                          <strong>Descrição:</strong> {option.description || "N/A"}
                          <br />
                          <strong>Avaliação:</strong>{" "}
                          {option.review ? (
                            <>
                              <span> <strong>Pontuação:</strong> {option.review.rating}</span>
                              <br />
                              <span><strong>Comentário:</strong> {option.review.comment}</span>
                            </>
                          ) : (
                            "N/A"
                          )}
                          <br />
                          <strong>Valor:</strong> {option.value ? `$${option.value}` : "N/A"}
                        </Card.Text>
                        <Button
                          variant="primary"
                          className="w-100"
                          onClick={() => handleChooseDriver(option.id)}
                        >
                          Confirmar Corrida
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default RequestRide;
