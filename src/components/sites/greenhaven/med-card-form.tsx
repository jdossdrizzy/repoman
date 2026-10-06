"use client";

import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
  "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

export const qualifyingConditions = [
  "Chronic pain",
  "Anxiety",
  "Insomnia / sleep disorders",
  "PTSD",
  "Migraines",
  "Arthritis",
  "Cancer",
  "Epilepsy / seizures",
  "Glaucoma",
  "Multiple sclerosis",
  "Crohn's disease / IBD",
  "Nausea",
  "Other / not sure",
];

type FormData = {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  state: string;
  condition: string;
  hasRecords: string;
  renewal: string;
  notes: string;
  visitType: string;
  preferredDate: string;
  timeWindow: string;
  consentContact: boolean;
  consentAccurate: boolean;
};

const empty: FormData = {
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  phone: "",
  state: "",
  condition: "",
  hasRecords: "",
  renewal: "new",
  notes: "",
  visitType: "telehealth",
  preferredDate: "",
  timeWindow: "",
  consentContact: false,
  consentAccurate: false,
};

const steps = ["About you", "Your health", "Evaluation"] as const;

function ageFrom(dob: string) {
  const d = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(d.getTime())) return NaN;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

function validate(step: number, f: FormData) {
  const e: Partial<Record<keyof FormData, string>> = {};
  if (step === 0) {
    if (!f.firstName.trim()) e.firstName = "Enter your first name.";
    if (!f.lastName.trim()) e.lastName = "Enter your last name.";
    if (!f.dob) e.dob = "Enter your date of birth.";
    else if (!(ageFrom(f.dob) >= 18)) e.dob = "You must be 18 or older to apply.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
    if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a 10-digit phone number.";
    if (!f.state) e.state = "Choose your state.";
  }
  if (step === 1) {
    if (!f.condition) e.condition = "Choose the condition that best fits, or “Other / not sure”.";
    if (!f.hasRecords) e.hasRecords = "Let us know if you have medical records.";
  }
  if (step === 2) {
    if (!f.preferredDate) e.preferredDate = "Pick a preferred date.";
    if (!f.timeWindow) e.timeWindow = "Pick a time window.";
    if (!f.consentContact) e.consentContact = "We need your permission to contact you about your appointment.";
    if (!f.consentAccurate) e.consentAccurate = "Please confirm your information is accurate.";
  }
  return e;
}

const inputCls =
  "mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive";

