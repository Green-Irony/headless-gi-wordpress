import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSimple from '../components/HeroSimple';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function TermsPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>{siteTitle ? `${siteTitle} — Privacy Policy` : 'Privacy Policy'}</title>
        <meta name="description" content="Protecting your private information is our priority. Read how Green Irony collects, uses, and protects personal information, including cookies, security, and your rights." />
      </Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
        <HeroSimple
          title="Privacy Policy"
          subhead="Protecting your private information is our priority."
        />
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="prose prose-gi max-w-none">
            <p>
              This Statement of Privacy applies to https://greenirony.com/ and Green Irony LLC and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to Green Irony LLC include https://greenirony.com/ and Green Irony. The Green Irony website is a company site. By using the Green Irony website, you consent to the data practices described in this statement.
            </p>

            <h2>Collection of your Personal Information</h2>
            <p>
              In order to better provide you with products and services offered on our Site, Green Irony may collect personally identifiable information, such as your:
            </p>
            <ul>
              <li>First and Last Name</li>
              <li>E-mail Address</li>
              <li>Phone Number</li>
              <li>Employer</li>
              <li>Job Title</li>
            </ul>
            <p>
              We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide certain personal information to us when you elect to access certain content available on the Site. These may include: (a) signing up for newsletters; (b) downloading content; (c) signing up for events; (d) submitting the contact us form. We will use your information for, but not limited to, communicating with you in relation to services and/or products you have requested from us. We also may gather additional personal or non-personal information in the future.
            </p>

            <h2>Use of your Personal Information</h2>
            <p>
              Green Irony collects and uses your personal information to operate its website(s) and deliver the services you have requested. Green Irony may also use your personally identifiable information to inform you of other services available from Green Irony and its affiliates.
            </p>

            <h2>Sharing Information with Third Parties</h2>
            <p>
              Green Irony does not sell, rent or lease its customer lists to third parties. Green Irony may, from time to time, contact you on behalf of external business partners about a particular offering that may be of interest to you. In those cases, your unique personally identifiable information (e-mail, name, address, telephone number) is not transferred to the third party. Green Irony may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to Green Irony, and they are required to maintain the confidentiality of your information.
            </p>
            <p>
              Green Irony may disclose your personal information, without notice, if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on Green Irony or the site; (b) protect and defend the rights or property of Green Irony; and/or (c) act under exigent circumstances to protect the personal safety of users of Green Irony, or the public.
            </p>

            <h2>Tracking User Behavior</h2>
            <p>
              Green Irony may keep track of the websites and pages our users visit within Green Irony, in order to determine what Green Irony services are the most popular. This data is used to deliver customized content and advertising within Green Irony to customers whose behavior indicates that they are interested in a particular subject area.
            </p>

            <h2>Automatically Collected Information</h2>
            <p>
              Information about your computer hardware and software may be automatically collected by Green Irony. This information can include: your IP address, browser type, domain names, access times and referring website addresses. This information is used for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the Green Irony website.
            </p>

            <h2>Use of Cookies</h2>
            <p>
              The Green Irony website may use “cookies” to help you personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you.
            </p>
            <p>
              One of the primary purposes of cookies is to provide a convenience feature to save you time. The purpose of a cookie is to tell the Web server that you have returned to a specific page. For example, if you personalize Green Irony pages, or register with Green Irony site or services, a cookie helps Green Irony to recall your specific information on subsequent visits. This simplifies the process of recording your personal information, such as billing addresses, shipping addresses, and so on. When you return to the same Green Irony website, the information you previously provided can be retrieved, so you can easily use the Green Irony features that you customized.
            </p>
            <p>
              You have the ability to accept or decline cookies. Most Web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of the Green Irony services or websites you visit.
            </p>

            <h2>Links</h2>
            <p>
              This website contains links to other sites. Please be aware that we are not responsible for the content or privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.
            </p>

            <h2>Security of your Personal Information</h2>
            <p>
              Green Irony secures your personal information from unauthorized access, use, or disclosure. Green Irony uses the following methods for this purpose:
            </p>
            <ul>
              <li>SSL Protocol</li>
            </ul>
            <p>
              When personal information is transmitted to other websites, it is protected through the use of encryption, such as the Secure Sockets Layer (SSL) protocol.
            </p>
            <p>
              We strive to take appropriate security measures to protect against unauthorized access to or alteration of your personal information. Unfortunately, no data transmission over the Internet or any wireless network can be guaranteed to be 100% secure. As a result, while we strive to protect your personal information, you acknowledge that: (a) there are security and privacy limitations inherent to the Internet which are beyond our control; and (b) security, integrity, and privacy of any and all information and data exchanged between you and us through this Site cannot be guaranteed.
            </p>

            <h2>Right to Deletion</h2>
            <p>Subject to certain exceptions set out below, on receipt of a verifiable request from you, we will:</p>
            <ul>
              <li>Delete your personal information from our records; and</li>
              <li>Direct any service providers to delete your personal information from their records.</li>
            </ul>
            <p>
              Please note that we may not be able to comply with requests to delete your personal information if it is necessary to:
            </p>
            <ul>
              <li>Complete the transaction for which the personal information was collected, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, provide a good or service requested by you, or reasonably anticipated within the context of our ongoing business relationship with you, or otherwise perform a contract between you and us;</li>
              <li>Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity; or prosecute those responsible for that activity;</li>
              <li>Debug to identify and repair errors that impair existing intended functionality;</li>
              <li>Exercise free speech, ensure the right of another consumer to exercise his or her right of free speech, or exercise another right provided for by law;</li>
              <li>Comply with the California Electronic Communications Privacy Act;</li>
              <li>Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when our deletion of the information is likely to render impossible or seriously impair the achievement of such research, provided we have obtained your informed consent;</li>
              <li>Enable solely internal uses that are reasonably aligned with your expectations based on your relationship with us;</li>
              <li>Comply with an existing legal obligation; or</li>
              <li>Otherwise use your personal information, internally, in a lawful manner that is compatible with the context in which you provided the information.</li>
            </ul>

            <h2>Children Under Thirteen</h2>
            <p>
              Green Irony does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this website.
            </p>

            <h2>E-mail Communications</h2>
            <p>
              From time to time, Green Irony may contact you via email for the purpose of providing announcements, promotional offers, alerts, confirmations, surveys, and/or other general communication. In order to improve our Services, we may receive a notification when you open an email from Green Irony or click on a link therein.
            </p>
            <p>
              If you would like to stop receiving marketing or promotional communications via email from Green Irony, you may opt out of such communications by clicking on the UNSUBSCRIBE button.
            </p>

            <h2>Changes to this Statement</h2>
            <p>
              Green Irony reserves the right to change this Privacy Policy from time to time. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your account, by placing a prominent notice on our site, and/or by updating any privacy information on this page. Your continued use of the Site and/or Services available through this Site after such modifications will constitute your: (a) acknowledgment of the modified Privacy Policy; and (b) agreement to abide and be bound by that Policy.
            </p>

            <h2>Contact Information</h2>
            <p>
              Green Irony welcomes your questions or comments regarding this Statement of Privacy. If you believe that Green Irony has not adhered to this Statement, please contact Green Irony at:
            </p>
            <address className="not-italic">
              Green Irony LLC<br />
              200 2nd Avenue S., Suite 825<br />
              St. Petersburg, FL 33701
            </address>
            <p>
              Email Address: <a className="underline" href="mailto:info@greenirony.com">info@greenirony.com</a>
            </p>
            <p>
              Telephone number: 619-686-9707
            </p>

            <p className="text-sm text-gi-gray">Effective as of July 09, 2020</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Page;

export async function getStaticProps(context: any) {
  return getNextStaticProps(context, { Page, revalidate: 60 });
}

(Page as any).queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
] as any; 