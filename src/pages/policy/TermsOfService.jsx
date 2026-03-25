import PolicyLayout from '../../components/PolicyLayout';
import { Link } from 'react-router-dom';

const Section = ({ title, children }) => (
  <section className='mb-8'>
    <h2 className='text-xl font-semibold mb-3 text-[color:var(--text-primary)]'>{title}</h2>
    <div className='text-[color:var(--text-secondary)] text-sm leading-relaxed space-y-3'>{children}</div>
  </section>
);

const TermsOfService = () => {
  return (
    <PolicyLayout title='Terms of Service' lastUpdated='March 25, 2026'>
      <p className='text-[color:var(--text-secondary)] text-sm leading-relaxed mb-8'>
        Welcome to DevTinder. These Terms of Service ("Terms") govern your access to and use of the DevTinder platform,
        including our website, mobile application, and all related services (collectively, the "Service"). By creating
        an account or using DevTinder, you agree to be bound by these Terms. If you do not agree, please do not use the
        Service.
      </p>

      <Section title='1. Eligibility'>
        <p>
          You must be at least 18 years of age to use DevTinder. By using the Service, you represent and warrant that:
        </p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>You are at least 18 years old</li>
          <li>You have the legal capacity to enter into a binding agreement</li>
          <li>You are not prohibited from using the Service under any applicable law</li>
          <li>You will use the Service only for lawful purposes</li>
        </ul>
      </Section>

      <Section title='2. Account Registration'>
        <p>To access most features, you must create an account. You agree to:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Provide accurate, current, and complete information during registration</li>
          <li>Keep your account credentials confidential and not share them with anyone</li>
          <li>Immediately notify us of any unauthorised use of your account</li>
          <li>Be responsible for all activity that occurs under your account</li>
        </ul>
        <p>
          You may not create more than one account per person. We reserve the right to suspend or terminate accounts
          that violate these Terms.
        </p>
      </Section>

      <Section title='3. Acceptable Use Policy'>
        <p>DevTinder is a professional developer networking platform. You agree not to:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Post false, misleading, or fraudulent profile information</li>
          <li>Harass, threaten, or abuse other users</li>
          <li>Send spam, unsolicited messages, or promotional content</li>
          <li>Attempt to reverse-engineer, scrape, or extract data from the platform</li>
          <li>Upload malicious code, viruses, or harmful content</li>
          <li>Impersonate any person or entity</li>
          <li>Use the Service for any illegal or unauthorised purpose</li>
          <li>Attempt to gain unauthorised access to other accounts or our systems</li>
        </ul>
        <p>Violation of this policy may result in immediate account termination without refund.</p>
      </Section>

      <Section title='4. Premium Subscription'>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Overview:</strong> DevTinder offers a premium
          subscription ("DevTinder Premium") that unlocks enhanced features, including but not limited to: unlimited
          connection requests, priority placement in feeds, a verified premium badge, advanced developer filters, and
          the ability to see who viewed your profile.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Billing:</strong> Premium subscriptions are billed on a
          recurring monthly or annual basis, depending on the plan you select. Payments are processed securely through
          Razorpay. By subscribing, you authorise us to charge your selected payment method at the beginning of each
          billing period.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Auto-Renewal:</strong> Subscriptions automatically renew
          at the end of each billing cycle unless you cancel before the renewal date. You can manage or cancel your
          subscription from your account settings.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Price Changes:</strong> We may change subscription prices
          with at least 30 days' notice. Continued use after a price change constitutes your acceptance of the new
          price.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Refunds:</strong> Please refer to our{' '}
          <Link to='/refund-policy' className='text-rose-500 hover:underline'>
            Refund Policy
          </Link>{' '}
          for full details on cancellations and refunds.
        </p>
      </Section>

      <Section title='5. User Content'>
        <p>
          You retain ownership of the content you post on DevTinder (profile information, messages, etc.). By posting
          content, you grant DevTinder a non-exclusive, worldwide, royalty-free licence to use, display, and distribute
          that content solely for the purpose of operating the Service.
        </p>
        <p>
          You are solely responsible for the content you post. You must not post content that is defamatory, obscene,
          infringing, or otherwise unlawful.
        </p>
      </Section>

      <Section title='6. Intellectual Property'>
        <p>
          All content on the DevTinder platform (excluding user content) — including the logo, design, code, features,
          and text — is the intellectual property of DevTinder and is protected by applicable copyright and trademark
          laws. You may not copy, reproduce, or distribute any part of the platform without our express written
          permission.
        </p>
      </Section>

      <Section title='7. Disclaimer of Warranties'>
        <p>
          DevTinder is provided on an "as is" and "as available" basis, without warranties of any kind, either express
          or implied. We do not guarantee that:
        </p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>The Service will be uninterrupted, error-free, or completely secure</li>
          <li>Any specific developer connections or collaborations will result from using the platform</li>
          <li>User-provided information on the platform is accurate or up to date</li>
        </ul>
      </Section>

      <Section title='8. Limitation of Liability'>
        <p>
          To the maximum extent permitted by applicable law, DevTinder and its officers, directors, employees, and
          agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising
          out of or related to your use of the Service, even if we have been advised of the possibility of such damages.
        </p>
        <p>
          Our total liability to you for any claim arising from your use of the Service shall not exceed the amount you
          paid to DevTinder in the 3 months immediately preceding the claim.
        </p>
      </Section>

      <Section title='9. Termination'>
        <p>
          <strong className='text-[color:var(--text-primary)]'>By You:</strong> You may delete your account at any time
          through account settings. Deletion cancels any active premium subscription (no further charges) but does not
          entitle you to a refund for the current billing period, subject to our Refund Policy.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>By Us:</strong> We may suspend or terminate your account
          at any time if we believe you have violated these Terms, without prior notice and without liability to you.
        </p>
      </Section>

      <Section title='10. Governing Law and Dispute Resolution'>
        <p>
          These Terms are governed by the laws of India. Any disputes arising from or related to these Terms or your use
          of the Service shall be subject to the exclusive jurisdiction of the courts located in India.
        </p>
        <p>
          Before initiating any legal action, we encourage you to contact us at{' '}
          <strong className='text-[color:var(--text-primary)]'>support@tinder-dev.in</strong> to resolve disputes
          informally.
        </p>
      </Section>

      <Section title='11. Changes to Terms'>
        <p>
          We reserve the right to modify these Terms at any time. We will notify you of material changes via email or
          in-app notification at least 14 days before the changes take effect. Your continued use of the Service after
          the effective date constitutes acceptance of the revised Terms.
        </p>
      </Section>

      <Section title='12. Contact Us'>
        <p>For questions about these Terms, please contact us:</p>
        <div className='mt-2 p-4 rounded-lg bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-[color:var(--text-secondary)]'>
          <p>
            <strong className='text-[color:var(--text-primary)]'>DevTinder</strong>
          </p>
          <p>Email: support@tinder-dev.in</p>
          <p>Website: tinder-dev.in</p>
        </div>
      </Section>
    </PolicyLayout>
  );
};

export default TermsOfService;
