// Outbound links, set in Vercel env vars. `null` means "not configured yet".
export const bookingUrl: string | null =
  process.env.NEXT_PUBLIC_BOOKING_URL || null;

export const guidePath = "/guide/pick-one";
export const optInPath = "/guide";
export const coachingPath = "/coaching";
