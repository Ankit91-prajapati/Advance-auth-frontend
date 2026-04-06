import VerifyClient from "@/components/verify-client"; //light dynamic 
// client can be inside server not opposite

export default function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return <VerifyClient token={searchParams.token} />;
}