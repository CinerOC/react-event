import { HelpRequest } from './HelpRequest';

export interface HelpRequestData {
  helpRequestsList: HelpRequest[];
  isRequestsDataLoading: boolean;
  hasError: boolean;
  isСontributionPostingStatus: boolean;
};