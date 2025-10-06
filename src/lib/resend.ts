import { Resend } from 'resend';
import React from 'react';

export type ReactEmailComponent<Props = any> = React.ComponentType<Props>;

type SendOptions<Props> = {
  apiKey?: string;
  from: string;
  to: string | string[];
  subject: string;
  html?: string;
  component?: ReactEmailComponent<Props>;
  props?: Props;
  headers?: Record<string, string>;
};

/**
 * sendResendEmail - small typed wrapper around Resend's emails.send that accepts
 * a React component + props and passes a React element to the `react` option.
 *
 * This enforces component props at compile time when you call it as
 * sendResendEmail<MyProps>({ component: MyComponent, props: myProps, ... })
 */
export async function sendResendEmail<Props = any>(opts: SendOptions<Props>) {
  const apiKey = opts.apiKey || process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY not configured');

  const resend = new Resend(apiKey as string);

  const sendPayload: any = {
    from: opts.from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    headers: opts.headers,
  };

  if (opts.component) {
    // Create a React element from the typed component and props.
    // Cast to `any` to avoid React.createElement overload typing issues in .ts files.
    sendPayload.react = React.createElement(opts.component as any, opts.props as any);
  }

  return await resend.emails.send(sendPayload);
}

export default sendResendEmail;
