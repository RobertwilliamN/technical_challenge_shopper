import React, { useEffect, useState } from "react";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Importando o hook para navegação

const History: React.FC = () => {
  const [customerId, setCustomerId] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("");
  const [drivers, setDrivers] = useState<any[]>([]);
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Usar o hook useNavigate para navegar para outra página
  const navigate = useNavigate();

  // Função para buscar histórico com ou sem filtro de motorista
  const fetchHistory = async () => {
    if (!customerId.trim()) {
      alert("Customer ID cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      // Monta a query string para o filtro
      const query = driverId ? `?driver_id=${driverId}` : "";

      // Requisição à API com o customerId e o driverId (se presente)
      const response = await api.get(`/ride/${customerId}${query}`);

      // Atualiza os dados das corridas
      const ridesData = response.data.rides;
      setRides(ridesData);

      // Atualiza os motoristas na lista suspensa apenas ao buscar pelo customer_id
      if (!driverId) {
        const uniqueDrivers = Array.from(
          new Map(
            ridesData.map((ride: any) => [ride.driver.id, ride.driver])
          ).values()
        );
        setDrivers(uniqueDrivers);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      alert("Failed to fetch ride history.");
    } finally {
      setLoading(false);
    }
  };

  // Submit para buscar os dados com o filtro aplicado
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHistory();
  };

  // Função para redirecionar para a tela de nova corrida
  const handleNewRideClick = () => {
    navigate("/"); // Redireciona para a rota "/"
  };

  return (
    <div className="container mt-5">
      {/* Botão para nova corrida */}
      <div className="text-center mb-4">
        <button onClick={handleNewRideClick} className="btn btn-success">
          Realizar Nova Corrida
        </button>
      </div>

      <h1 className="text-center mb-4">Histórico De Corridas</h1>

      {/* Filtros */}
      <form onSubmit={handleFilterSubmit} className="mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <label htmlFor="customerId" className="form-label">
              Customer ID
            </label>
            <input
              type="text"
              id="customerId"
              className="form-control"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Enter customer ID"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="driverId" className="form-label">
              Motorista
            </label>
            <select
              id="driverId"
              className="form-select"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
            >
              <option value="">Show All</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">&nbsp;</label>
            <button type="submit" className="btn btn-primary w-100">
              Aplicar Filtro
            </button>
          </div>
        </div>
      </form>

      {/* Loading */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Lista de Corridas */}
      <div className="row">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <div className="col-md-4 mb-4" key={ride.id}>
              <div className="card shadow-lg border-0">
                <div className="card-header bg-primary text-white text-center">
                  <h5 className="mb-0">Data da Viagem: {ride.date}</h5>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Motorista:</strong> {ride.driver.name}
                  </p>
                  <p>
                    <strong>Origem:</strong> {ride.origin}
                  </p>
                  <p>
                    <strong>Destino:</strong> {ride.destination}
                  </p>
                  <p>
                    <strong>Distância:</strong> {ride.distance} km
                  </p>
                  <p>
                    <strong>Duração:</strong> {ride.duration} mins
                  </p>
                </div>
                <div className="card-footer text-muted text-center">
                  <strong>Valor:</strong> ${ride.value}
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <div className="col-12">
              <p className="text-center">No rides found for this customer.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default History;
