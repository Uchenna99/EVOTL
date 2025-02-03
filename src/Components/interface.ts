
export interface EvtolUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    password: string;
    phoneNumber: string;
    age: string;
    region: string;
    role: "USER" | "ADMIN";
    googleId: string | null;
    otp: string | null;
    otpExpiry: string | null;
    createdAt: string;
    updatedAt: string;
  }
  