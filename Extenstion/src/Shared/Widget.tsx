import React, { useEffect, useState } from "react";
//*
import { ClockD } from "@/Components/widgets/Clock";
import { SCD } from "@/Components/widgets/shortcuts";
export type AlarmD = {
  name: string;
  time: number;
  text?: string;
};

export type WidgDTI /*Data Type Index*/ = {
  Clock: ClockD | undefined;
  Quote: null;
  StopWatch: null;
  searchbar: null;
  ShortCuts: null;
};

export type WidgT = keyof WidgDTI;

export function getNextAlarm(alarmlist: AlarmD[] | null): AlarmD | undefined {
  return alarmlist
    ? alarmlist.reduce(function (PrevAlarm, NextAlarm) {
        return NextAlarm.time > PrevAlarm.time ? PrevAlarm : NextAlarm;
      })
    : undefined;
}

export abstract class BaseWidg {
  id: string;
  type: WidgT;
  constructor(id: string, type: WidgT) {
    this.id = id;
    this.type = type;
  }
  abstract Render(data: WidgDTI[WidgT]): React.ReactElement;
}
/*{
  id: 123,
  index: 2,
  windowId: 456,
  active: true,
  pinned: false,
  highlighted: true,
  incognito: false,
  url: "https://example.com/",
  title: "Example Domain",
  status: "complete"
}*/
