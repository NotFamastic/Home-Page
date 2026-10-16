//!
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useStore } from "zustand";
//!
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectLabel,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
//!
import { UserData } from "@/shared/userdata/Functions";

export default function SettingsUi(/*{}: {}*/): React.ReactElement {
  const themes = [
    { label: "Default", value: "default" },
    { label: "Cyberpunk", value: "cyberpunk" },
    { label: "Twitter", value: "twitter" },
    { label: "Valorant", value: "valorant" },
    { label: "Rose", value: "rose" },
  ];
  const SettD = useStore(UserData, (UD) => UD.Settings);
  return (
    <Dialog>
      <DialogTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-gear"
          viewBox="0 0 16 16"
        >
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
        </svg>
      </DialogTrigger>
      <DialogHeader>{/* <DialogTitle>Setting</DialogTitle> */}</DialogHeader>
      <DialogContent>
        <Tabs defaultValue="general" className="w-80vwh" orientation="vertical">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="DarkSwitch">Dark Mode</FieldLabel>
                <Switch
                  id="DarkSwitch"
                  checked={SettD.dark}
                  onCheckedChange={(t, _) =>
                    UserData.setState((UD) => ({
                      ...UD,
                      Settings: { ...UD.Settings, dark: t },
                    }))
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="themeselect">Themes</FieldLabel>
                <Select
                  id="themeselect"
                  items={themes}
                  defaultValue={SettD.theme}
                  onValueChange={(v) => {
                    if (!v) return;
                    UserData.setState((UD) => ({
                      ...UD,
                      Settings: { ...UD.Settings, theme: v },
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="themes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>themes</SelectLabel>
                      {themes.map((i) => (
                        <SelectItem key={i.value} value={i.value}>
                          {i.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <Separator />
            <Button
              variant="destructive"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Remove DATA
            </Button>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
