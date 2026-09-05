import { z } from "zod";

const safeUrl = z.string().trim().max(500).url().refine((value) => {
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
}, "Only HTTP(S) URLs are allowed").optional().or(z.literal(""));

export const entrySchema = z.object({
  name: z.string().trim().min(1).max(80),
  walletName: z.string().trim().min(1).max(80),
  walletAddress: z.string().trim().max(180).optional().or(z.literal("")),
  websiteUrl: safeUrl,
  twitterUrl: safeUrl,
  imageUrl: safeUrl,
  tagline: z.string().trim().max(180).optional().or(z.literal("")),
});

export type EntryInput = z.infer<typeof entrySchema>;
