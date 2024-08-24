import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export function useAuthUser() {
  const [user, setUser] = useState(null) as any;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log(user, "logged in===");

      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsub;
  }, []);

  return { user };
}
