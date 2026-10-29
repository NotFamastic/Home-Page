//!
import React, { useEffect, useState } from "react";
//!
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
//*
import { BaseWidg } from "../../shared/Widget";
import { WidgDTI } from "../../shared/Widget";
type Quote = { quote: string; author: string; id: number };

async function getQuotes(): Promise<Quote[]> {
  const saved = localStorage.getItem("QuotesCache");
  if (saved) {
    const { time, data } = JSON.parse(saved);
    if (Date.now() - time < 7 * 24 * 3600_000) return data;
  }

  const res = await fetch("https://dummyjson.com/quotes?limit=0");
  const { quotes } = await res.json();
  localStorage.setItem(
    "QuotesCache",
    JSON.stringify({ time: Date.now(), data: quotes }),
  );
  return quotes;
}

const pick = (list: Quote[]) => list[Math.floor(Math.random() * list.length)];
//!
function Ui() {
  const [list, setList] = useState<Quote[]>([]);
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    getQuotes().then(setList).catch(console.error);
  }, []);

  useEffect(() => {
    if (!list.length) return;
    setQuote(pick(list));
    const id = setInterval(() => setQuote(pick(list)), 30_000);
    return () => clearInterval(id);
  }, [list]);

  if (!quote) {
    return (
      <Card className="h-full">
        <CardHeader className="h-full">
          <CardTitle>Quote</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <Skeleton className="h-full"></Skeleton>
          <Skeleton className="h-full"></Skeleton>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="h-full">
        <CardTitle className="h-full">Quote</CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-y-auto">
        <figure>
          <blockquote>
            <p>
              <b>{quote.quote}</b>
            </p>
          </blockquote>
        </figure>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground text-right w-full">
          — {quote.author} <cite title="DummyJSON">from dummyjson.com</cite>
        </p>
      </CardFooter>
    </Card>
  );
}
//!
export default class quote extends BaseWidg {
  constructor(id: string) {
    super(id, "Quote");
  }
  Render(_: WidgDTI["Quote"]): React.ReactElement {
    return <Ui />;
  }
}
