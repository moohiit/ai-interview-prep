'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email, password } = params;
  try {
    const userRecord = await db.collection('users').doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists. Please log in instead.',
      }
    }
    await db.collection('users').doc(uid).set({
      name,
      email,
      password,
    })
    return {
      success: true,
      message: 'User created successfully. Please log in.',
    }
  } catch (error:any) {
    console.error('Error signing up:', error);
    if (error.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'This email address is already in use.',
      }
    }
    if (error.code === 'auth/invalid-email') {
      return {
        success: false,
        message: 'The email address is not valid.',
      }
    }
    return {
      success: false,
      message: error.message || 'An error occurred during sign up.',
    }
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if(!userRecord) {
      return {
        success: false,
        message: 'User not found. Please sign up instead.',
      }
    }
    await setSessionCookie(idToken);
    return {
      success: true,
      message:"User Logged in successfully."
    }
  } catch (error:any) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred during sign in.',
    }
  }
  
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // 7 days
  })
  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}