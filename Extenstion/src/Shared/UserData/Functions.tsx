import type { LayoutItem } from "react-grid-layout";

import { create } from "zustand";

import type { SettD } from "@/components/settings";
import type { SClist } from "@/components/widgets/shortcuts";

import DefaultData from "@/shared/userdata/Data";

//*
import type { WidgT, WidgDTI, AlarmD } from "../Widget";
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
    Shortcuts: SClist;
  };
  Settings: SettD;
};

const stored = JSON.parse(localStorage.getItem("Data") ?? "{}");
//usecontext alternative
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
