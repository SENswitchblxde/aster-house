'use client';

import { useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import Button from './Button';
import { FileField, RadioGroup, SelectField, TextArea, TextField } from './FormField';

const INTENTS = [
  'Publish a finished manuscript',
  'Ghostwriting',
  'Manuscript assessment',
  'Editing',
  'Book design',
  'Bespoke book',
  'Corporate/institutional book',
  'Other',
] as const;

/** Maps ?service= values to the option the form should arrive pre-set to. */
const SERVICE_MAP: Record<string, (typeof INTENTS)[number]> = {
  publishing: 'Publish a finished manuscript',
  publish: 'Publish a finished manuscript',
  ghostwriting: 'Ghostwriting',
  editorial: 'Manuscript assessment',
  editing: 'Editing',
  design: 'Book design',
  create: 'Book design',
  bespoke: 'Bespoke book',
  corporate: 'Corporate/institutional book',
};

const MANUSCRIPT_STATES = ['Yes, finished', 'Partly complete', 'No, just an idea'];

const GENRES = [
  'Fiction',
  'Poetry',
  'Memoir or biography',
  'Business or professional',
  'Academic or specialist',
  "Children's",
  'Art or illustrated',
  'Family or legacy',
  'Other',
];

const BUDGETS = [
  'Not sure yet',
  'Under ₹1,00,000',
  '₹1,00,000 – ₹3,00,000',
  '₹3,00,000 – ₹6,00,000',
  'Above ₹6,00,000',
];

const SOURCES = ['Search', 'A recommendation', 'Social media', 'The Aster House Books Journal', 'An event', 'Other'];

export default function EnquiryForm() {
  const params = useSearchParams();
  const preset = SERVICE_MAP[(params.get('service') ?? '').toLowerCase()] ?? '';
  const [intent, setIntent] = useState<string>(preset);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * The site is statically exported, so there is no server of our own to post
   * to. Set NEXT_PUBLIC_FORM_ENDPOINT to a form service (Formspree, Getform,
   * Basin, Web3Forms) and the whole payload — including the manuscript file —
   * goes straight there. Swap this for a fetch to your own API route the
   * moment you move off a static host.
   */
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!endpoint) {
      // Not configured yet — don't pretend the message went anywhere.
      setError(
        'The form isn\u2019t connected yet. Please email hello@asterhousebooks.com and we\u2019ll pick it up from there.',
      );
      return;
    }

    setSending(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(true);
    } catch {
      setError(
        'That didn\u2019t send. Check your connection and try again, or email hello@asterhousebooks.com.',
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="border-t-2 border-burgundy pt-10">
        <h2 className="font-display text-display-sm text-ink">Thank you — that&apos;s with us.</h2>
        <p className="mt-5 max-w-measure font-text text-body text-ink-soft">
          A real person reads every enquiry. You&apos;ll hear back within two working days, usually
          with a question or two before we say anything about cost. If your project is urgent, reply
          to the acknowledgement email and say so.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-14" noValidate={false}>
      <fieldset className="space-y-8">
        <legend className="sr-only">About you</legend>
        <p className="eyebrow text-burgundy">i &mdash; About you</p>
        <div className="grid gap-8 sm:grid-cols-2">
          <TextField id="name" name="name" label="Name" required autoComplete="name" />
          <TextField id="email" name="email" label="Email" type="email" required autoComplete="email" />
          <TextField id="phone" name="phone" label="Phone" type="tel" autoComplete="tel" optional />
          <TextField id="country" name="country" label="Country" autoComplete="country-name" />
        </div>
      </fieldset>

      <fieldset className="space-y-8">
        <legend className="sr-only">About the book</legend>
        <p className="eyebrow text-burgundy">ii &mdash; About the book</p>

        <SelectField
          id="intent"
          name="intent"
          label="What are you looking for?"
          options={[...INTENTS]}
          value={intent}
          onChange={setIntent}
          required
        />

        <RadioGroup
          legend="Do you have a manuscript?"
          name="manuscript"
          options={MANUSCRIPT_STATES}
        />

        <div className="grid gap-8 sm:grid-cols-2">
          <SelectField id="genre" name="genre" label="Genre or type" options={GENRES} />
          <TextField
            id="wordcount"
            name="wordcount"
            label="Approximate word count"
            optional
            placeholder="e.g. 65,000"
            hint="A rough estimate is fine. Leave blank if there is no draft yet."
          />
        </div>

        <TextArea
          id="description"
          name="description"
          label="Tell us about the project"
          rows={7}
          required
          placeholder="What the book is, who it is for, where you have got to, and what you think you need."
        />

        <FileField
          id="manuscript-file"
          name="manuscriptFile"
          label="Upload manuscript"
          hint="DOC, DOCX, PDF, RTF or TXT. A sample chapter is often more useful than the whole thing."
        />
      </fieldset>

      <fieldset className="space-y-8">
        <legend className="sr-only">Practicalities</legend>
        <p className="eyebrow text-burgundy">iii &mdash; Practicalities</p>
        <div className="grid gap-8 sm:grid-cols-2">
          <SelectField id="budget" name="budget" label="Budget range" options={BUDGETS} optional />
          <SelectField id="source" name="source" label="How did you hear about us?" options={SOURCES} optional />
        </div>
      </fieldset>

      <div className="border-t border-ink/15 pt-10">
        {error && (
          <p
            role="alert"
            className="mb-8 max-w-measure border-l-2 border-burgundy pl-5 font-text text-[0.95rem] leading-relaxed text-ink"
          >
            {error}
          </p>
        )}
        <Button type="submit" variant="primary" size="lg">
          {sending ? 'Sending\u2026' : 'Start the conversation'}
        </Button>
        <p className="mt-6 max-w-measure font-text text-[0.9rem] leading-relaxed text-ink-faint">
          Your material stays confidential and is read only by our editorial team. We do not share
          enquiries, manuscripts or contact details with anyone.
        </p>
      </div>
    </form>
  );
}
