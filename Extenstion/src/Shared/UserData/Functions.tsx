import DefaultData from "@/shared/userdata/Data";
import { create, useStore } from "zustand";
//*
import { WidgT, WidgDTI, AlarmD } from "../Widget";
import { SettD } from "@/Components/settings";
import { LayoutItem } from "react-grid-layout";
import { SCD } from "@/Components/widgets/shortcuts";
export type UserD = {
  Widgets: {
    [Id: string]: {
      [This /*Type string*/ in WidgT]: {
        type: This;
        data: WidgDTI[This];
      };
    }[WidgT];
  };
  SharedData: {
    layout: LayoutItem[];
    alarm: AlarmD[] | null;
  };
  Settings: SettD;
  SCD:SCD|undefined;
};

const stored = JSON.parse(localStorage.getItem("Data") ?? "{}");
export const UserData = create<UserD>(() => ({
  ...DefaultData,
  ...stored,
}));

let timer: ReturnType<typeof setTimeout> | undefined;

UserData.subscribe(() => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    clearTimeout(timer);
    timer = undefined;
    localStorage.setItem("Data", JSON.stringify(UserData.getState()));
  }, 1000);
});
