import { create } from 'zustand';

export interface Devotee {
  fullName: string;
  phoneNumber: string;
  email?: string;
  gotra: string;
}

export interface PoojaDetails {
  poojaType: string;
  numberOfPersons: number;
  poojaDate: string;
  poojaTime: string;
  specialInstructions?: string;
}

export interface Participant {
  name: string;
  gotra: string;
}

interface BookingState {
  step: number;
  devotee: Devotee;
  pooja: PoojaDetails;
  participants: Participant[];
  setDevotee: (devotee: Devotee) => void;
  setPooja: (pooja: PoojaDetails) => void;
  setParticipants: (participants: Participant[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  devotee: { fullName: '', phoneNumber: '', email: '', gotra: '' },
  pooja: {
    poojaType: '',
    numberOfPersons: 1,
    poojaDate: '',
    poojaTime: '',
    specialInstructions: '',
  },
  participants: [] as Participant[],
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  setDevotee: (devotee) => set({ devotee }),
  setPooja: (pooja) => set({ pooja }),
  setParticipants: (participants) => set({ participants }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 4) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
  goToStep: (step) => set({ step }),
  reset: () => set(initialState),
}));
