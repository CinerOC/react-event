import { FC } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { VIEW_TOGGLE_OPTIONS } from '../../const/const';

type ViewToggleProps = {
  viewMode: VIEW_TOGGLE_OPTIONS;
  onOptionChange: (newViewMode: VIEW_TOGGLE_OPTIONS) => void;
};

const ViewToggle: FC<ViewToggleProps> = ({ viewMode, onOptionChange }) => {
  const handleViewClick = (event: React.MouseEvent<HTMLElement>, newViewMode: VIEW_TOGGLE_OPTIONS | null) => {
    if (newViewMode) {
      onOptionChange(newViewMode);
    }
  };

  return (
    <ToggleButtonGroup size='small' value={viewMode} exclusive onChange={handleViewClick} aria-label='View mode'>
      <ToggleButton value='grid' aria-label='Grid view'>
        <GridOnIcon />
      </ToggleButton>
      <ToggleButton value='list' aria-label='List view'>
        <ListAltRoundedIcon />
      </ToggleButton>
      <ToggleButton value='map' aria-label='Map view'>
        <LocationOnIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggle;
