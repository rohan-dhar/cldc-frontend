import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
	<MantineProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</MantineProvider>
);