import { create } from "zustand";
//*
type gridstate = {
  drag: boolean;
};
export const gridstate = create<gridstate>(() => ({
  drag: false,
}));
