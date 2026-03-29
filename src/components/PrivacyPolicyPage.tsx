import type { ReactNode } from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="px-5 pb-20 pt-32 sm:px-6 sm:pb-24">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,17,29,0.94),rgba(6,10,18,0.98))] shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
        <div className="border-b border-white/8 px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-industrial-accent">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-[2.8rem]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            Last updated: March 29, 2026
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Welcome to Starosta Industrial.
            <br />
            We respect the privacy of visitors to our website and handle personal information in accordance with applicable Israeli law.
          </p>
        </div>

        <div className="space-y-10 px-6 py-8 sm:px-10 sm:py-10">
          <PolicySection title="1. General">
            <p>
              This Privacy Policy explains what personal information we may receive through the website, in which cases such information is voluntarily provided by you, the purposes for which it is used, how we handle it, and how you may contact us regarding such information.
            </p>
            <p>
              This policy applies to personal information provided to us or received by us in connection with the use of the website, including when you contact us through the contact form, by sending a message to the email address published on the website, or by any other communication initiated through the website.
            </p>
          </PolicySection>

          <PolicySection title="2. Contact Methods">
            <p>This website allows visitors to contact us in two main ways:</p>
            <PolicyList
              items={[
                "through the contact form available on the website",
                "by sending a direct message to the email address published on the website",
              ]}
            />
            <p>
              Both options are provided in order to allow visitors and potential clients to contact us conveniently, whether by direct email or by using a structured form that may make follow-up easier and more organized.
            </p>
          </PolicySection>

          <PolicySection title="3. Information We May Receive">
            <p>
              When you contact us through the website or using the contact information published on it, we may receive personal information that you voluntarily choose to provide, including:
            </p>
            <PolicyList
              items={[
                "full name",
                "email address",
                "phone number",
                "company or organization name",
                "job title",
                "message content",
                "any additional information you choose to include",
              ]}
            />
            <p>
              In addition, certain technical information may be collected automatically during the use of the website, such as IP address, browser type, operating system, pages viewed, access times, and other technical usage data, where relevant for the operation, maintenance, security, or basic analytics of the website.
            </p>
          </PolicySection>

          <PolicySection title="4. Purpose of Use">
            <p>
              Personal information provided to us or received by us will be used only for reasonable, defined, and relevant purposes connected with the operation of the website and communication with you, including:
            </p>
            <PolicyList
              items={[
                "responding to your inquiry",
                "contacting you regarding your request",
                "maintaining and reasonably documenting business communications",
                "evaluating a potential service engagement, collaboration, meeting, or follow-up",
                "operating, maintaining, and securing the website",
                "improving website usability and understanding general technical or statistical patterns of use, where relevant",
              ]}
            />
            <p>
              We do not use personal information for purposes that are not reasonably related to the purposes for which it was collected, unless permitted or required by law.
            </p>
          </PolicySection>

          <PolicySection title="5. Whether You Are Required to Provide Information">
            <p>
              Providing personal information through the website, through the contact form, or by sending a message to the email address published on the website is voluntary.
            </p>
            <p>
              You are not legally required to provide your personal information. However, if you do not provide the information relevant to your inquiry, we may not be able to respond, contact you, continue handling your request, or provide an appropriate response.
            </p>
          </PolicySection>

          <PolicySection title="6. Source of Information">
            <p>
              As a rule, the personal information we receive is obtained directly from you when you choose to contact us through the website, the contact form, the published email address, or otherwise through your use of the website.
            </p>
            <p>
              In some cases, limited technical information may be collected automatically through hosting, security, maintenance, or basic website operation systems, where relevant.
            </p>
          </PolicySection>

          <PolicySection title="7. Sharing Information with Third Parties">
            <p>
              We do not sell personal information, do not trade in personal information, and do not transfer personal information to third parties for data trading purposes.
            </p>
            <p>
              However, information may be shared with service providers who assist us with technical or operational functions where reasonably required for operating the website or managing communications with you, such as:
            </p>
            <PolicyList
              items={[
                "website hosting or infrastructure providers",
                "information security providers",
                "email or communication service providers",
                "technical support, maintenance, or basic analytics providers",
              ]}
            />
            <p>
              In such cases, information will be shared only to the extent reasonably necessary for the relevant purpose and subject to applicable law.
            </p>
            <p>
              We may also disclose personal information if required by law, court order, lawful request by a competent authority, or where necessary to protect our legal rights.
            </p>
          </PolicySection>

          <PolicySection title="8. Retention">
            <p>
              We retain personal information only for as long as reasonably necessary for responding to inquiries, managing business communications, maintaining reasonable records, complying with legal obligations, protecting our rights, or serving a legitimate operational purpose related to the website and our business.
            </p>
            <p>
              When personal information is no longer needed for the purposes for which it was collected, we will act to reduce its retention, delete it, or discontinue its use where reasonably possible under the circumstances.
            </p>
          </PolicySection>

          <PolicySection title="9. Data Security">
            <p>
              We apply reasonable and customary measures designed to protect the personal information we hold, taking into account the nature of the website, the scope of activity, the type of information involved, and the relevant risks.
            </p>
            <p>
              Such measures may include secure communications, restricted access to information, and the use of reasonable service providers for hosting, email, and website security.
            </p>
            <p>
              However, no security system is completely immune from unauthorized access, loss, misuse, or technological failure, and therefore we cannot guarantee absolute security.
            </p>
          </PolicySection>

          <PolicySection title="10. Cookies, Logs, and Technical Tools">
            <p>
              The website may use standard technical tools required for its proper operation, security, error monitoring, and usability improvement. These may include log files, system components, cookies, or similar technologies where reasonably necessary for the normal and proper functioning of the website.
            </p>
            <p>
              As of the date of this Privacy Policy, the website does not use advertising cookies, marketing trackers, or profiling tools for promotional purposes.
            </p>
          </PolicySection>

          <PolicySection title="11. Right of Access and Correction">
            <p>
              Subject to applicable law, you may contact us to request access to personal information we hold about you.
            </p>
            <p>
              If you believe that personal information we hold is inaccurate, incomplete, unclear, or outdated, you may also request that it be corrected or updated, subject to applicable law.
            </p>
          </PolicySection>

          <PolicySection title="12. Privacy Contact">
            <p>
              For questions, requests for access or correction, or any other privacy-related inquiry, you may contact us using the contact details published on the website, including at:
            </p>
            <p>
              <a
                href="mailto:starosta.ing@gmail.com"
                className="font-medium text-industrial-accent transition-colors hover:text-white"
              >
                starosta.ing@gmail.com
              </a>
            </p>
          </PolicySection>

          <PolicySection title="13. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time as needed in order to reflect changes in the website, its operation, or applicable legal requirements.
            </p>
            <p>
              The updated version published on the website will be the binding version from the date of publication unless stated otherwise.
            </p>
          </PolicySection>
        </div>
      </section>
    </main>
  );
}

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-[1.45rem]">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-slate-300 sm:text-base">{children}</div>
    </section>
  );
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-industrial-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
