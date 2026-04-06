import ResetPasswordForm from "@/components/reset-password-form"; //light dynamic page

export default function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return <ResetPasswordForm token={searchParams.token} />;
}