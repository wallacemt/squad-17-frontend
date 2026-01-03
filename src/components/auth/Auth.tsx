import Link from "next/link";
import { ModeManager } from "./_components/mode-manager";
import Image from "next/image";
import { getTrendingRandomPosters } from "@/services/mediaService";
import type { AuthMode } from "@/types/auth";

export interface AuthPageProps {
  mode: AuthMode;
  resetToken?: string;
}
export default async function AuthPage({ mode, resetToken }: AuthPageProps) {
  const posters = await getTrendingRandomPosters();
  return (
    <div className="relative flex bg-body-crx h-svh" style={{userSelect:"none"}}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-body-crx via-surface-crx to-body-crx" />
      <Link href={"/"} className="p-2 absolute left-0 z-20">
        <Image
          src={"/images/logo-short.png"}
          alt="App logo"
          className="h-8 w-8 md:w-20 md:h-20  hover:scale-105 transition-transform ease-in-out duration-150"
          title="Critix"
          height={200}
          width={200}
        />
      </Link>
      <ModeManager mode={mode} resetToken={resetToken} posters={posters} />
    </div>
  );
}
