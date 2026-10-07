import React, { useEffect, useState } from "react";
import { getNextAlarm, Widget } from "../../../Shared/Widget";
import {Button, Stack, Badge, ButtonGroup} from "react-bootstrap";
import { getUserData } from "../../../Shared/UD/UD";
import { CD, AD, UD, W, WidgList } from "../../../Shared/Types";

function ClockUi(Structure: CD): React.ReactElement {
  const [t /*time*/, newt] = useState(new Date());
  const [running, setRunning] = useState<boolean>(false);
  const [sec, setSec] = useState(0);
  const [Alarm, newAlarm] = useState(getNextAlarm(getUserData()));

  useEffect(() => {
    const id = setInterval(() => newt(new Date()), 100);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!running) {
      return;
    }
    const id = setInterval(
      () => setSec((sec) => Math.round((sec + 0.1) * 10) / 10),
      100,
    );
    return () => clearInterval(id);
  }, [running]);
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
      {running && (
        <ButtonGroup>
          <Button
            variant="warning"
            onClick={function () {
              setRunning(!running);
            }}
          >
            Pause
          </Button>
          <Button variant="secondary" style={{ width: "5vw" }} disabled>
            {sec}
          </Button>
          <Button
            variant="danger"
            onClick={function () {
              setRunning(!running);
              setSec(0);
            }}
          >
            Reset
          </Button>
        </ButtonGroup>
      )}
      {!running && (
        <Button
          variant={sec?"warning":"success"}
          size="lg"
          onClick={function () {
            setRunning(!running);
          }}
        >
          {sec ? `Resume ${sec}.0`:"Start"}
        </Button>
      )}
    </Stack>
  );
}
export default class Clock extends Widget {
  //?pauseFunc?: () => void;
  constructor(id: string, s: CD) {
    super(id, "clock", <ClockUi {...s} />);
  }
    Update(s: CD):void {
         this.html = <ClockUi {...s} />
     }
}
