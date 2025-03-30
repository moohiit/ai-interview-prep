import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepAI</h2>
        </Link>
      </nav>
      {/* Main content area */}
      {children}
      {/* Footer area */}
    </div>
  );
};

export default RootLayout;
