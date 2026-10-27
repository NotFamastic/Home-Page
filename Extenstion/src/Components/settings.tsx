//!
import React, { useState } from "react";
import { useStore } from "zustand";
import { Settings as SettingsIcon } from "lucide-react";
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
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
//!
import { UserData } from "@/shared/userdata/Functions";
import { SearchList } from "./widgets/SearchBar";
//*
export type SettD = {
  theme: (typeof themeList)[number]["value"];
  dark: boolean;
  search: (typeof SearchList)[number]["value"];
};
//!
const themeList = [
  { label: "Default", value: "default" },
  { label: "Cyberpunk", value: "cyberpunk" },
  { label: "Twitter", value: "twitter" },
  { label: "Valorant", value: "valorant" },
  { label: "Rose", value: "rose" },
];

const sections = [
  { id: "appearance", label: "Appearance" },
  { id: "preference", label: "Preference" },
  { id: "accounts", label: "Accounts" },
  { id: "data", label: "Data" },
] as const;

//!
export default function SettingsUi(): React.ReactElement {
  const SettD = useStore(UserData, (UD) => UD.Settings);
  const [section, setSection] /*Section in use also trigers on rerender*/ =
    useState<(typeof sections)[number]["id"]>("appearance");

  function content() {
    switch (section) {
      case "appearance":
        return (
          <>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="themeselect">Theme</FieldLabel>
                <Select
                  id="themeselect"
                  items={themeList}
                  value={SettD.theme}
                  onValueChange={(v) => {
                    if (!v) return;
                    UserData.setState((UD) => ({
                      Settings: { ...UD.Settings, theme: v },
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Themes</SelectLabel>
                      {themeList.map((i) => (
                        <SelectItem key={i.value} value={i.value}>
                          {i.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="DarkSwitch">Dark Mode</FieldLabel>
                <Switch
                  id="DarkSwitch"
                  checked={SettD.dark}
                  onCheckedChange={(checked) =>
                    UserData.setState((UD) => ({
                      Settings: { ...UD.Settings, dark: checked },
                    }))
                  }
                />
              </Field>
            </FieldGroup>
          </>
        );
      case "preference":
        return (
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="searchselect">Search Engine</FieldLabel>
              <Select
                id="searchselect"
                items={SearchList}
                value={SettD.search}
                onValueChange={(v) => {
                  if (!v) return;
                  UserData.setState((UD) => ({
                    Settings: { ...UD.Settings, search: v  },
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Search Engine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Themes</SelectLabel>
                    {SearchList.map((i) => (
                      <SelectItem key={i.value} value={i.value}>
                        {i.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        );
      case "accounts":
        return (
          <p className="text-muted-foreground">Account settings go here.</p>
        );
      case "data":
        return (
          <div className="flex flex-col gap-4">
            <Separator />
            <Button
              variant="destructive"
              className="w-fit"
              onClick={() => {
                localStorage.clear();
                location.reload();
              }}
            >
              Remove DATA
            </Button>
          </div>
        );
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Settings">
            <SettingsIcon />
          </Button>
        }
      />
      <DialogContent className="h-[70vh] overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Change how your page looks and works.
          </DialogDescription>
        </DialogHeader>

        <SidebarProvider className="h-full min-h-0 items-start">
          <Sidebar collapsible="none" className="h-full w-48 border-r">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sections.map((s) => (
                      <SidebarMenuItem key={s.id}>
                        <SidebarMenuButton
                          isActive={section === s.id}
                          onClick={() => setSection(s.id)}
                        >
                          {s.label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <main className="h-full flex-1 overflow-auto p-6">{content()}</main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
