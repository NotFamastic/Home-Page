import type { LayoutItem } from "react-grid-layout";
//!
import clock from "../Components/widgets/Widgets/Clock";
import quote from "../Components/widgets/Widgets/Quotes";
//!
export type S /*Settings types*/ = {};

export type CD /*clock Data*/ = {
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
export type AD /*Alarm Data*/ = {
  name: string;
  time: number;
  text?: string;
};
export type WidgList = {
  clock: CD;
  quote: null;
};
export type W /*widget types*/ = keyof WidgList;

export type UD /*User Data*/ = {
  Widgets: {
    [Id: string]: {
      type: keyof WidgList;
      data: WidgList[keyof WidgList];
    };
  };
  SharedData: {
    layout: LayoutItem[];
    alarm: AD[] | null;
  };
  Settings: S;
};

export const WidClass: Record<
  keyof WidgList,
  new (id: string, data: any) => { html: React.ReactElement /*html*/ }
> = {
  clock: clock,
  quote: quote,
};

/*type Widget = {
  [K in keyof WidgList]: {
    type: K;
    data: WidgList[K];
  };
}[keyof WidgList];
{
  Clock: {
    type: "Clock";
    data: CD;
  };

  Settings: {
    type: "Settings";
    data: S;
  };
}["Clock" | "Settings"]*/
