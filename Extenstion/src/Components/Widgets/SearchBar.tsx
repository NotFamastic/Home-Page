//!
import React, { useRef, useState } from "react";
import { useStore } from "zustand";
import { SearchIcon } from "lucide-react";
//!
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/Components/ui/input-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/components/ui/separator";
//!
//*
import type { WidgDTI } from "../../shared/Widget";
type searchkey = (typeof SearchList)[number]["value"];

import { UserData } from "@/shared/userdata/Functions";
import { BaseWidg } from "../../shared/Widget";
//!
import { siBrave, siGoogle, siDuckduckgo, siDedge } from "simple-icons";
import type { SimpleIcon } from "simple-icons";
export const SearchList = [
  { value: "b", label: "Brave" },
  { value: "g", label: "Google" },
  { value: "d", label: "DuckDuckGo" },
  { value: "e", label: "Bing" },
] as const;

const links: {
  [k in searchkey]: [
    `https://${string}.com/${string}=`, //search url
    `https://${string}.com/${string}=`, //suggestion url
    SimpleIcon,
  ];
} = {
  b: [
    "https://search.brave.com/search?q=",
    "https://search.brave.com/api/suggest?q=",
    siBrave,
  ],
  g: [
    "https://www.google.com/search?q=",
    "https://suggestqueries.google.com/complete/search?client=firefox&q=",
    siGoogle,
  ],
  d: [
    "https://duckduckgo.com/?q=",
    "https://duckduckgo.com/ac/?q=",
    siDuckduckgo,
  ],
  e: [
    "https://www.bing.com/search?q=",
    "https://api.bing.com/osjson.aspx?query=",
    siDedge,
  ],
};

function Ui(): React.ReactElement {
  const engine = useStore(UserData, (UD) => UD.Settings.search);
  const [list, setList] = useState<[string, string[]]>(["", []]);
  function search(rq: any) {
    const q = String(rq ?? "").trim();
    if (!q) return;

    const url = links[engine][0] + encodeURIComponent(q);
    if (chrome?.tabs?.create) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, "_blank", "noopener");
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <form>
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." autoComplete="on" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton type="submit" variant="default">
                  image
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        }
        nativeButton={false}
      >
        Open
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search(new FormData(e.currentTarget).get("q"));
          }}
        >
          <InputGroup>
            <InputGroupAddon>
              <svg
                role="img"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                fill="currentColor"
              >
                <path d={links[engine][2].path} />
              </svg>{" "}
            </InputGroupAddon>
            <InputGroupInput
              name="q"
              placeholder="Search..."
              autoComplete="on"
              onChange={async (e) => {
                const q = e.currentTarget.value.trim();

                if (!q) {
                  setList(["", []]);
                  return;
                }

                const url = links[engine][1] + encodeURIComponent(q);
                //!TEST
                const proxyPaths: Record<searchkey, string> = {
                  b: "/brave-suggest",
                  g: "/google-suggest",
                  d: "/ddg-suggest",
                  e: "/bing-suggest",
                };

                const requestUrl = import.meta.env.DEV
                  ? `${proxyPaths[engine]}${new URL(url).search}`
                  : url;
                //!TEST
                try {
                  const response = await fetch(requestUrl);

                  if (!response.ok) return;
                  const data = await response.json();

                  let suggestions: string[] = [];
                  switch (engine) {
                    case "d":
                      data.map((o: { phrase: string }) => {
                        suggestions.push(o.phrase);
                      });
                      break;

                    default:
                      suggestions = data[1];
                      break;
                  }

                  setList([q, suggestions]);
                } catch (error) {
                  console.error("Suggestion call failed:", error);
                }
              }}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton type="submit" variant="default">
                <SearchIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
        <div>
          {list[1].map((s, i) => (
            <div key={i}>
              <Button
                variant={"outline"}
                className={"w-max"}
                key={s}
                type="button"
                onClick={() => search(s)}
              >
                {s}
              </Button>
              <Separator />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default class searchbar extends BaseWidg {
  constructor(id: string) {
    super(id, "searchbar");
  }
  Render(_: WidgDTI["searchbar"]): React.ReactElement {
    return <Ui />;
  }
}
