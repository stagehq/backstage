import Head from "next/head";
import { Container } from "../client/components/landingpage/Container";
import Favicons from "../client/components/landingpage/Favicons";
import { Footer } from "../client/components/landingpage/Footer";
import { Header } from "../client/components/landingpage/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Stage – API-based developer portfolio, that converts.</title>
        <meta
          name="description"
          content="Next-gen developer portfolio that helps you showcase your projects, skills, and experience. Personalize it by an evergrowing collection of building blocks and analyse your growth."
        />
        <Favicons />
      </Head>
      <Header />
      <main>
        <section
          id="secondary-features"
          aria-label="Features for building a portfolio"
          className="py-20 sm:py-32"
        >
          <Container className={""}>
            <div className="max-w-2xl">
              <h2 className="text-landing-3xl font-medium tracking-tight text-gray-900">
                Imprint
              </h2>
            </div>
            <div className="mt-16 max-w-2xl text-landing-sm sm:mt-20 lg:max-w-3xl">
              <h3
                className="mt-8 text-landing-xl font-semibold"
                id="1-data-protection-at-a-glance"
              >
                1. Data protection at a glance
              </h3>
              <h4 className="mt-6 font-semibold" id="general-information">
                General information
              </h4>
              <p>
                The following notes provide a simple overview of what happens to
                your personal data when you visit this website. Personal data is
                all data with which you can be personally identified. Detailed
                information on the subject of data protection can be found in
                our data protection declaration listed under this text.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="data-collection-on-this-website"
              >
                Data collection on this website
              </h4>
              <h4
                className="mt-6 font-semibold"
                id="who-is-responsible-for-data-collection-on-this-website-"
              >
                Who is responsible for data collection on this website?
              </h4>
              <p>
                The data processing on this website is carried out by the
                website operator. You can find their contact details in the
                section &quot;Notice on the responsible body&quot; in this data
                protection declaration.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="how-do-we-collect-your-data-"
              >
                How do we collect your data?
              </h4>
              <p>
                On the one hand, your data is collected when you communicate it
                to us. This can be z. B. be data that you enter in a contact
                form.
              </p>
              <p>
                Other data is collected automatically or with your consent by
                our IT systems when you visit the website. This is primarily
                technical data (e.g. internet browser, operating system or time
                of the page view). This data is collected automatically as soon
                as you enter this website.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="what-do-we-use-your-data-for-"
              >
                What do we use your data for?
              </h4>
              <p>
                Part of the data is collected to ensure that the website is
                provided without errors. Other data can be used to analyze your
                user behavior.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="what-rights-do-you-have-regarding-your-data-"
              >
                What rights do you have regarding your data?
              </h4>
              <p>
                You have the right to receive information about the origin,
                recipient and purpose of your stored personal data free of
                charge at any time. You also have the right to request the
                correction or deletion of this data. If you have given your
                consent to data processing, you can revoke this consent at any
                time for the future. You also have the right, under certain
                circumstances, to request that the processing of your personal
                data be restricted. You also have the right to lodge a complaint
                with the competent supervisory authority.
              </p>
              <p>
                You can contact us at any time if you have any further questions
                on the subject of data protection.
              </p>
              <h3 className="mt-8 text-landing-xl font-semibold" id="2-hosting">
                2. Hosting
              </h3>
              <h4 className="mt-6 font-semibold" id="amazon-web-services-aws-">
                Amazon Web Services (AWS)
              </h4>
              <p>
                We host our website on AWS. The provider is Amazon Web Services
                EMEA SARL, 38 Avenue John F. Kennedy, 1855 Luxembourg
                (hereinafter AWS).
              </p>
              <p>
                When you visit our website, your personal data will be processed
                on AWS servers. Personal data can also be transmitted to the
                parent company of AWS in the USA. Data transfer to the USA is
                based on the EU standard contractual clauses. Details can be
                found here:{" "}
                <a href="[https://aws.amazon.com/de/blogs/security/](https://aws.amazon.com/de/blogs/security/">
                  <a href="https://aws.amazon.com/de/blogs/security/aws-gdpr-data-processing-addendum/">
                    https://aws.amazon.com/de/blogs/security/aws-gdpr-data-processing-addendum/
                  </a>
                </a>{" "}
                aws-gdpr-data-processing-addendum/).
              </p>
              <p>
                For more information, see the AWS privacy policy:{" "}
                <a href="https://aws.amazon.com/de/privacy/?nc1=f_pr">
                  https://aws.amazon.com/de/privacy/?nc1=f_pr
                </a>
                .
              </p>
              <p>
                AWS is used on the basis of Article 6 (1) (f) GDPR. We have a
                legitimate interest in our website being displayed as reliably
                as possible. If a corresponding consent was requested, the
                processing takes place exclusively on the basis of Art. 6 Para.
                1 lit. a DSGVO and § 25 Para . B. device fingerprinting) within
                the meaning of the TTDSG. The consent can be revoked at any
                time.
              </p>
              <h3
                className="mt-8 text-landing-xl font-semibold"
                id="3-general-information-and-mandatory-information"
              >
                3. General information and mandatory information
              </h3>
              <h4 className="mt-6 font-semibold" id="privacy">
                Privacy
              </h4>
              <p>
                The operators of these pages take the protection of your
                personal data very seriously. We treat your personal data
                confidentially and in accordance with the statutory data
                protection regulations and this data protection declaration.
              </p>
              <p>
                If you use this website, various personal data will be
                collected. Personal data is data with which you can be
                personally identified. This data protection declaration explains
                what data we collect and what we use it for. It also explains
                how and for what purpose this happens.
              </p>
              <p>
                We would like to point out that data transmission on the
                Internet (e.g. when communicating by e-mail) can have security
                gaps. A complete protection of the data against access by third
                parties is not possible.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="note-on-the-responsible-body"
              >
                Note on the responsible body
              </h4>
              <p>
                The responsible body for data processing on this website is:
              </p>
              <p>
                Nils Jacobsen
                <br />
                Kapuzinergasse 3<br />
                73525 Schwäbisch Gmuend
                <br />
                Mail: nils.jacobsen98@gmail.com
              </p>
              <p>
                The responsible body is the natural or legal person who, alone
                or jointly with others, decides on the purposes and means of
                processing personal data (e.g. names, e-mail addresses, etc.).
              </p>
              <h4 className="mt-6 font-semibold" id="storage-duration">
                Storage duration
              </h4>
              <p>
                Unless a specific storage period has been specified in this data
                protection declaration, your personal data will remain with us
                until the purpose for data processing no longer applies. If you
                submit a legitimate request for deletion or revoke consent to
                data processing, your data will be deleted unless we have other
                legally permissible reasons for storing your personal data (e.g.
                tax or commercial law retention periods); in the latter case,
                the data will be deleted once these reasons have ceased to
                exist.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="general-information-on-the-legal-basis-for-data-processing-on-this-website"
              >
                General information on the legal basis for data processing on
                this website
              </h4>
              <p>
                If you have consented to the data processing, we process your
                personal data on the basis of Article 6 Paragraph 1 Letter a
                GDPR or Article 9 Paragraph 2 Letter a GDPR, if special data
                categories according to Article 9 Paragraph 1 GDPR are
                processed. In the event of express consent to the transfer of
                personal data to third countries, data processing is also based
                on Article 49 (1) (a) GDPR. If you have consented to the storage
                of cookies or to access information on your end device (e.g. via
                device fingerprinting), data processing is also based on Section
                25 (1) TTDSG. The consent can be revoked at any time. If your
                data is required to fulfill the contract or to carry out
                pre-contractual measures, we process your data on the basis of
                Article 6 (1) (b) GDPR. Furthermore, we process your data if
                they are required to fulfill a legal obligation on the basis of
                Article 6 (1) (c) GDPR. Data processing can also take place on
                the basis of our legitimate interest in accordance with Art. 6
                Para. 1 lit. f GDPR. The following paragraphs of this data
                protection declaration provide information on the relevant legal
                bases in each individual case.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="note-on-data-transfer-to-the-usa-and-other-third-countries"
              >
                Note on data transfer to the USA and other third countries
              </h4>
              <p>
                Among other things, we use tools from companies based in the USA
                or other third countries that are not secure under data
                protection law. If these tools are active, your personal data
                can be transferred to these third countries and processed there.
                We would like to point out that in these countries no level of
                data protection comparable to that of the EU can be guaranteed.
                For example, US companies are obliged to hand over personal data
                to security authorities without you as the person concerned
                being able to take legal action against this. It can therefore
                not be ruled out that US authorities (e.g. secret services) will
                process, evaluate and permanently store your data on US servers
                for monitoring purposes. We have no influence on these
                processing activities.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="revocation-of-your-consent-to-data-processing"
              >
                Revocation of your consent to data processing
              </h4>
              <p>
                Many data processing operations are only possible with your
                express consent. You can revoke consent that you have already
                given at any time. The legality of the data processing that took
                place up until the revocation remains unaffected by the
                revocation.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="right-to-object-to-data-collection-in-special-cases-and-to-direct-advertising-art-21-gdpr-"
              >
                Right to object to data collection in special cases and to
                direct advertising (Art. 21 GDPR)
              </h4>
              <p>
                IF THE DATA PROCESSING IS BASED ON ART. 6 ABS. 1 LIT. E OR F
                GDPR, YOU HAVE THE RIGHT AT ANY TIME TO OBJECT TO THE PROCESSING
                OF YOUR PERSONAL DATA FOR REASONS ARISING FROM YOUR PARTICULAR
                SITUATION; THIS ALSO APPLIES TO PROFILING BASED ON THESE
                PROVISIONS. THE RESPECTIVE LEGAL BASIS ON WHICH A PROCESSING IS
                BASED CAN BE FOUND IN THIS DATA PRIVACY POLICY. IF YOU OBJECT,
                WE WILL NO LONGER PROCESS YOUR CONCERNED PERSONAL DATA UNLESS WE
                CAN PROVE COMPREHENSIVE GROUNDS FOR THE PROCESSING THAT OVERRIDE
                YOUR INTERESTS, RIGHTS AND FREEDOM OBJECTION ACCORDING TO
                ARTICLE 21 (1) GDPR).
              </p>
              <p>
                IF YOUR PERSONAL DATA IS PROCESSED FOR DIRECT ADVERTISING, YOU
                HAVE THE RIGHT TO OBJECT AT ANY TIME TO THE PROCESSING OF YOUR
                PERSONAL DATA FOR THE PURPOSES OF SUCH ADVERTISING; THIS ALSO
                APPLIES TO PROFILING TO THE EXTENT RELATED TO SUCH DIRECT
                ADVERTISING. IF YOU OBJECT, YOUR PERSONAL DATA WILL NO LONGER BE
                USED FOR DIRECT ADVERTISING PURPOSES (OBJECTION ACCORDING TO
                ART. 21 (2) GDPR).
              </p>
              <h4
                className="mt-6 font-semibold"
                id="right-of-appeal-to-the-competent-supervisory-authority"
              >
                Right of appeal to the competent supervisory authority
              </h4>
              <p>
                In the event of violations of the GDPR, those affected have the
                right to lodge a complaint with a supervisory authority, in
                particular in the Member State of their habitual residence,
                their place of work or the place of the alleged violation. The
                right to lodge a complaint is without prejudice to any other
                administrative or judicial remedy.
              </p>
              <h4 className="mt-6 font-semibold" id="right-to-data-portability">
                Right to data portability
              </h4>
              <p>
                You have the right to have data that we process automatically on
                the basis of your consent or in fulfillment of a contract handed
                over to you or to a third party in a common, machine-readable
                format. If you request the direct transfer of the data to
                another person responsible, this will only be done to the extent
                that it is technically feasible.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="information-deletion-and-correction"
              >
                Information, deletion and correction
              </h4>
              <p>
                Within the framework of the applicable legal provisions, you
                have the right to free information about your stored personal
                data, its origin and recipient and the purpose of the data
                processing and, if necessary, a right to correction or deletion
                of this data at any time. You can contact us at any time if you
                have any further questions on the subject of personal data.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="right-to-restriction-of-processing"
              >
                Right to restriction of processing
              </h4>
              <p>
                You have the right to request the restriction of the processing
                of your personal data. You can contact us at any time for this.
                The right to restriction of processing exists in the following
                cases:
              </p>
              <ul>
                <li>
                  If you contest the accuracy of your personal data stored by
                  us, we usually need time to check this. For the duration of
                  the examination, you have the right to request that the
                  processing of your personal data be restricted.
                </li>
                <li>
                  If the processing of your personal data happened/is happening
                  unlawfully, you can request the restriction of data processing
                  instead of deletion.
                </li>
                <li>
                  If we no longer need your personal data, but you need it to
                  exercise, defend or assert legal claims, you have the right to
                  demand that the processing of your personal data be restricted
                  instead of being deleted.
                </li>
                <li>
                  If you have lodged an objection in accordance with Art. 21
                  Para. 1 GDPR, your interests and ours must be weighed up. As
                  long as it has not yet been determined whose interests
                  prevail, you have the right to demand that the processing of
                  your personal data be restricted.
                </li>
              </ul>
              <p>
                If you have restricted the processing of your personal data,
                this data - apart from its storage - may only be used with your
                consent or to assert, exercise or defend legal claims or to
                protect the rights of another natural or legal person or for
                reasons of important public interest of the European Union or a
                Member State are processed.
              </p>
              <h4 className="mt-6 font-semibold" id="ssl-or-tls-encryption">
                SSL or TLS encryption
              </h4>
              <p>
                For security reasons and to protect the transmission of
                confidential content, such as orders or inquiries that you send
                to us as the site operator, this site uses SSL or TLS
                encryption. You can recognize an encrypted connection by the
                fact that the address line of the browser changes from
                &quot;http://&quot; to &quot;https://&quot; and by the lock
                symbol in your browser line.
              </p>
              <p>
                If SSL or TLS encryption is activated, the data that you
                transmit to us cannot be read by third parties.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="objecting-to-promotional-emails"
              >
                Objecting to Promotional Emails
              </h4>
              <p>
                We hereby object to the use of contact data published as part of
                the imprint obligation to send unsolicited advertising and
                information material. The site operators expressly reserve the
                right to take legal action in the event of unsolicited
                advertising being sent, such as spam e-mails.
              </p>
              <h3
                className="mt-8 text-landing-xl font-semibold"
                id="4-data-collection-on-this-website"
              >
                4. Data collection on this website
              </h3>
              {/* <h4 className="font-semibold mt-6" id="cookies">Cookies</h4>
          <p>Our website uses so-called &quot;cookies&quot;. Cookies are small text files and do not cause any damage to your end device. They are stored on your end device either temporarily for the duration of a session (session cookies) or permanently (permanent cookies). Session cookies are automatically deleted after your visit. Permanent cookies remain stored on your end device until you delete them yourself or until your web browser automatically deletes them.</p>
          <p>In some cases, cookies from third-party companies can also be stored on your end device when you enter our site (third-party cookies). These enable us or you to use certain services of the third-party company (e.g. cookies for processing payment services).</p>
          <p>Cookies have different functions. Numerous cookies are technically necessary because certain website functions would not work without them (e.g. the shopping cart function or the display of videos). Other cookies are used to evaluate user behavior or display advertising.</p>
          <p>Cookies that are required to carry out the electronic communication process, to provide certain functions you want (e.g. for the shopping cart function) or to optimize the website (e.g. cookies for measuring web audience) (necessary cookies). stored on the basis of Article 6 (1) (f) GDPR, unless another legal basis is specified. The website operator has a legitimate interest in the storage of necessary cookies for the technically error-free and optimized provision of its services. If consent to the storage of cookies and comparable recognition technologies was requested, processing takes place exclusively on the basis of this consent (Art. 6 Para. 1 lit. a DSGVO and § 25 Para. 1 TTDSG); the consent can be revoked at any time.</p>
          <p>You can set your browser so that you are informed about the setting of cookies and only allow cookies in individual cases, exclude the acceptance of cookies for certain cases or in general and activate the automatic deletion of cookies when the browser is closed. If cookies are deactivated, the functionality of this website may be restricted.</p>
          <p>If cookies are used by third-party companies or for analysis purposes, we will inform you of this separately in this data protection declaration and, if necessary, ask for your consent.</p> */}
              <h4 className="mt-6 font-semibold" id="contact-form">
                Contact form
              </h4>
              <p>
                If you send us inquiries via the contact form, your details from
                the inquiry form, including the contact details you provided
                there, will be stored by us for the purpose of processing the
                inquiry and in the event of follow-up questions. We do not pass
                on this data without your consent.
              </p>
              <p>
                This data is processed on the basis of Article 6 (1) (b) GDPR if
                your request is related to the fulfillment of a contract or is
                necessary to carry out pre-contractual measures. In all other
                cases, the processing is based on our legitimate interest in the
                effective processing of inquiries addressed to us (Art. 6 Para.
                1 lit. f GDPR) or on your consent (Art. 6 Para. 1 lit. a GDPR)
                if this was queried; the consent can be revoked at any time.
              </p>
              <p>
                The data you enter in the contact form will remain with us until
                you ask us to delete it, revoke your consent to storage or the
                purpose for data storage no longer applies (e.g. after your
                request has been processed). Mandatory legal provisions - in
                particular retention periods - remain unaffected.
              </p>
              <h4 className="mt-6 font-semibold" id="splitbee">
                Splitbe Analytics
              </h4>
              <p>
                We are using the analytics service provided by splitbee.io,
                Tobias Lins e.U., Alserbachstraße 10, 1090 Vienna. Data stored
                per user are a unique ID, which is randomly generated and is not
                tracked across domains, the country of the user, the count of
                the page views, the referrer if the user is linked by a referred
                page, the user agent of the user and the usage duration. We do
                not <em>**</em>store the IP address of a user. We do not use
                cookies for analytics purposes. Further informations are
                provided by the Splitbee website:{" "}
                <a href="https://splitbee.io/privacy">
                  https://splitbee.io/privacy
                </a>{" "}
                – with using this website you are agreeing to the Privacy Policy
                of <a href="https://splitbee.io/">splitbee.io</a>.
              </p>
              <h4
                className="mt-6 font-semibold"
                id="inquiry-by-e-mail-telephone-or-fax"
              >
                Inquiry by e-mail, telephone or fax
              </h4>
              <p>
                If you contact us by e-mail, telephone or fax, your inquiry
                including all resulting personal data (name, enquiry) will be
                stored and processed by us for the purpose of processing your
                request. We do not pass on this data without your consent.
              </p>
              <p>
                This data is processed on the basis of Article 6 (1) (b) GDPR if
                your request is related to the fulfillment of a contract or is
                necessary to carry out pre-contractual measures. In all other
                cases, the processing is based on our legitimate interest in the
                effective processing of inquiries addressed to us (Art. 6 Para.
                1 lit. f GDPR) or on your consent (Art. 6 Para. 1 lit. a GDPR)
                if this was queried; the consent can be revoked at any time.
              </p>
              <p>
                The data you sent to us via contact requests will remain with us
                until you ask us to delete it, revoke your consent to storage or
                the purpose for data storage no longer applies (e.g. after your
                request has been processed). Mandatory legal provisions - in
                particular statutory retention periods - remain unaffected.
              </p>
              <h3
                className="mt-8 text-landing-xl font-semibold"
                id="5-newsletter"
              >
                5. Newsletter
              </h3>
              <h4 className="mt-6 font-semibold" id="newsletter-data">
                Newsletter data
              </h4>
              <p>
                If you would like to receive the newsletter offered on the
                website, we need an e-mail address from you as well as
                information that allows us to verify that you are the owner of
                the e-mail address provided and that you agree to receive the
                newsletter . Further data is not collected or only collected on
                a voluntary basis. We use this data exclusively for sending the
                requested information and do not pass it on to third parties.
              </p>
              <p>
                The processing of the data entered in the newsletter
                registration form takes place exclusively on the basis of your
                consent (Art. 6 Para. 1 lit. a DSGVO). You can revoke your
                consent to the storage of the data, the e-mail address and their
                use for sending the newsletter at any time, for example via the
                &quot;unsubscribe&quot; link in the newsletter. The legality of
                the data processing operations that have already taken place
                remains unaffected by the revocation.
              </p>
              <p>
                The data you have stored with us for the purpose of subscribing
                to the newsletter will be stored by us or the newsletter service
                provider until you unsubscribe from the newsletter and deleted
                from the newsletter distribution list after you unsubscribe from
                the newsletter or after it no longer serves any purpose. We
                reserve the right to delete or block e-mail addresses from our
                newsletter distribution list at our own discretion within the
                scope of our legitimate interest in accordance with Art. 6 Para.
                1 lit. f GDPR.
              </p>
              <p>Data stored by us for other purposes remain unaffected.</p>
              <p>
                After you have been removed from the newsletter distribution
                list, your e-mail address may be stored by us or the newsletter
                service provider in a blacklist if this is necessary to prevent
                future mailings. The data from the blacklist will only be used
                for this purpose and will not be merged with other data. This
                serves both your interest and our interest in complying with the
                legal requirements when sending newsletters (legitimate interest
                within the meaning of Art. 6 Para. 1 lit. f GDPR). Storage in
                the blacklist is not limited in time.{" "}
                <strong>
                  You can object to the storage if your interests outweigh our
                  legitimate interests.
                </strong>
              </p>
              <h3
                className="mt-8 text-landing-xl font-semibold"
                id="6-plugins-und-tools"
              >
                6. Plugins und Tools
              </h3>
              <h4 className="mt-6 font-semibold" id="google-web-fonts">
                Google Web Fonts
              </h4>
              <p>
                This site uses so-called web fonts provided by Google for the
                uniform display of fonts. When you call up a page, your browser
                loads the required web fonts into your browser cache in order to
                display text and fonts correctly.
              </p>
              <p>
                For this purpose, the browser you are using must connect to the
                Google servers. This gives Google knowledge that this website
                was accessed via your IP address. Google WebFonts are used on
                the basis of Article 6 (1) (f) GDPR. The website operator has a
                legitimate interest in the uniform presentation of the typeface
                on his website. If a corresponding consent was requested, the
                processing takes place exclusively on the basis of Art. 6 Para.
                1 lit. a DSGVO and § 25 Para . B. device fingerprinting) within
                the meaning of the TTDSG. The consent can be revoked at any
                time.
              </p>
              <p>
                If your browser does not support web fonts, a standard font will
                be used by your computer.
              </p>
              <p>
                You can find more information about Google Web Fonts at{" "}
                <a href="https://developers.google.com/fonts/faq">
                  https://developers.google.com/fonts/faq
                </a>{" "}
                and in Google’s privacy policy:{" "}
                <a href="https://policies.google.com/privacy?hl=de">
                  https:/ /policies.google.com/privacy?hl=de
                </a>
                .
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
