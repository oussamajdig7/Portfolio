import { create } from 'zustand';

export const useAudioStore = create((set) => ({
  isMuted: false, // Start unmuted as requested
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}));
