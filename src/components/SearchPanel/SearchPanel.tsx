import { FC, useCallback, useEffect, useRef, useState } from 'react';
// utils
import { debouncedFunction } from '../../utils/filterUtils';
// styles
import { Box, InputBase, Paper, Stack, Typography } from '@mui/material';
import { useMode } from '../../theme';
import SearchIcon from '@mui/icons-material/Search';

type SearchProps = {
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
};

const SearchPanel: FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [theme] = useMode();

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, [setSearchTerm]);

  const debouncedSearch = useRef<(value: string) => void>(debouncedFunction(handleSearch, 250));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedSearch.current?.(newValue);
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  return (
    <Paper sx={{
      width: '100%'
    }}>
      <Stack 
        sx={{ 
          backgroundColor: 'white',
          gap: '2rem',
          padding: '2rem',
          mb: '1.6rem',
          [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
            padding: '1.6rem',
            mb: '0'
          }
        }}
      >
        <Typography 
          variant='h6'
          width='fit-content'
          sx={{
            display: 'flex',
            width: 'fit-content',
            [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
              display: 'none',
            }
          }}
        >
          Найти запрос
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid gray' }}>
          <SearchIcon sx={{ position: 'absolute', color: 'gray'}} />
          <InputBase
            placeholder="Введите название задачи или организации"
            value={inputValue}
            onChange={handleInputChange}
            sx={{
              width: '100%',
              fontSize: '1.6rem',
              paddingLeft: '2.5rem',
              [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                fontSize: '1.4rem'
              }
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default SearchPanel;