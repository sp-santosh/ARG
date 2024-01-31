"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;
