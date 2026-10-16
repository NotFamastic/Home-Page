//!
import React, { useEffect, useState } from "react";
//!
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
//!
import { BaseWidg } from "../../shared/Widget";
import { WidgDTI } from "../../shared/Types";

function QuoteUi() {
  type Quote = {
    quote: string;
    author: string;
    id: number;
  };
  const [quote, setQuote] = useState<Quote | null>(null);
  async function getQuote() {
    const link = "https://dummyjson.com/quotes/random";
    const test = "https://dummyjson.com/quotes/random";
    try {
      const res = await fetch(test);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data: Quote = await res.json();
      setQuote(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getQuote();
    const id = setInterval(() => {
      getQuote();
    }, 30000);

    return () => clearInterval(id);
  }, []);
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
      <CardContent className="h-full">
        <figure>
          <blockquote className="">
            <p>
              <b>{quote.quote}</b>
            </p>
          </blockquote>
        </figure>
      </CardContent>
      <CardFooter>
        <figcaption className="blockquote-footer">
          {quote.author} <cite title="Source Title"> From dummyjson.com</cite>
        </figcaption>
      </CardFooter>
    </Card>
  );
}

export default class quote extends BaseWidg {
  //?pauseFunc?: () => void;
  constructor(id: string) {
    super(id, "Quote");
  }
  Render(_: WidgDTI["Quote"]): React.ReactElement {
    return <QuoteUi />;
  }
}
