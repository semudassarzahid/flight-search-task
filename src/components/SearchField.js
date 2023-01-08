import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import { getAirports } from '../helpers/api.helper';

const autocompleteService = { current: null };

const SearchField = ({ label, set }) => {
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    const fetch = React.useMemo(
        () =>
            debounce(async (request, callback) => {
                let response = await getAirports(request);
                callback(response)

            }, 400),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        if (inputValue.length < 3) {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch(inputValue, (response) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (response) {
                    console.log('response recieved', response)
                    newOptions = [...newOptions, ...response.data.result];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            id={label}
            sx={{ width: 300 }}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No airport"
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                set(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label={label} fullWidth />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <AirplanemodeActiveIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                <Box
                                    component="span"
                                    sx={{ fontWeight: 'regular' }}
                                >
                                    {option.name}
                                </Box>

                                <Typography variant="body2" color="text.secondary">
                                    {option.fullName}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}

export default SearchField;