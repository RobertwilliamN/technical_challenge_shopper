export interface Driver {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: Review;
    ratePerKm: number;
    minKm: number;
  }
  
  export interface Review {
    rating: number;
    comment: string;
  }
  
  export interface EstimateRideRequestBody {
    customer_id: string;
    origin: string;
    destination: string;
  }
  
  export interface DriverOption {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: Review;
    value: number;
  }
  
  export interface GoogleMapsRoute {
    routes: Array<{
      legs: Array<{
        start_address: string;
        end_address: string;
        distance: { value: number };
        duration: { text: string };
      }>;
    }>;
  }
  
  export interface EstimateRideResponse {
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    options: DriverOption[];
    routeResponse: GoogleMapsRoute;  
  }

  // Tipagem do Request Confirm
export interface ConfirmRideRequestBody {
    customer_id: string;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
        id: number;
        name: string;
    };
    value: number;
}
  
