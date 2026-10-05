import React, { useEffect, useState } from "react";
import { Userdata } from "../../../Initial";
import { CD } from "../../../Types";
import { getNextAlarm, Widget } from "../../../Widget";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Container } from "react-bootstrap";

function ClockUi(s: CD): React.ReactElement {
  const Structure = s;
  const [t /*time*/, newt] = useState(new Date());
  const [running, setRunning] = useState(false);
  const [sec, setSec] = useState(0);
  const [Alarm, newAlarm] = useState(getNextAlarm(Userdata));

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
    const id = setInterval(() => newAlarm(getNextAlarm(Userdata)), 30000);
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
          variant="success"
          size="lg"
          onClick={function () {
            setRunning(!running);
          }}
        >
          {sec ? `${sec} Second` : "Start"}
        </Button>
      )}
    </Stack>
  );
}
export default class Clock extends Widget {
  //?pauseFunc?: () => void;
  constructor(id: string, s: CD) {
    super(id, "clock", s, <ClockUi {...s} />);
  }
}
