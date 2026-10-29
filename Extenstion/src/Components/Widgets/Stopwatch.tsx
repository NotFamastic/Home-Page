//!
import React, { useRef, useEffect, useState } from "react";
//!
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/Components/ui/button-group";
//*
import { BaseWidg } from "../../shared/Widget";
import { WidgDTI } from "../../shared/Widget";
//!
function Ui(): React.ReactElement {
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
    startTimeRef.current = Date.now() - ElapsedTime; 
  }

  function FormatTime() {
    let h = Math.floor(ElapsedTime / (1000 * 60 * 60));
    let m = Math.floor((ElapsedTime / (1000 * 60)) % 60);
    let s = Math.floor((ElapsedTime / 1000) % 60);
    let ms = Math.floor(ElapsedTime % 60);
    return h ? `${h}:${m}:${s}` : m ? `${m}:${s}` : `${s}.${ms}`;
  }

  return (
    <Card className="h-full w-full">
      <CardContent className="flex items-center justify-center">
        {Isrunning ? (
          <ButtonGroup className="w-full">
            <Button
              className="min-w-0 flex-1"
              variant="default"
              onClick={() => setRunning(false)}
            >
              Pause
            </Button>

            <ButtonGroupText className="min-w-0 flex-1 justify-center">
              {FormatTime()}
            </ButtonGroupText>

            <Button
              className="min-w-0 flex-1"
              variant="destructive"
              onClick={() => {
                setRunning(false);
                setElapsedTime(0);
              }}
            >
              Reset
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant={ElapsedTime > 0 ? "default" : "outline"}
            onClick={Start}
          >
            {ElapsedTime > 0 ? `Resume ${FormatTime()}` : "Start"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
//!
export default class stopwatch extends BaseWidg {
  constructor(id: string) {
    super(id, "StopWatch");
  }

  Render(_: WidgDTI["StopWatch"]): React.ReactElement {
    return <Ui />;
  }
}
