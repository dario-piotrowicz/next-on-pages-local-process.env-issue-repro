import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  let responseText = "Hello World";

  const from: string = 'reqCtx';
  // const from: string = "process.env";

  const myKv =
    from === "reqCtx"
      ? getRequestContext().env.MY_KV
      : (process as unknown as { env: { MY_KV: KVNamespace<string> } }).env
          .MY_KV;

  await myKv.put("suffix", " from a KV store!");
  const suffix = await myKv.get("suffix");
  responseText += suffix;

  return new Response(responseText);
}
