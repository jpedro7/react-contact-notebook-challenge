import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient.ts";
import Contacts from "./pages/contacts/Contacts.tsx";
import Notebook from "./pages/notebook/Notebook.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/notebook",
    element: <Notebook />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