function Field({
  label,
  name,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && <p id={`${name}-error`} className="mt-1 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export function MedCardForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const a11y = (key: keyof FormData) => ({
    id: key,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  function next(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(step, form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    // TODO: send `form` to your telehealth partner or a secure (HIPAA-compliant) intake endpoint.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center sm:p-12" role="status">
        <CheckCircle2 className="mx-auto size-14 text-primary" />
        <h2 className="mt-4 text-3xl font-semibold">You&apos;re on your way, {form.firstName}!</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          We&apos;ve received your request for a {form.visitType === "telehealth" ? "telehealth" : "in-person"} evaluation.
          Our patient care team will reach out to <strong className="text-foreground">{form.email}</strong> within one business day to confirm your appointment.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Questions? Call us at <a href={site.phoneHref} className="font-medium text-primary underline underline-offset-4">{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={next} noValidate className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Application progress">
        {steps.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined}>
            <div className={cn("h-1.5 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-muted")} />
            <p className={cn("mt-2 flex items-center gap-1 text-xs font-medium sm:text-sm", i === step ? "text-foreground" : "text-muted-foreground")}>
              {i < step && <Check className="size-3.5 text-primary" />}
              <span className="hidden sm:inline">Step {i + 1}:</span> {label}
            </p>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-5 font-heading text-2xl font-semibold">Tell us about yourself</legend>
          <Field label="First name" name="firstName" error={errors.firstName}>
            <input {...a11y("firstName")} autoComplete="given-name" className={inputCls} value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
          </Field>
          <Field label="Last name" name="lastName" error={errors.lastName}>
            <input {...a11y("lastName")} autoComplete="family-name" className={inputCls} value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
          </Field>
          <Field label="Date of birth" name="dob" error={errors.dob} hint="Patients must be 18 or older.">
            <input {...a11y("dob")} type="date" autoComplete="bday" className={inputCls} value={form.dob} onChange={(e) => set("dob", e.target.value)} />
          </Field>
          <Field label="State of residence" name="state" error={errors.state}>
            <select {...a11y("state")} className={inputCls} value={form.state} onChange={(e) => set("state", e.target.value)}>
              <option value="">Select…</option>
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Email" name="email" error={errors.email}>
            <input {...a11y("email")} type="email" autoComplete="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
          <Field label="Mobile phone" name="phone" error={errors.phone}>
            <input {...a11y("phone")} type="tel" autoComplete="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </Field>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="grid gap-5">
          <legend className="mb-5 font-heading text-2xl font-semibold">Your health</legend>
          <Field label="Which condition best describes why you're applying?" name="condition" error={errors.condition} hint="Qualifying conditions vary by state. A licensed provider makes the final decision.">
            <select {...a11y("condition")} className={inputCls} value={form.condition} onChange={(e) => set("condition", e.target.value)}>
              <option value="">Select…</option>
              {qualifyingConditions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          <div>
            <p id="hasRecords" tabIndex={-1} className="text-sm font-medium">Do you have medical records for this condition?</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {[
                ["yes", "Yes, I can share them"],
                ["some", "Some / not sure"],
                ["no", "No records yet"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-3 text-sm transition",
                    form.hasRecords === value ? "border-primary bg-secondary" : "border-input hover:border-primary/40",
                  )}
                >
                  <input type="radio" name="hasRecords" value={value} checked={form.hasRecords === value} onChange={() => set("hasRecords", value)} className="accent-[var(--primary)]" />
                  {label}
                </label>
              ))}
            </div>
            {errors.hasRecords && <p className="mt-1 text-xs font-medium text-destructive">{errors.hasRecords}</p>}
          </div>

          <div>
            <p className="text-sm font-medium">Is this a new card or a renewal?</p>
            <div className="mt-2 flex gap-2">
              {[
                ["new", "New patient"],
                ["renewal", "Renewal"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-3 text-sm transition",
                    form.renewal === value ? "border-primary bg-secondary" : "border-input hover:border-primary/40",
                  )}
                >
                  <input type="radio" name="renewal" value={value} checked={form.renewal === value} onChange={() => set("renewal", value)} className="accent-[var(--primary)]" />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <Field label="Anything else the provider should know? (optional)" name="notes">
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className={cn(inputCls, "h-auto py-2.5")}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Current medications, past treatments, questions…"
            />
          </Field>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-5 font-heading text-2xl font-semibold">Book your evaluation</legend>
          <div className="sm:col-span-2">
            <p className="text-sm font-medium">How would you like to meet the provider?</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {[
                ["telehealth", "Telehealth video visit", "From home, usually same week"],
                ["in-person", "In person at our partner clinic", "Near the dispensary"],
              ].map(([value, label, sub]) => (
                <label
                  key={value}
                  className={cn(
                    "flex cursor-pointer gap-3 rounded-xl border p-4 text-sm transition",
                    form.visitType === value ? "border-primary bg-secondary" : "border-input hover:border-primary/40",
                  )}
                >
                  <input type="radio" name="visitType" value={value} checked={form.visitType === value} onChange={() => set("visitType", value)} className="mt-0.5 accent-[var(--primary)]" />
                  <span>
                    <span className="block font-medium">{label}</span>
                    <span className="block text-muted-foreground">{sub}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
          <Field label="Preferred date" name="preferredDate" error={errors.preferredDate}>
            <input
              {...a11y("preferredDate")}
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              className={inputCls}
              value={form.preferredDate}
              onChange={(e) => set("preferredDate", e.target.value)}
            />
          </Field>
          <Field label="Time window" name="timeWindow" error={errors.timeWindow}>
            <select {...a11y("timeWindow")} className={inputCls} value={form.timeWindow} onChange={(e) => set("timeWindow", e.target.value)}>
              <option value="">Select…</option>
              <option value="morning">Morning (9 AM – 12 PM)</option>
              <option value="afternoon">Afternoon (12 – 4 PM)</option>
              <option value="evening">Evening (4 – 7 PM)</option>
            </select>
          </Field>

          <div className="space-y-3 sm:col-span-2">
            {(
              [
                ["consentContact", "I agree to be contacted by phone, text or email about my evaluation."],
                ["consentAccurate", "The information I've provided is accurate. I understand a licensed provider decides whether I qualify."],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="flex cursor-pointer items-start gap-3 text-sm">
                  <input
                    {...a11y(key)}
                    type="checkbox"
                    checked={form[key]}
                    onChange={(e) => set(key, e.target.checked)}
                    className="mt-0.5 size-4 accent-[var(--primary)]"
                  />
                  {label}
                </label>
                {errors[key] && <p id={`${key}-error`} className="mt-1 ml-7 text-xs font-medium text-destructive">{errors[key]}</p>}
              </div>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">
            Back
          </button>
        ) : (
          <span className="text-xs text-muted-foreground">Takes about 3 minutes</span>
        )}
        <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
          {step < steps.length - 1 ? "Continue" : "Request my evaluation"}
        </button>
      </div>
    </form>
  );
}
