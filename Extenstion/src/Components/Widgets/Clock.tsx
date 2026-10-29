//!
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
//!
import { Badge } from "@/Components/ui/badge";
//!
import { getNextAlarm, BaseWidg } from "../../shared/Widget";
//*
import { UserData } from "../../shared/userdata/Functions";
import { WidgDTI } from "../../shared/Widget";
export type ClockD = {
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
//!
const Default: ClockD = {
  Time: {
    enabled: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  },
  Date: {
    enabled: true,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};
//!
function Ui(Structure: ClockD): React.ReactElement {
  const [t /*time*/, newt] = useState(new Date());
  const Alarm = getNextAlarm(useStore(UserData, (UD) => UD.SharedData.alarm));

  useEffect(() => {
    const id = setInterval(() => newt(new Date()), 100);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => Alarm, 30000);
    return () => clearInterval(id);
  }, []);
  const days = Alarm
    ? Math.round(
        (Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
        ) -
          Date.UTC(
            new Date(Alarm.time).getFullYear(),
            new Date(Alarm.time).getMonth(),
            new Date(Alarm.time).getDate(),
          )) /
          86400000,
      )
    : 0;
  return (
    <>
      {Structure.Time.enabled && (
        <h1>
          {t.toLocaleTimeString([], {
            hour: Structure.Time.hour,
            minute: Structure.Time.minute,
            second: Structure.Time.second,
            hour12: Structure.Time.hour12,
          })}
        </h1>
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
          {Alarm.name} at
          <Badge>
            {new Date(Alarm.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Badge>
          ,{" "}
          <span className="text-capitalize">
            {new Intl.RelativeTimeFormat("en", {
              numeric: "auto",
            }).format(days, "day")}
          </span>
        </h3>
      )}
    </>
  );
}
//!
export default class clock extends BaseWidg {
  constructor(id: string) {
    super(id, "Clock");
  }
  Render(s: WidgDTI["Clock"]): React.ReactElement {
    s = s ? s : Default;
    return <Ui {...s} />;
  }
}
