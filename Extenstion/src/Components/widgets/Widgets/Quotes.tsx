import React, { useEffect, useState } from "react";
import { Card, Placeholder } from "react-bootstrap";

import { Widget } from "../../../Shared/Widget";
import { CD, AD, UD, W, WidgList } from "../../../Shared/Types";

function QuoteUi() {
  type Quote = {
    q: string;
    a: string;
    h: string;
  };
  const [quote, setQuote] = useState<Quote | null>(null);
  async function getQuote() {
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data: Quote[] = await res.json();
      setQuote(data[0]);
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
        <Card.Body>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={12} />
            <Placeholder xs={5}/>
          </Placeholder>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Body>{quote.q}</Card.Body>
    </Card>
  );
}

export default class Quote extends Widget {
  //?pauseFunc?: () => void;
  constructor(id: string) {
    super(id, "quote", <QuoteUi />);
  }
  Update(_: WidgList[keyof WidgList]): void {
    this.html = <QuoteUi />;
  }
}
