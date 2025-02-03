import React, { useState } from 'react';
// components
import Filters from '../../components/Filters/Filters';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import HelpRequestsComponent from '../../components/HelpRequestsComponent/HelpRequestsComponent';
import FilterButton from '../../components/Filters/FilterButton';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
// styles
import { Box, Typography, Grid2, Paper} from '@mui/material';
import { useMode } from '../../theme';
// hooks
import { useUserHelpRequests } from '../../hooks/useUserHelpRequests';
import { useFilters } from '../../hooks/useFilters';
import useResponsiveItemsPerPage from '../../hooks/useResponsiveItemsPerPage';

const HelpDesk: React.FC = () => {
  const { helpRequestsList, hasHelpRequests, isHelpRequestsLoading, isHelpRequestsError, isFavouriteRequestsError } = useUserHelpRequests();

  const {
    selectedOptions,
    selectedDate,
    searchTerm,
    currentPage,
    filteredData,
    setSearchTerm,
    setSelectedOptions,
    setCurrentPage,
    setSelectedDate
  } = useFilters({ helpRequestsList });

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [theme] = useMode();
  const itemsPerPage = useResponsiveItemsPerPage()

  const dataToDisplay = filteredData ? filteredData : helpRequestsList;
  const noSearchResult = hasHelpRequests && filteredData.length === 0;
  const [isResetFilters, setIsResetFilters] = useState(false); // TODO: проверить

  const renderHelpRequestsComponent = () => {
    return (
      <HelpRequestsComponent
        helpRequests={dataToDisplay}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isHelpRequestsError={isHelpRequestsError}
        noSearchResult={noSearchResult}
        isLoading={isHelpRequestsLoading}
        customItemsPerPage={itemsPerPage}
        isResetFilters={isResetFilters}
        setIsResetFilters={setIsResetFilters}
        isFavouriteRequestsError={isFavouriteRequestsError}
      />
    );
  };

  const handleOpenFilterModal = () => { //TODO: прикрутить кнопку модалки
    setOpenFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
  };
  
  return (
    <Paper
      sx={{
        padding: '3rem 4rem',
        background: theme.palette.background.default,
        width: '100%',
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          padding: '2rem 2rem',
        },
      }}
    >
      <Box>
        <Typography variant="h4">Запросы о помощи</Typography>
        <Grid2 container columnSpacing={3} mt={'1.2rem'}>
          <Box sx={{
              display: 'flex',
              [`@media (min-width: ${theme.breakpoints.values.md}px) and (max-width: ${1560}px)`]: {
                width: '22.5%',
                minWidth: '240px',
              },
              [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                display: 'none',
              }
            }}>
              <Filters
                selectedOptions={selectedOptions}
                selectedDate={selectedDate}
                setSelectedOptions={setSelectedOptions}
                setIsResetFilters={setIsResetFilters} // TODO: проверить фильтры
                setSelectedDate={setSelectedDate}
              />
          </Box>
          <Grid2 container size={'grow'} flexDirection={'column'} gap={2}>
            <SearchPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Paper sx={{ minHeight: 'calc(57.35rem - 14.1rem - 1.6rem)', padding: '2rem 3rem' }}>
              {renderHelpRequestsComponent()}
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
      <ModalWindow
        openFilterModal={openFilterModal}
        handleCloseFilterModal={handleCloseFilterModal}
        slideDirection={'left'}
      >
        <Filters 
          selectedOptions={selectedOptions} 
          selectedDate={selectedDate}
          setSelectedOptions={setSelectedOptions} 
          setSelectedDate={setSelectedDate}
          setIsResetFilters={setIsResetFilters} // TODO: проверить фильтры
        />
      </ModalWindow>
    </Paper>
  );
};

export default HelpDesk;
