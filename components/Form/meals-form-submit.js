"use client";
import { useFormStatus } from "react-dom";

export default function ShareMealSubmit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? "Submitting..." : "Submit"}</button>
  );
}
