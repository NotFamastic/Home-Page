import React, { useEffect, useState } from "react";
//!
export { Clock };
//!
import { Userdata } from "./Initial";
import { CD, AD, UD, W } from "./Types";

function getNextAlarm(data: UD) {
  const alarmlist: AD[] | undefined = data.SharedData.alarm;

  return alarmlist
    ? alarmlist.reduce(function (PrevAlarm, NextAlarm) {
        return NextAlarm.time > PrevAlarm.time ? PrevAlarm : NextAlarm;
      })
    : undefined;
}

function ClockHtml(s: CD): React.ReactElement {
  const [Structure, _] = useState(s);
  const [t /*time*/, newt] = useState(new Date());
  const [running, setRunning] = useState(false);
  const [sec, setSec] = useState(0);
  const [Alarm, newAlarm] = useState(getNextAlarm(Userdata));

  useEffect(() => {
    const id = setInterval(() => newt(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!running) {
      return;
    }
    const id = setInterval(() => setSec((sec) => sec + 0.1), 100);
    return () => clearInterval(id);
  }, [running]);
  useEffect(() => {
    const id = setInterval(() => newAlarm(getNextAlarm(Userdata)), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="Clock">
      {Structure.Time.enabled && (
        <h2>
          {t.toLocaleTimeString([], {
            hour: Structure.Time.hour,
            minute: Structure.Time.minute,
            second: Structure.Time.second,
            hour12: Structure.Time.hour12,
          })}
        </h2>
      )}
      {Structure.Date.enabled && (
        <h3>
          {t.toLocaleDateString("en-US", {
            day: Structure.Date.day,
            month: Structure.Date.month,
            year: Structure.Date.year,
            weekday: Structure.Date.weekday,
          })}
        </h3>
      )}

      {Alarm && (
        <h3>
          {Alarm.name} at {Alarm.time}
        </h3>
      )}
      <button
        style={{ background: running ? "red" : "green" }}
        onClick={function () {
          setRunning(!running);
        }}
      >
        {sec}
      </button>
    </div>
  );
}
class Widget {
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
class Clock extends Widget {
  pauseFunc?: () => void;
  constructor(id: string, s: CD) {
    super(id, "clock", s, <ClockHtml {...s} />);
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
