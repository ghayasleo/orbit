import { create } from 'zustand';

type LoanFilter = 'all' | 'lent' | 'borrowed';

interface LoanState {
  selectedLoanId: string | null;
  activeFilter: LoanFilter;
  isAddSheetOpen: boolean;
  setSelectedLoanId: (id: string | null) => void;
  setActiveFilter: (filter: LoanFilter) => void;
  setAddSheetOpen: (open: boolean) => void;
}

export const useLoanStore = create<LoanState>((set) => ({
  selectedLoanId: null,
  activeFilter: 'all',
  isAddSheetOpen: false,
  setSelectedLoanId: (id) => set({ selectedLoanId: id }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setAddSheetOpen: (open) => set({ isAddSheetOpen: open }),
}));
