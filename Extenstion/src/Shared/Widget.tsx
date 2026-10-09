import React, { useEffect, useState } from "react";
//!
import { AlarmD, UserD, WidgT, WidgDTI } from "./Types";

export function getNextAlarm(data: UserD) {
  const alarmlist: AlarmD[] | null = data.SharedData.alarm;

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
