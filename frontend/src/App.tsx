import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { Router } from "./routes";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}
