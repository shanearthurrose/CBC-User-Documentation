import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "@/components/AuthWrapper";

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </SessionProvider>
  );
}
