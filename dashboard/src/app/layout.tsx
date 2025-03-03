import type { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A Next.js Dashboard for Data Visualization",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div style={{ display: "flex", height: "100vh" }}>
          {/* Sidebar Navigation */}
          <aside
            style={{
              width: "250px",
              backgroundColor: "#002147",
              color: "white",
              padding: "20px",
              position: "fixed",
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <h2>Dashboard</h2>
            <nav>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: "10px" }}>
                  <Link href="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <Link href="/stats" style={{ color: "white", textDecoration: "none" }}>Stats</Link>
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <Link href="/details" style={{ color: "white", textDecoration: "none" }}>Details</Link>
                </li>

              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main style={{ marginLeft: "250px", padding: "20px", flexGrow: 1 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
