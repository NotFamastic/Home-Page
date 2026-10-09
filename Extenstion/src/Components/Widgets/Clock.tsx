import React, { useEffect, useState } from "react";
import { getNextAlarm, BaseWidg } from "../../Shared/Widget";
import { Button, Stack, Badge, ButtonGroup } from "react-bootstrap";
import { getUserData } from "../../Shared/UserData/Functions";
import { ClockD, WidgDTI } from "../../Shared/Types";

const Default: ClockD = {
  override: true,
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
function ClockUi(Structure: ClockD): React.ReactElement {
  const [t /*time*/, newt] = useState(new Date());
  const [Alarm, newAlarm] = useState(getNextAlarm(getUserData()));

  useEffect(() => {
    const id = setInterval(() => newt(new Date()), 100);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => newAlarm(getNextAlarm(getUserData())), 30000);
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
    <Stack>
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
          {Alarm.name} at{" "}
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
    </Stack>
  );
}
export default class clock extends BaseWidg {
  //?pauseFunc?: () => void;
  constructor(id: string) {
    super(id, "Clock");
  }
  Render(s: WidgDTI["Clock"]): React.ReactElement {
    s = s ? s : Default;
    return <ClockUi {...s} />;
  }
}
