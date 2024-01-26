import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
type ReservationProps = {
  postId: number,
  price: number,
};

type UserInfoType = {
    firstName: string,
    lastName: string,
    address: string,
    postCode: string,
    city: string,
    phoneNumber: string,
    birthDate: Date;
    about: string,
    id: number,
    userInfo: UserInfo
  };
  
  type UserInfo = {
    profileImage: string,
    firstName: string,
    lastName: string,
    address: string,
    postCode: string,
    city: string,
    phoneNumber: string,
    birthDate: Date;
    about: string,
  }

export default function Reservation({ postId }: ReservationProps) {
    const [open, setOpen] = useState(false);
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');
    const [user, setUser] = useState<UserInfoType | null>(null);
    const [price, setPrice] = useState<ReservationProps | null>(null);
    const {sessionInfo} = useAuth();
    const token = localStorage.getItem('token');
    const userId = sessionInfo?.id;
  
     const handleOpen = async () => {
      setOpen(true);
      if(!user){
      try{
            if (!token) {
                console.log("Please log in to make a reservation.");
                return;
            }
            const response = await fetch(`https://borro.azurewebsites.net/api/User/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

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
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleReserve = async () => {
      if (dateFrom && dateTo) {
        try {
          const response = await fetch(`https://borro.azurewebsites.net/api/Reservation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user?.id,
              postId: postId,
              dateFrom: new Date(dateFrom).toISOString(),
              dateTo: new Date(dateTo).toISOString(),
              price: price,
            }),
          });
  
          if (response.ok) {
            handleClose();
          } else {
            const errorData = await response.json();
            console.error('Reservation error:', errorData);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      } else {
        console.error('Please select both start and end dates.');
      }
    };
  
    return (
        <div>
          <Button variant="contained" onClick={handleOpen}>
            Reserver
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Reserver denne</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Velg dato du ønsker å reservere.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="dateFrom"
                label="Fra dato"
                type="date"
                fullWidth
                onChange={(event) => setDateFrom(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                id="dateTo"
                label="Til dato"
                type="date"
                fullWidth
                onChange={(event) => setDateTo(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleReserve}>Reserver</Button>
                <Button onClick={handleClose}>Avbryt</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    };