import React, { useRef, useEffect, useState } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";

import { BaseWidg } from "../../Shared/Widget";
import { WidgDTI } from "../../Shared/Types";

function StopwatchUI({ id }: { id: string }): React.ReactElement {
  const [Isrunning, setRunning] = useState(false);
  const [ElapsedTime, setElapsedTime] = useState(0); //Total Actual Time

  const Id = useRef<number>(undefined); //for scope
  const startTimeRef = useRef(0); //Start
  useEffect(() => {
    if (Isrunning) {
      Id.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 100);
    }
    return () => {
      clearInterval(Id.current);
    };
  }, [Isrunning]);

  function Start() {
    setRunning(true);
    startTimeRef.current = Date.now() - ElapsedTime; //?
  }

  function FormatTime() {
    let h = Math.floor(ElapsedTime / (1000 * 60 * 60));
    let m = Math.floor((ElapsedTime / (1000 * 60)) % 60);
    let s = Math.floor((ElapsedTime / 1000) % 60);
    return `${h}:${m}:${s}`;
  }

  return (
    <Card>
      <Card.Body>
        {Isrunning ? (
          <ButtonGroup>
            <Button
              variant="warning"
              onClick={() => {
                setRunning(false);
              }}
            >
              Pause
            </Button>

            <Button variant="secondary" disabled>
              {FormatTime()}
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                setRunning(false)
                setElapsedTime(0);
              }}
            >
              Reset
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant={ElapsedTime > 0 ? "warning" : "success"}
            size="lg"
            onClick={Start}
          >
            {ElapsedTime > 0 ? `Resume ${FormatTime()}` : "Start"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default class stopwatch extends BaseWidg {
  constructor(id: string) {
    super(id, "StopWatch");
  }

  Render(_: WidgDTI["StopWatch"]): React.ReactElement {
    return <StopwatchUI id={this.id} />;
  }
}
