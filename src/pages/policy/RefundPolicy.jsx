import PolicyLayout from '../../components/PolicyLayout';

const Section = ({ title, children }) => (
  <section className='mb-8'>
    <h2 className='text-xl font-semibold mb-3 text-[color:var(--text-primary)]'>{title}</h2>
    <div className='text-[color:var(--text-secondary)] text-sm leading-relaxed space-y-3'>{children}</div>
  </section>
);

const InfoBox = ({ title, children }) => (
  <div className='my-4 p-4 rounded-lg bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)]'>
    {title && <p className='font-semibold text-[color:var(--text-primary)] mb-1'>{title}</p>}
    <div className='text-[color:var(--text-secondary)] text-sm space-y-1'>{children}</div>
  </div>
);

const RefundPolicy = () => {
  return (
    <PolicyLayout title='Refund Policy' lastUpdated='March 25, 2026'>
      <p className='text-[color:var(--text-secondary)] text-sm leading-relaxed mb-8'>
        This Refund Policy describes when and how DevTinder processes refunds for premium subscription purchases. We
        want you to be satisfied with DevTinder Premium, and we aim to handle all refund requests promptly and fairly.
      </p>

      <Section title='1. Overview'>
        <p>
          DevTinder offers paid premium subscriptions ("DevTinder Premium") processed securely through Razorpay, a
          PCI-DSS compliant payment gateway. This policy applies to all subscription purchases made on the DevTinder
          platform.
        </p>
      </Section>

      <Section title='2. Eligibility for Refund'>
        <p>You are eligible for a full refund if:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            You submit a refund request within{' '}
            <strong className='text-[color:var(--text-primary)]'>7 calendar days</strong> of your subscription purchase
            or renewal date
          </li>
          <li>
            You have not substantially used the premium features during that period (fewer than 5 premium-only actions)
          </li>
          <li>This is your first refund request on the account</li>
        </ul>
        <p>
          <strong className='text-[color:var(--text-primary)]'>No refund</strong> will be issued if:
        </p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>More than 7 days have passed since the payment was made</li>
          <li>You have significantly used the premium features during the period</li>
          <li>The account was suspended or terminated due to a violation of our Terms of Service</li>
          <li>A refund was already issued for the same account within the last 12 months</li>
        </ul>
      </Section>

      <Section title='3. How to Request a Refund'>
        <p>To request a refund, send an email to our support team with the following information:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Your registered email address / account username</li>
          <li>The date of the payment</li>
          <li>The Razorpay transaction / payment ID (available in your email receipt)</li>
          <li>Reason for the refund request</li>
        </ul>

        <InfoBox title='Refund Request Contact'>
          <p>
            Email: <strong>refunds@tinder-dev.in</strong>
          </p>
          <p>
            Subject Line: <em>Refund Request – [Your Registered Email]</em>
          </p>
          <p>Response time: within 2 business days</p>
        </InfoBox>
      </Section>

      <Section title='4. Refund Processing Timeline'>
        <p>Once your refund is approved:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            The refund will be initiated within{' '}
            <strong className='text-[color:var(--text-primary)]'>2 business days</strong> of approval
          </li>
          <li>
            The amount will be credited to your original payment method within{' '}
            <strong className='text-[color:var(--text-primary)]'>5–7 business days</strong>, depending on your bank or
            card issuer
          </li>
          <li>UPI refunds are typically processed within 2–3 business days</li>
          <li>Net banking refunds may take up to 7 business days</li>
        </ul>
        <p>
          Refunds are processed through Razorpay. DevTinder has no control over the time taken by your bank to reflect
          the refunded amount.
        </p>
      </Section>

      <Section title='5. Subscription Cancellation'>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Cancelling vs. Refunding:</strong> Cancelling your
          subscription stops future charges but does not automatically trigger a refund for the current billing period.
          If you cancel within the 7-day refund window and are eligible, you may additionally request a refund per
          Section 2.
        </p>
        <p>
          After cancellation, you will continue to have access to premium features until the end of your current paid
          billing period. Your account will then revert to the free tier.
        </p>
        <p>
          To cancel, go to{' '}
          <strong className='text-[color:var(--text-primary)]'>Account Settings → Subscription → Cancel Plan</strong>,
          or contact us at support@tinder-dev.in.
        </p>
      </Section>

      <Section title='6. Failed or Duplicate Payments'>
        <p>
          If your account was charged multiple times for the same subscription period due to a technical error, please
          contact us immediately at <strong className='text-[color:var(--text-primary)]'>refunds@tinder-dev.in</strong>{' '}
          with the transaction details. Duplicate payments are refunded in full without any conditions.
        </p>
        <p>
          If a payment is debited from your account but the premium subscription is not activated, we will investigate
          and either activate your subscription or issue a full refund within 3 business days.
        </p>
      </Section>

      <Section title='7. Changes to This Policy'>
        <p>
          We reserve the right to modify this Refund Policy at any time. Changes will be effective upon posting to this
          page. We encourage you to review this policy periodically. Subscriptions active at the time of a policy change
          will be honoured under the terms in effect at the time of purchase, for that billing period.
        </p>
      </Section>

      <Section title='8. Contact Us'>
        <p>For any questions or concerns about this Refund Policy, please reach out to us:</p>
        <InfoBox>
          <p>
            <strong className='text-[color:var(--text-primary)]'>DevTinder – Support</strong>
          </p>
          <p>Refund queries: refunds@tinder-dev.in</p>
          <p>General support: support@tinder-dev.in</p>
          <p>Website: tinder-dev.in</p>
        </InfoBox>
      </Section>
    </PolicyLayout>
  );
};

export default RefundPolicy;
