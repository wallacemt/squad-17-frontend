import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db/connection";
import { session, account } from "@/db/schemas/auth-schema";
import { and, eq } from "drizzle-orm";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(
      `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}critix.session_token`
    )?.value;
    const currentProvider = cookieStore.get("critix.current.provider")?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: "No session token found" }, { status: 401 });
    }
    if (!currentProvider) {
      return NextResponse.json({ error: "No provider found" }, { status: 401 });
    }
    // Buscar a sessão no banco usando o token
    const formattedToken = sessionToken?.split(".")[0].trim() || "";

    const [sessionData] = await db.select().from(session).where(eq(session.token, formattedToken)).limit(1);

    if (!sessionData) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Buscar a conta OAuth associada ao usuário
    const [accountData] = await db
      .select()
      .from(account)
      .where(and(eq(account.userId, sessionData.userId), eq(account.providerId, currentProvider)))
      .limit(1);

    if (!accountData?.accessToken) {
      return NextResponse.json({ error: "Access token not found" }, { status: 404 });
    }

    return NextResponse.json({
      accessToken: accountData.accessToken,
      provider: accountData.providerId,
    });
  } catch (error) {
    console.error("Error fetching OAuth access token:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
