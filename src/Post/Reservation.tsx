import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ReservationProps = {
  postId: number,
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

export function Reservation({ postId, userId }): React.FC<ReservationProps> {
    const [open, setOpen] = useState(false);
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');
    const [user, setUser] = useState<UserInfoType | null>(null);

    const fetchUser = async () => {
        try {
          console.log(`Fetching user info for ID: ${id}`);
          const response = await fetch(`https://borro.azurewebsites.net/api/User/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const userData = await response.json();
          setUser(userData);
          console.log("userData: ", userData)
        } catch (error) {
          console.error("Fetching user failed", error);
          navigate('/error');
        }
      };

      useEffect(() => {
        if (userId) {
          fetchUser();
        }
      }, [userId]);
  
    const handleOpen = () => {
      setOpen(true);
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
              userId: userId, // Use the context or state where the user's ID is stored
              postId: postId,
              dateFrom: new Date(dateFrom),
              dateTo: new Date(dateTo),
              // Include other fields as required by your backend
            }),
          });
  
          if (response.ok) {
            // Handle successful reservation
            handleClose();
          } else {
            // Handle error in reservation
            const errorData = await response.json();
            console.error('Reservation error:', errorData);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      } else {
        // Handle validation error (dates not selected)
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
                label="Date From"
                type="date"
                fullWidth
                onChange={(event) => setDateFrom(new Date(event.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                id="dateTo"
                label="Date To"
                type="date"
                fullWidth
                onChange={(event) => setDateTo(new Date(event.target.value))}
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