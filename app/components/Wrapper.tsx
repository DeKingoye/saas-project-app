"use client";

import Navbar from "./Navbar";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
