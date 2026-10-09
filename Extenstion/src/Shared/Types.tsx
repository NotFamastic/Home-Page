import type { LayoutItem } from "react-grid-layout";
//!
import clock from "../Components/Widgets/Clock";
import quote from "../Components/Widgets/Quotes";
import stopwatch from "../Components/Widgets/Stopwatch";
import { BaseWidg } from "./Widget";
//!
export type themes =
  | "Default"
  | "Brite"
  | "Cyborg"
  | "Simplex"
  | "Sketchy"
  | "Vapor"
  | "Zephyr";
export type SettD /*Settings Data*/ = {
  theme: themes;
};

export type WidgDTI /*Data Type Index*/ = {
  Clock: ClockD | undefined;
  Quote: null;
  StopWatch: null;
};

export type WidgT /*widget types */ = keyof WidgDTI;

export type ClockD /*clock Data*/ = {
  override: boolean;
  Time: {
    enabled: boolean;
    hour?: "numeric";
    minute?: "2-digit";
    second?: "2-digit";
    hour12?: boolean;
  };
  Date: {
    enabled: boolean;
    weekday?: "long";
    day?: "numeric";
    month?: "long" | "short" | "numeric";
    year?: "numeric";
  };
};

export type AlarmD /*Alarm Data*/ = {
  name: string;
  time: number;
  text?: string;
};

export type UserD /*User Data*/ = {
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
};

export const WidgCI: Record<WidgT, new (id: string) => BaseWidg> = {
  Clock: clock,
  Quote: quote,
  StopWatch: stopwatch,
}; /*Widg Class Index*/
