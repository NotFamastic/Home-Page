import React, { useEffect, useState } from "react";
//!
import { CD, AD, UD, W } from "./Types";

export function getNextAlarm(data: UD) {
  const alarmlist: AD[] | undefined = data.SharedData.alarm;

  return alarmlist
    ? alarmlist.reduce(function (PrevAlarm, NextAlarm) {
        return NextAlarm.time > PrevAlarm.time ? PrevAlarm : NextAlarm;
      })
    : undefined;
}

export class Widget {
  id: string;
  type: W;
  widgData: CD;
  html: React.ReactElement;
  constructor(id: string, type: W, widgData: CD, html: React.ReactElement) {
    this.id = id;
    this.type = type;
    this.widgData = widgData;
    this.html = html;
  }
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
