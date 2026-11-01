//!
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { SearchIcon } from "lucide-react";

//!
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Command,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
//!
import { SearchInput } from "../custom-ui";
//!
import type { WidgDTI } from "../../shared/Widget";
import { BaseWidg } from "../../shared/Widget";
import { UserData } from "@/shared/userdata/Functions";
//!
import { siBrave, siGoogle, siDuckduckgo, siDedge } from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { gridstate } from "@/shared/grid";
//*type
type engine = (typeof SearchList)[number]["value"];
type query = string;
type suggest = string;

export const SearchList = [
  { value: "b", label: "Brave" },
  { value: "g", label: "Google" },
  { value: "d", label: "DuckDuckGo" },
  { value: "e", label: "Bing" },
] as const;

const links: {
  [k in engine]: [
    `https://${string}.com/${string}=`, // search url
    `https://${string}.com/${string}=`, // suggestion url
    SimpleIcon,
  ];
} = {
  b: [
    "https://search.brave.com/search?q=",
    //"https://search.brave.com/api/suggest?q=",
    "https://api.bing.com/osjson.aspx?query=",
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

const proxyPaths: Record<engine, string> = {
  b: "/brave-suggest",
  g: "/google-suggest",
  d: "/ddg-suggest",
  e: "/bing-suggest",
};

async function fetchSuggestions(
  q: query,
  e: engine,
  s: AbortSignal,
): Promise<suggest[]> {
  const url = links[e][1] + encodeURIComponent(q);
  const requestUrl = import.meta.env.DEV
    ? `${proxyPaths[e]}${new URL(url).search}`
    : url;

  const res = await fetch(requestUrl, { signal: s });
  if (!res.ok) return [];
  const data = await res.json();

  switch (e) {
    case "d":
      return data.map((o: { phrase: string }) => o.phrase);
    default:
      return data[1] ?? [];
  }
}

function Ui(): React.ReactElement {
  const engine = useStore(UserData, (UD) => UD.Settings.search);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState<query>("");
  const [suggestlist, setSuggestlist] = useState<suggest[]>([]);
  const drag = useStore(gridstate, (state) => state.drag);

  useEffect(() => {
    if (!q.trim()) return;

    const ctrl = new AbortController();

    const timer = setTimeout(() => {
      fetchSuggestions(q, engine, ctrl.signal)
        .then((value) => {
          if (!ctrl.signal.aborted) {
            setSuggestlist(value);
          }
        })
        .catch((e) => {
          if (e.name !== "AbortError") {
            console.error("Suggestion call failed:", e);
          }
        });
    }, 200);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [q, engine]);

  function search(text: query) {
    const url = links[engine][0] + encodeURIComponent(text.trim());
    if (typeof chrome !== "undefined" && chrome.tabs?.create) {
      void chrome.tabs.create({ url }).catch(console.error);
    } else {
      window.open(url, "_blank", "noopener");
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(state: boolean) => {
        if (!drag) {
          setOpen(state);
          if (!state) /*close*/ {
            setQ("");
            setSuggestlist([]);
          }
        }
      }}
    >
      <DialogTrigger nativeButton={false} render={<div />}>
        <InputGroup>
          <InputGroupAddon>
            <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
              <path d={links[engine][2].path} />
            </svg>{" "}
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." readOnly tabIndex={-1} />
        </InputGroup>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <Command defaultValue={q} shouldFilter={false}>
          <SearchInput
            onValueChange={setQ}
            placeholder="Search..."
            icon={
              <svg
                viewBox="0 0 24 24"
                width={20}
                height={20}
                fill="currentColor"
              >
                <path d={links[engine][2].path} />
              </svg>
            }
          />
          <CommandList>
            <CommandEmpty>
              <span>No results found</span>
            </CommandEmpty>
            {q && (
              <>
                <CommandGroup heading="Search Results">
                  <CommandItem key={q} value={q} onSelect={() => search(q)}>
                    {q}
                  </CommandItem>
                  {suggestlist.map(
                    (s) =>
                      s !== q && (
                        <CommandItem
                          key={s}
                          value={s}
                          onSelect={() => search(s)}
                        >
                          <SearchIcon />
                          {s}
                        </CommandItem>
                      ),
                  )}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
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
