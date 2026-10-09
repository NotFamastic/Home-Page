import React, { useEffect, useState } from "react";
import { Card, Placeholder } from "react-bootstrap";

import { BaseWidg } from "../../Shared/Widget";
import { WidgDTI } from "../../Shared/Types";
//!https://github.com/public-apis/public-apis
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
      <Card>
        <Card.Header>Quote</Card.Header>
        <Card.Body>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={12} />
            <Placeholder xs={5} />
          </Placeholder>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>Quote</Card.Header>
      <Card.Body>
        <figure>
          <blockquote className="blockquote">
            <p><b>{quote.quote}</b></p>
          </blockquote>
          <figcaption className="blockquote-footer">
             {quote.author} <cite title="Source Title"> From dummyjson.com</cite>
          </figcaption>
        </figure>
      </Card.Body>
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
