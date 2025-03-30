"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email, password } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please log in instead.",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      password,
    });
    return {
      success: true,
      message: "User created successfully. Please log in.",
    };
  } catch (error: any) {
    console.error("Error signing up:", error);
    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email address is already in use.",
      };
    }
    if (error.code === "auth/invalid-email") {
      return {
        success: false,
        message: "The email address is not valid.",
      };
    }
    return {
      success: false,
      message: error.message || "An error occurred during sign up.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User not found. Please sign up instead.",
      };
    }
    await setSessionCookie(idToken);
    return {
      success: true,
      message: "User Logged in successfully.",
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred during sign in.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // 7 days
  });
  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;
    return {
      ...userRecord.data(),
      id:userRecord.id,
    } as User
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  /**
   * 1. if user exist then it will return a object having some values in it then !!user will be executed like This below..
   * 
   * !!{name: 'Random Name'} --> !{name: 'Random Name'} ==> false --> !false ==> true 
   * 
   * 2. if user doesn't exist then it will return a null value then !!user will be executedlike this below..
   * 
   * !!null --> !null==>true --> !true ==> false
   * 
   */
  return !!user; // true or false
}

