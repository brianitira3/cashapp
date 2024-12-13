import type { Route } from "./+types/home";
import App from "../welcome/cashapp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <App />;
}