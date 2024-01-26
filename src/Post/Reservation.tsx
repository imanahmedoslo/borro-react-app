import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useAuth } from '../App';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';


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

  type DisabledDateRange = {
    fromDate: Date;
    toDate: Date;
};

export default function Reservation({ postId, price }: ReservationProps) {
    const [open, setOpen] = useState(false);
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');
    const [user, setUser] = useState<UserInfoType | null>(null);
    const [priceState, setPriceState] = useState<number | null>(price);
    const {sessionInfo} = useAuth();
    const token = localStorage.getItem('token');
    const userId = sessionInfo?.id;
    const [disabledDates, setDisabledDates] = useState<DisabledDateRange[]>([]);

    
    const fetchReservedDates = async () => {
        try {
            const response = await fetch(`https://borro.azurewebsites.net/api/Reservation/availability/${postId}`);
            if (response.ok) {
                const dates = await response.json();
                const disabled = dates.map(d => ({
                    fromDate: new Date(d.dateFrom),
                    toDate: new Date(d.dateTo),
                }));
                setDisabledDates(disabled);
            }
        } catch (error) {
            console.error("Error fetching reserved dates:", error);
        }
    };
  
     const handleOpen = async () => {
      setOpen(true);
      fetchReservedDates();
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

const isDateDisabled = (date: Date) => {
    console.log(date, disabledDates);
    return disabledDates.some(disabledDate => 
        date >= disabledDate.fromDate && date <= disabledDate.toDate
    );
};
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleReserve = async () => {
        const token = localStorage.getItem('token');
      if (dateFrom && dateTo) {
        if (isDateDisabled(new Date(dateFrom)) || isDateDisabled(new Date(dateTo))) {
            console.error('Selected dates are not available.');
            return;
         }else{
        try {
          const response = await fetch(`https://borro.azurewebsites.net/api/Reservation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId: user?.id,
                postId: postId,
                dateFrom: new Date(dateFrom).toISOString(),
                dateTo: new Date(dateTo).toISOString(),
                price: priceState,
                status: 1,
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
    }
      } else {
        console.error('Please select both start and end dates.');
      }
    };
  
    return (
        <div>
          <Button variant="contained" onClick={handleOpen} style={{backgroundColor:'#D5B263', color:'white'}}>
            Reserver
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Reserver denne</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Velg dato du ønsker å reservere.
              </DialogContentText>
              <MobileDatePicker onChange={(dayJs) => setDateFrom(dayJs?.toDate())} disablePast shouldDisableDate={(dayJSObject: Dayjs) => isDateDisabled(dayJSObject.toDate())} />
              <MobileDatePicker onChange={(dayJs) => setDateTo(dayJs?.toDate())} disablePast shouldDisableDate={(dayJSObject: Dayjs) => isDateDisabled(dayJSObject.toDate())} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleReserve} style={{backgroundColor:'#D5B263', color:'white'}}>Reserver</Button>
                <Button onClick={handleClose}style={{backgroundColor:'#D5B263', color:'white'}}>Avbryt</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    };