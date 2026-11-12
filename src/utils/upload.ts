import { PUBLIC_UPLOAD_URL } from "astro:env/client";

/** Whether the hosting service is configured */
export const canUpload = Boolean(PUBLIC_UPLOAD_URL);

/** Uploads an image and resolves to its public URL */
export async function uploadImage(file: Blob) {
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", "recipes");

  const res = await fetch(PUBLIC_UPLOAD_URL!, {
    method: "POST",
    body,
    signal: AbortSignal.timeout(60_000),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.secure_url) {
    throw new Error(data?.error?.message ?? "Upload failed");
  }
  return data.secure_url as string;
}
