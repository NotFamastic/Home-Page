import type { UserD, SettD } from "../Types";
import type { Layout } from "react-grid-layout";
import DefaultData from "./DefaultUD";
import { create, useStore } from "zustand";
import { useEffect } from "react";

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
//!Hot fix for now
let timer: ReturnType<typeof setTimeout> | undefined;

const save = () => {
  clearTimeout(timer);
  timer = undefined;
  localStorage.setItem("Data", JSON.stringify(UserData.getState()));
};

UserData.subscribe(() => {
  clearTimeout(timer);
  timer = setTimeout(save, 400); 
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden" && timer) save();
});
addEventListener("pagehide", () => { if (timer) save(); });