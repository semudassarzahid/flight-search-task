import './App.css';
import { Grid, TextField, Button, Box } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { getTrips } from './helpers/api.helper';
import { Container } from '@mui/system';
import SearchField from './components/SearchField';
import CustomCard from './components/CustomCard';

function App() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departureDate, setDepartureDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [trips, setTrips] = useState([]);
  const [page, setPage] = useState(1);

  const callGetTripsAction = async () => {
    if(!from){
      alert('Please select from airport')
      return
    }
    if(!to){
      alert('Please select to airport')
      return
    }
    const { data } = await getTrips(from.id, to.id, departureDate, page);
    setTrips(data.result.trips);
  }

  return (
    <Container md >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: 1,
          borderColor: 'grey.500',
          borderRadius: 5,
          m: 2,
          p: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={4}>
            <SearchField label="From" set={setFrom} />
          </Grid>
          <Grid item xs={4}>
            <SearchField label="To" set={setTo} />
          </Grid>
          <Grid item xs={2}>
            {/* Desktop Date Picker */}
            <TextField
              id="date"
              label="Departure Date"
              type="date"
              defaultValue="2021-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              value={departureDate}
              onChange={(event) => {
                setDepartureDate(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => callGetTripsAction()}>
              Search
            </Button>
          </Grid>
        </Grid >
      </Box>
      <Grid container spacing={3}>
        {trips.map((trip) => (
          <Grid  key={trip.id} item xs={12}>
            <CustomCard trip={trip} to={to} from={from} />
          </Grid>
        ))}
      </Grid>
    </Container >
  );
}

export default App;