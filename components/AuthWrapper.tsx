import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

const AuthWrapper: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const router = useRouter();
  const { status: sessionStatus, data: user } = useSession();
  const authenticated = sessionStatus === "authenticated";
  const unauthenticated = sessionStatus === "unauthenticated";
  const loading = sessionStatus === "loading";

  const [loadingCheck, setLoadingCheck] = useState(true);

  useEffect(() => {
    // check if the session is loading or the router is not ready
    if (loading || !router.isReady) return;

    // if the user is not authenticated or if the session doesn't exist yet, redirect to home
    if (unauthenticated || !user) {
      //router.push({ pathname: "/en/login" });
      console.log("not authenticated");
      return signIn();
    }

    setLoadingCheck(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, unauthenticated, router, user]);

  if (loadingCheck || loading) {
    return <p>Loading...</p>
  }

  /*
   * If the user is authenticated, render the page otherwise, render nothing while being redirected.
   * TODO: When login page is moved from a modal to a page, will redirect the user to sign in.
   */
  if (authenticated) {
    return <>{children}</>;
  }else{
    signIn();
  }

 
};

export default AuthWrapper;
