import React from "react";
import styles from "./Privacy.module.css";

const Privacy = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.secondaryContainer}>
        <div className={styles.headingContainer}>
          <h2>Privacy Policy</h2>
          <p className="paragraph-medium">
            Welcome to <b>Abhirachnaa</b> (
            <a href="https://abhirachnaa.com/" target="_blank">
              www.abhirachnaa.com
            </a>
            ), we are committed to respecting and protecting your privacy. This
            Privacy Policy explains how we collect, use, and protect your
            personal data when you visit our website, interact with us, or apply
            for career opportunities. By using this site, you agree to the terms
            outlined in this policy.
          </p>
        </div>
        <hr />

        <div className={styles.pointsContainer}>
          <div>
            <h4>1. Information We Collect</h4>
            <p>
              When you interact with our website, we may collect the following
              personal information:
              <ul>
                <li>
                  <b>Contact Details</b>: Name, email address (e.g., Gmail), and
                  phone number submitted through forms.
                </li>
                <li>
                  <b>Location Data</b>: City, state, or area information for
                  service customization.
                </li>
                <li>
                  <b>Career-Related Data</b>: Resume, portfolio links, job
                  preferences, and other application details provided through
                  our Careers page.
                </li>
                <li>
                  <b>Usage Data</b>: Device type, browser type, pages visited,
                  IP address, and time spent on the site, collected via
                  analytics tools.
                </li>
                <li>
                  <b>Cookies</b>: Small text files that enhance your browsing
                  experience and help us understand website usage patterns.
                </li>
              </ul>
            </p>
          </div>
          <div>
            <h4>2. How We Use Your Information</h4>
            <p>
              We collect and use your personal information to:
              <ul>
                <li>Respond to service inquiries or design requests.</li>
                <li>Schedule consultations and follow up on leads.</li>
                <li>Evaluate and process job applications.</li>
                <li>
                  Improve the functionality and user experience of our website.
                </li>
                <li>
                  Send updates, promotions, and service-related communication
                  (only with your consent).
                </li>
                <li>
                  Analyze traffic and usage patterns using tools like Google
                  Analytics.
                </li>
              </ul>
            </p>
          </div>
          <div>
            <h4>3. Resume and Job Application Data</h4>
            <p>
              If you apply for a job or internship through our Careers section:
              <ul>
                <li>
                  Your resume and accompanying details will only be used
                  internally for hiring purposes.
                </li>
                <li>
                  We may retain your information for future openings unless you
                  request its removal.
                </li>
                <li>
                  Your data will be stored securely and only shared with
                  authorized hiring personnel.
                </li>
              </ul>
            </p>
          </div>
          <div>
            <h4>4. Data Sharing & Disclosure</h4>
            <p>
              We do <b>not</b> sell, trade, or rent your personal information to
              third parties. However, we may share limited data with trusted
              third-party service providers who help us operate our business,
              such as:
              <ul>
                <li>Web hosting providers</li>
                <li>Email marketing tools</li>
                <li>Withdraw consent for marketing communication.</li>
                <li>Analytics services</li>
              </ul>
              These third parties are obligated to keep your information
              confidential and secure.
            </p>
          </div>
          <div>
            <h4>5. Your Rights & Choices</h4>
            <p>
              You have the right to:
              <ul>
                <li>Request access to the personal data we hold about you.</li>
                <li>
                  Ask for correction or deletion of inaccurate or outdated
                  information.
                </li>
                <li>Withdraw consent for marketing communication.</li>
                <li>
                  Request the removal of your resume or application data at any
                  time.
                </li>
              </ul>
              To exercise these rights, please contact us at{" "}
              <b>
                <a href="mailTo:sales@abhirachnaa.com">
                  sales@abhirachnaa.com
                </a>
              </b>
            </p>
          </div>
          <div>
            <h4>6. Cookies & Tracking Technologies</h4>
            <p>
              We use cookies to personalize your experience, keep our site
              secure, and understand how visitors use our platform. You can
              manage cookie preferences through your browser settings. Note that
              disabling cookies may limit some functionality of the site.
            </p>
          </div>
          <div>
            <h4>7. Data Security</h4>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal data from unauthorized access, disclosure,
              alteration, or destruction. However, no system can be 100% secure.
              By using our website, you acknowledge this risk.
            </p>
          </div>
          <div>
            <h4>8. Third-Party Links</h4>
            <p>
              Our website may contain links to external websites. We are not
              responsible for the privacy practices or content of these
              third-party websites. We encourage you to review their privacy
              policies separately.
            </p>
          </div>
          <div>
            <h4>9. Policy Updates</h4>
            <p>
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal obligations. All changes will be posted
              on this page with the updated date.
            </p>
          </div>
        </div>
        <hr />
        <p className={styles.bottomPara}>
          <b>
            If you have questions or concerns about these Terms of Use, please
            contact us at{" "}
            <a href="mailTo:sales@abhirachnaa.com">
              📧sales@abhirachnaa.com
            </a>
          </b>
        </p>
      </div>
    </div>
  );
};

export default Privacy;
