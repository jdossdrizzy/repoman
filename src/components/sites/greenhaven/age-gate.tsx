"use client";

import { useEffect, useState } from "react";

import { site } from "@/lib/site";
import { LeafMark } from "./brand";

const STORAGE_KEY = "greenhaven-age-verified";

function readVerified() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "yes";
  } catch {
    return false;
  }
}

export function AgeGate() {
  // Start hidden so server HTML never flashes the gate for returning visitors.
  const [status, setStatus] = useState<"checking" | "ask" | "denied" | "ok">("checking");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    setStatus(readVerified() ? "ok" : "ask");
  }, []);

  useEffect(() => {
    if (status === "ask" || status === "denied") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [status]);

  if (status === "checking" || status === "ok") return null;

  function confirm() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "yes");
    } catch {
      // Storage unavailable: the gate will simply show again next visit.
    }
    setStatus("ok");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-forest/85 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-3xl bg-card p-8 text-center shadow-2xl">
        <LeafMark className="mx-auto size-12 text-primary" />
        {status === "ask" ? (
          <>
            <h2 id="age-gate-title" className="mt-4 text-3xl font-semibold">Welcome to {site.name}</h2>
            <p className="mt-3 text-muted-foreground">
              You must be 21 or older, or a registered medical patient 18 or older, to enter.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                autoFocus
                onClick={confirm}
                className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                I&apos;m 21+ or a medical patient
              </button>
              <button
                type="button"
                onClick={() => setStatus("denied")}
                className="rounded-full border border-border px-6 py-3 font-medium hover:bg-muted"
              >
                I&apos;m under 21
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id="age-gate-title" className="mt-4 text-3xl font-semibold">Come back later</h2>
            <p className="mt-3 text-muted-foreground">
              Sorry, you need to be of legal age to view this site.
            </p>
            <button
              type="button"
              onClick={() => setStatus("ask")}
              className="mt-6 text-sm font-medium text-primary underline underline-offset-4"
            >
              I answered by mistake
            </button>
          </>
        )}
      </div>
    </div>
  );
}
