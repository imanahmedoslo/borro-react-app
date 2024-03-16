import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../App";
import { useEffect, useState } from "react";

export type Reservation = {
  dateFrom: string;
  dateTo: string;
  status: number;
  price: number;
  userId: number;
  postId: number;
};

export function ReservationConfirmation() {
  const { reservationId } = useParams();
  const { sessionInfo } = useAuth();
  const [reservation, setReservation] = useState<Reservation | null>(null);

  const [error, setError] = useState("");
  console.log("reservationId: ", reservationId);

  useEffect(() => {
    fetchReservation();
  }, [reservationId, reservation]);

  async function fetchReservation() {
    try {
      const response = await fetch(
        `https://borro.azurewebsites.net/api/Reservation/${reservationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionInfo?.accessToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setReservation(data);
        console.log(reservationId);
      } else {
        setError(`Failed to fetch reservation: ${response.status}`);
      }
    } catch (error) {
      setError(`Error fetching reservation: ${error}`);
    }
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!reservation) {
    return <Typography>Loading reservation...</Typography>;
  }

  return (
    <>
      <Typography variant="h4">Reservation Confirmation</Typography>
      <Typography>Date From: {reservation.dateFrom}</Typography>
      <Typography>Date To: {reservation.dateTo}</Typography>
      <Typography>Price: {reservation.price}</Typography>
      {/* Add more details as needed */}
    </>
  );
}
