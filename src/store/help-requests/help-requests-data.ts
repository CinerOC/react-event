import { createSlice } from '@reduxjs/toolkit';
import { HelpRequestData } from '../../types/state';
import { fetchHelpRequestsAction, fetchСontributeToRequest } from '../api-actions';

const initialState: HelpRequestData = {
  helpRequestsList: [],
  isRequestsDataLoading: false,
  hasError: false,
  isСontributionPostingStatus: false
};

export const helpRequestData = createSlice({
  name: 'HELP_REQUEST',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHelpRequestsAction.pending, (state) => {
        state.isRequestsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchHelpRequestsAction.fulfilled, (state, action) => {
        state.helpRequestsList = action.payload;
        state.isRequestsDataLoading = false;
      })
      .addCase(fetchHelpRequestsAction.rejected, (state, action) => {
        state.isRequestsDataLoading = false;
        if (action.error.message === '500') state.hasError = true;
      })
      .addCase(fetchСontributeToRequest.pending, (state) => {
        state.isСontributionPostingStatus = true;
      })
      .addCase(fetchСontributeToRequest.fulfilled, (state) => {
        state.isСontributionPostingStatus = false;
      })
      .addCase(fetchСontributeToRequest.rejected, (state) => {
        state.isСontributionPostingStatus = false;
      });
  },
});
