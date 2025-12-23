import { redirect } from "next/navigation";
import PrivateLogin from "@/components/PrivateLogin";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en") redirect(`/${locale}/prive`);
  return <PrivateLogin />;
}
