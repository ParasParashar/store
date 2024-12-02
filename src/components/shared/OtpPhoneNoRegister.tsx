import { auth } from "@/lib/firebase.config";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import React, { useEffect, useState, useTransition } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/components/ui/button";
import { Loader, Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

const OtpPhoneNoRegister = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [resendCountDown, setResendCountDown] = useState<number>(0);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timer;
    if (resendCountDown > 0) {
      timer = setTimeout(() => setResendCountDown(resendCountDown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountDown]);

  useEffect(() => {
    if (!recaptchaVerifier) {
      try {
        const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
        verifier.render().then(() => setRecaptchaVerifier(verifier));
      } catch (err) {
        console.error("Error initializing Recaptcha:", err);
        setError("Failed to initialize Recaptcha. Please try again.");
      }
    }
    return () => {
      recaptchaVerifier?.clear();
    };
  }, [auth]);

  useEffect(() => {
    const hasEnterOTP = otp.length === 6;
    if (hasEnterOTP) {
      verifyOTP();
    }
  }, [otp]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendCountDown(120);
    if (!phoneNumber) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    if (!recaptchaVerifier) {
      return setError("Recaptcha verification is not initialized");
    }
    setIsPending(true);
    const formatedNumber = `+${phoneNumber}`;
    try {
      const result = await signInWithPhoneNumber(
        auth,
        formatedNumber,
        recaptchaVerifier
      );
      setConfirmationResult(result);
      setSuccess("OTP Sent Successfully");
      setResendCountDown(60);
    } catch (err: any) {
      setResendCountDown(0);
      if (err.code === "auth/invalid-phone-number") {
        setError("Invalid phone number,Plese Check Again!!!");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many requests, Please try again later!");
      } else {
        setError(err.message || "Failed to send OTP.");
        console.log("Error: " + err.message);
      }
    } finally {
      setIsPending(false);
    }
  };
  const verifyOTP = async () => {
    if (!otp || !confirmationResult) {
      setIsPending(true);
      setError("Please enter the OTP.");
      return;
    }
    try {
      const result = await confirmationResult.confirm(otp);
      setSuccess("Phone number verified successfully!");
      console.log("User: ", result.user);
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsPending(true);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto px-4 py-8 border border-gray-200 rounded-lg shadow-md bg-secondary">
      {!confirmationResult && (
        <form
          onSubmit={handlePhoneSubmit}
          className="w-full flex flex-col gap-4"
        >
          <p className="text-xs text-center">
            Enter Your mobile number to get the OTP.
          </p>
          <PhoneInput
            inputProps={{
              required: true,
              name: "phone",
              placeholder: "Enter phone number",
            }}
            country={"in"}
            value={phoneNumber}
            onChange={(value: string) => {
              setPhoneNumber(value);
            }}
            inputStyle={{
              width: "100%",
              height: "40px",
              fontSize: "16px",
              color: "black",
              borderRadius: "0.375rem",
              border: "1px solid #e5e7eb",
            }}
            buttonStyle={{
              borderRadius: "0.375rem 0 0 0.375rem",
            }}
            containerClass="react-phone-input-container"
          />
          <Button
            disabled={!phoneNumber || isPending || resendCountDown > 0}
            type="submit"
            size={"lg"}
            className="w-full"
          >
            {resendCountDown > 0 ? (
              `Resend OTP in ${resendCountDown}`
            ) : isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "SEND OTP"
            )}
          </Button>
        </form>
      )}
      {confirmationResult && (
        <div className="w-full">
          <p className="text-md text-muted-foreground">Enter your Otp</p>
          <InputOTP maxLength={6} value={otp} onChange={(v) => setOtp(v)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      )}

      {isPending && <Loader2 className="animate-spin" />}

      <div id="recaptcha-container" className="mt-4"></div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </div>
  );
};

export default OtpPhoneNoRegister;
