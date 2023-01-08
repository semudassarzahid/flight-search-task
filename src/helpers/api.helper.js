import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getAirports = async (search) => {
    try {
        return await api.get(`/airport/${search}/keyword`);
    } catch (error) {
        console.log(error);
    }
}

export const getTrips = async (from, to, departureDate, page = 1) => {
    try {
        return await api.get(`/trip/search?departureAirportId=${from}&arrivalAirportId=${to}&pageSize=20&pageNumber=${page}`);
    } catch (error) {
        console.log(error);
    }
}