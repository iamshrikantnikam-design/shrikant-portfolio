import type { ReactNode } from "react";
import { TabBar } from "./components/TabBar";

/*
  Layout for every /prototype/* route. Renders the page content and
  mounts the bottom TabBar on top. The TabBar self-hides on the deck
  index (/prototype) so the overview page reads as a presentation
  surface, not a screen of the app.
*/

export default function PrototypeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <TabBar />
    </>
  );
}
