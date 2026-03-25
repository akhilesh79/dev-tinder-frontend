import PolicyLayout from '../../components/PolicyLayout';

const Section = ({ title, children }) => (
  <section className='mb-8'>
    <h2 className='text-xl font-semibold mb-3 text-[color:var(--text-primary)]'>{title}</h2>
    <div className='text-[color:var(--text-secondary)] text-sm leading-relaxed space-y-3'>{children}</div>
  </section>
);

const PrivacyPolicy = () => {
  return (
    <PolicyLayout title='Privacy Policy' lastUpdated='March 25, 2026'>
      <p className='text-[color:var(--text-secondary)] text-sm leading-relaxed mb-8'>
        DevTinder ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we
        collect, use, disclose, and safeguard your information when you use our platform. Please read this policy
        carefully. By using DevTinder, you agree to the practices described here.
      </p>

      <Section title='1. Information We Collect'>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Account Information:</strong> When you register, we
          collect your name, email address, password (hashed), GitHub profile URL, and profile photo.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Profile Data:</strong> Technical skills, years of
          experience, bio, current role, location (city/country), and any other information you add to your developer
          profile.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Usage Data:</strong> Information about how you interact
          with the platform — swipes, connections made, messages sent, pages visited, time spent, and feature usage.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Payment Information:</strong> If you subscribe to a
          premium plan, payment details are processed by Razorpay. We do not store your card numbers or banking
          credentials; we only receive a transaction ID and subscription status from Razorpay.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Device & Log Data:</strong> IP address, browser type,
          operating system, referring URLs, and diagnostic data collected automatically when you access our services.
        </p>
      </Section>

      <Section title='2. How We Use Your Information'>
        <p>We use the information we collect to:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Create and maintain your account</li>
          <li>Provide developer matching and networking features</li>
          <li>Process premium subscription payments via Razorpay</li>
          <li>Send you service-related notifications and updates</li>
          <li>Personalise your feed and match recommendations</li>
          <li>Prevent fraud, spam, and abuse</li>
          <li>Improve and develop new features for the platform</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          We do <strong className='text-[color:var(--text-primary)]'>not</strong> sell your personal data to third
          parties.
        </p>
      </Section>

      <Section title='3. How We Share Your Information'>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Other Users:</strong> Your profile information (name,
          photo, skills, bio) is visible to other registered users on the platform as part of the matching experience.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Payment Processors:</strong> We use Razorpay to process
          payments. Data shared with Razorpay is governed by their Privacy Policy. Razorpay is PCI-DSS compliant.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Service Providers:</strong> We may share data with
          trusted third-party vendors (cloud hosting, analytics, email delivery) who assist in operating the platform,
          subject to confidentiality agreements.
        </p>
        <p>
          <strong className='text-[color:var(--text-primary)]'>Legal Requirements:</strong> We may disclose your
          information if required by law, court order, or to protect the rights and safety of DevTinder, our users, or
          the public.
        </p>
      </Section>

      <Section title='4. Cookies and Tracking Technologies'>
        <p>We use cookies and similar technologies to:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Keep you logged in (session cookies)</li>
          <li>Remember your theme preferences</li>
          <li>Understand how users interact with the platform (analytics)</li>
          <li>Prevent fraudulent activity</li>
        </ul>
        <p>
          You can control cookie settings through your browser. Disabling cookies may affect some platform features.
        </p>
      </Section>

      <Section title='5. Data Retention'>
        <p>
          We retain your personal data for as long as your account is active or as needed to provide services. You may
          request account deletion at any time. Upon deletion, your profile data is removed within 30 days, except where
          we are legally required to retain certain records.
        </p>
        <p>Payment transaction records are retained for 5 years as required by applicable financial regulations.</p>
      </Section>

      <Section title='6. Data Security'>
        <p>We implement industry-standard security measures including:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>HTTPS/TLS encryption for all data in transit</li>
          <li>Hashed and salted password storage (bcrypt)</li>
          <li>Secure, access-controlled database servers</li>
          <li>Regular security audits and vulnerability assessments</li>
        </ul>
        <p>
          No method of electronic transmission is 100% secure. In the unlikely event of a data breach, we will notify
          affected users in accordance with applicable law.
        </p>
      </Section>

      <Section title='7. Your Rights'>
        <p>You have the right to:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            <strong className='text-[color:var(--text-primary)]'>Access:</strong> Request a copy of the personal data we
            hold about you
          </li>
          <li>
            <strong className='text-[color:var(--text-primary)]'>Correction:</strong> Update or correct inaccurate
            information through your profile settings
          </li>
          <li>
            <strong className='text-[color:var(--text-primary)]'>Deletion:</strong> Request deletion of your account and
            associated data
          </li>
          <li>
            <strong className='text-[color:var(--text-primary)]'>Opt-out:</strong> Unsubscribe from marketing
            communications at any time
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{' '}
          <strong className='text-[color:var(--text-primary)]'>privacy@tinder-dev.in</strong>.
        </p>
      </Section>

      <Section title='8. Third-Party Links'>
        <p>
          DevTinder may contain links to external websites or GitHub profiles of other users. We are not responsible for
          the privacy practices of those websites. We encourage you to review the privacy policies of any third-party
          sites you visit.
        </p>
      </Section>

      <Section title="9. Children's Privacy">
        <p>
          DevTinder is intended for users aged 18 and older. We do not knowingly collect personal data from minors. If
          we become aware that a minor has registered, we will promptly delete their account and data.
        </p>
      </Section>

      <Section title='10. Changes to This Policy'>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of significant changes by email or
          through an in-app notification. Continued use of the platform after changes constitutes acceptance of the
          updated policy.
        </p>
      </Section>

      <Section title='11. Contact Us'>
        <p>If you have questions, concerns, or requests regarding this Privacy Policy, please contact us at:</p>
        <div className='mt-2 p-4 rounded-lg bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-[color:var(--text-secondary)]'>
          <p>
            <strong className='text-[color:var(--text-primary)]'>DevTinder</strong>
          </p>
          <p>Email: privacy@tinder-dev.in</p>
          <p>Website: tinder-dev.in</p>
        </div>
      </Section>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
