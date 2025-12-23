import { redirect } from "next/navigation";
import PrivateLogin from "@/components/PrivateLogin";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "fr") redirect(`/${locale}/private`); // ou redirect("/en/private") si tu ne supportes que fr/en
  return <PrivateLogin />;
}
