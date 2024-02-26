"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient());

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("dark");
    root.classList.add("light");
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;
