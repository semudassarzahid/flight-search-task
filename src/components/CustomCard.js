import React from 'react'
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';

const CustomCard = ({ trip, to, from }) => {
    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{
                    width: 151
                }}
                image="https://images.unsplash.com/photo-1559268950-2d7ceb2efa3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {trip.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    <FlightTakeoffOutlinedIcon sx={{ color: 'text.secondary' }} /> {from?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    <FlightLandOutlinedIcon sx={{ color: 'text.secondary' }} /> {to?.name}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}

export default CustomCard;