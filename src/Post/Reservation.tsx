import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Typography,
} from "@mui/material";
import { useAuth } from "../App";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";

type ReservationProps = {
  postId: number;
  price: number;
};

type UserInfoType = {
  firstName: string;
  lastName: string;
  address: string;
  postCode: string;
  city: string;
  phoneNumber: string;
  birthDate: Date;
  about: string;
  id: number;
  userInfo: UserInfo;
};

type UserInfo = {
  profileImage: string;
  firstName: string;
  lastName: string;
  address: string;
  postCode: string;
  city: string;
  phoneNumber: string;
  birthDate: Date;
  about: string;
};

type DisabledDateRange = {
  fromDate: Date;
  toDate: Date;
};

export default function Reservation({ postId, price }: ReservationProps) {
  const [open, setOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [priceState, setPriceState] = useState<number | null>(price);
  const { sessionInfo } = useAuth();
  const token = localStorage.getItem("token");
  const userId = sessionInfo?.id;
  const [disabledDates, setDisabledDates] = useState<DisabledDateRange[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reservationMessage, setReservationMessage] = useState("");

  const fetchReservedDates = async () => {
    try {
      const response = await fetch(
        `https://borro.azurewebsites.net/api/Reservation/availability/${postId}`,
      );
      if (response.ok) {
        const dates = await response.json();
        const disabled = dates.map(
          (d: {
            dateFrom: string | number | Date;
            dateTo: string | number | Date;
          }) => ({
            fromDate: new Date(d.dateFrom),
            toDate: new Date(d.dateTo),
          }),
        );
        setDisabledDates(disabled);
      }
    } catch (error) {
      console.error("Error fetching reserved dates:", error);
    }
  };

  const handleOpen = async () => {
    if (!token || !sessionInfo) {
      navigate("/login");
      return;
    }
    setOpen(true);
    fetchReservedDates();
    if (!user) {
      try {
        if (!token) {
          console.log("Please log in to make a reservation.");
          return;
        }
        const response = await fetch(
          `https://borro.azurewebsites.net/api/User/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionInfo?.accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Fetching user failed", error);
      }
    }
  };

  const isDateDisabled = (date: Date) => {
    return disabledDates.some(
      (disabledDate) =>
        date >= disabledDate.fromDate && date <= disabledDate.toDate,
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleReserve = async () => {
    const token = localStorage.getItem("token");
    if (dateFrom && dateTo) {
      if (
        isDateDisabled(new Date(dateFrom)) ||
        isDateDisabled(new Date(dateTo))
      ) {
        console.error("Selected dates are not available.");
        return;
      } else {
        try {
          const response = await fetch(
            `https://borro.azurewebsites.net/api/Reservation`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                userId: user?.id,
                postId: postId,
                dateFrom: new Date(dateFrom).toISOString(),
                dateTo: new Date(dateTo).toISOString(),
                price: priceState,
                status: 1,
              }),
            },
          );

          if (response.ok) {
            handleClose();
            const dateObj = new Date(dateTo);
            const formattedDateTo =
              dateObj instanceof Date && !isNaN(dateObj.getTime())
                ? format(dateObj, "dd.MM.yyyy")
                : "";
            setReservationMessage(
              `Takk for din reservasjon, husk å gi tilbake utstyret senest ${formattedDateTo}.`,
            );
            setShowModal(true);
          } else {
            const errorData = await response.json();
            console.error("Reservation error:", errorData);
          }
        } catch (error) {
          console.error("Network error:", error);
        }
      }
    } else {
      console.error("Please select both start and end dates.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{
          backgroundColor: "#D5B263",
          color: "white",
          fontSize: "1.5rem",
          width: "100%",
          textAlign: "center",
        }}
      >
        Reserver
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Velg periode du ønsker å reservere</DialogTitle>
        <DialogContent>
          <MobileDatePicker
            label="Fra dato"
            onChange={(dayJs) => setDateFrom(dayJs?.toDate())}
            disablePast
            shouldDisableDate={(dayJSObject: Dayjs) =>
              isDateDisabled(dayJSObject.toDate())
            }
          />
          <MobileDatePicker
            label="Til dato"
            onChange={(dayJs) => setDateTo(dayJs?.toDate())}
            disablePast
            shouldDisableDate={(dayJSObject: Dayjs) =>
              isDateDisabled(dayJSObject.toDate())
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleReserve}
            style={{ backgroundColor: "#D5B263", color: "white" }}
          >
            Reserver
          </Button>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "#D5B263", color: "white" }}
          >
            Avbryt
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="reservation-modal-title"
        aria-describedby="reservation-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="reservation-modal-title" variant="h6" component="h2">
            Reservasjon bekreftet
          </Typography>
          <Typography id="reservation-modal-description" sx={{ mt: 2 }}>
            {reservationMessage}
          </Typography>
          <Button onClick={handleCloseModal}>Lukk</Button>
        </Box>
      </Modal>
    </Box>
  );
}
