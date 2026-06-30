import React from "react";
import styles from "./Terms.module.css";

const Terms = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.secondaryContainer}>
        <div className={styles.headingContainer}>
          <h2>Terms Of Use</h2>
          <p className="paragraph-medium">
            Welcome to <b>Abhirachnaa</b> (
            <a href="https://abhirachnaa.com/" target="_blank">
              www.abhirachnaa.com
            </a>
            ), your complete interior design partner. These Terms of Use govern
            your access to and use of our website and services. By using our
            site, you agree to comply with these terms. If you do not agree,
            please do not use the site.
          </p>
        </div>

        <hr />

        <div className={styles.pointsContainer}>
          <div>
            <h4>1. Eligibility</h4>
            <p>
              You must be at least 18 years old to access and use this website.
              By using this site, you confirm that you meet this requirement.
            </p>
          </div>
          <div>
            <h4>2. About Abhirachnaa</h4>
            <p>
              Abhirachnaa is an interior design company based in{" "}
              <b>Mohali, India</b>, offering end-to-end solutions for
              residential and commercial spaces. Our services include design
              consultation, 3D visualizations, space planning, material
              sourcing, and execution.
            </p>
          </div>
          <div>
            <h4>3. Acceptable Use</h4>
            <p>
              You agree to use this site only for lawful purposes. You must not:
              <ul>
                <li>
                  Use the site to spread spam, malware, or harmful content.
                </li>
                <li>Attempt to hack or disrupt the site’s functionality.</li>
                <li>
                  Submit false or misleading information in contact or career
                  forms.
                </li>
                <li>Violate intellectual property rights</li>
              </ul>
            </p>
          </div>
          <div>
            <h4>4. Intellectual Property</h4>
            <p>
              All content on abhirachnaa.com, including images, designs, text,
              graphics, logos, and brand elements, is the exclusive property of
              Abhirachnaa and protected by applicable copyright and trademark
              laws. You may not copy, reproduce, distribute, or reuse any
              content without prior written permission.
            </p>
          </div>
          <div>
            <h4>5. User Submissions</h4>
            <p>
              Any information you provide through our website, including contact
              forms, feedback, or job applications, must be accurate and
              truthful. We reserve the right to remove or disregard any
              submission that appears fraudulent or inappropriate.
            </p>
          </div>
          <div>
            <h4>6. Third-Party Links</h4>
            <p>
              Our website may contain links to third-party websites for your
              convenience. These sites are not under our control, and we are not
              responsible for their content, practices, or availability.
            </p>
          </div>
          <div>
            <h4>7. Limitation of Liability</h4>
            <p>
              We strive to keep our website accurate, secure, and up-to-date.
              However, we do not guarantee that the site will always be
              available or error-free. Under no circumstances will Abhirachnaa
              be liable for any direct, indirect, incidental, or consequential
              damages arising from your use of the website.
            </p>
          </div>
          <div>
            <h4>8. Modifications to the Terms</h4>
            <p>
              We reserve the right to update or modify these Terms of Use at any
              time. All changes will be posted on this page with a new effective
              date. Continued use of the site after changes are made constitutes
              your acceptance of the updated terms.
            </p>
          </div>
          <div>
            <h4>9. Governing Law</h4>
            <p>
              These terms shall be governed by and interpreted in accordance
              with the laws of <b>India</b>, with jurisdiction under the courts
              of <b>Mohali, Punjab</b>.
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

export default Terms;
