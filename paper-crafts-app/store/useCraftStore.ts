import { create } from 'zustand';

export interface Craft {
  id: string;
  title: string;
  imageUrl: string;
  craftType?: string;
  createdAt: Date;
  wordCount: number;
}

export interface CraftState {
  // Current craft creation state
  currentInput: string;
  selectedCraftType: string | null;
  isGenerating: boolean;
  currentCraft: Craft | null;
  
  // Collection
  crafts: Craft[];
  
  // Milestones
  totalWordsTyped: number;
  totalCraftsCreated: number;
  milestones: string[];
  
  // Actions
  setCurrentInput: (input: string) => void;
  setSelectedCraftType: (type: string | null) => void;
  setIsGenerating: (generating: boolean) => void;
  setCurrentCraft: (craft: Craft | null) => void;
  addCraft: (craft: Craft) => void;
  updateWordCount: (words: number) => void;
  addMilestone: (milestone: string) => void;
  reset: () => void;
}

export const useCraftStore = create<CraftState>((set) => ({
  // Initial state
  currentInput: '',
  selectedCraftType: null,
  isGenerating: false,
  currentCraft: null,
  crafts: [],
  totalWordsTyped: 0,
  totalCraftsCreated: 0,
  milestones: [],

  // Actions
  setCurrentInput: (input) => set({ currentInput: input }),
  setSelectedCraftType: (type) => set({ selectedCraftType: type }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  setCurrentCraft: (craft) => set({ currentCraft: craft }),
  
  addCraft: (craft) => set((state) => ({
    crafts: [...state.crafts, craft],
    totalCraftsCreated: state.totalCraftsCreated + 1,
  })),
  
  updateWordCount: (words) => set((state) => ({
    totalWordsTyped: state.totalWordsTyped + words,
  })),
  
  addMilestone: (milestone) => set((state) => ({
    milestones: [...state.milestones, milestone],
  })),
  
  reset: () => set({
    currentInput: '',
    selectedCraftType: null,
    isGenerating: false,
    currentCraft: null,
  }),
}));

