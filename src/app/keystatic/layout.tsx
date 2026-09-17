import type { ReactNode } from 'react';
import LangToggle from './lang-toggle';

export default function KeystaticLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0 }}>
        {/* Language toggle bar — fixed di atas */}
        <LangToggle />
        {/* Keystatic UI — diberi padding-top supaya tidak tertutup toggle bar */}
        <div style={{ paddingTop: 38 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
