export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
    return `${process.env.NEXT_PUBLIC_HOST_URL}`;
  }

  return `${process.env.NEXT_PUBLIC_HOST_URL}`;
};
