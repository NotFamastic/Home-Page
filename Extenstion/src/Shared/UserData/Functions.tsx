import type { UserD, SettD } from "../Types";
import type { Layout } from "react-grid-layout";
import DefaultData from "./DefaultUD";
import { create } from "zustand";

//*Types
type typelist = {
  layout: Layout;
  Setting: SettD;
  Custom: UserD;
};

//*Functions
const stored = JSON.parse(localStorage.getItem("Data") ?? "{}");
export const UserData = create<UserD>(() => ({
  ...DefaultData,
  ...stored
}));
