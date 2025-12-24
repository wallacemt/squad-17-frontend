import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => await auth.handler(req);

export const POST = async (req: NextRequest) => await auth.handler(req);
