import { Container } from "./Container";

const features = [
  {
    name: "Bring your content from anywhere",
    description:
      "You can import your content from your favorite CMS, SaaS service, or a simple text file.",
    icon: DeviceArrowIcon,
  },
  {
    name: "Supercharge your site with extensions",
    description:
      "With our API, you can build your own custom blocks and add them to your portfolio.",
    icon: DeviceExtensionIcon,
  },
  {
    name: "Build a *beautiful* portfolio",
    description:
      "With our predesigned blocks, you can easily build a unique and beautiful portfolio.",
    icon: DeviceBeautifulIcon,
  },
  {
    name: "Tailored CVs for your job applications",
    description:
      "You can easily create a CV for each job application and export it as a PDF when needed.",
    icon: DeviceTailoredIcon,
  },
  {
    name: "Analyse your performance",
    description:
      "We provide you with a detailed analytics dashboard to help you improve your site.",
    icon: DeviceChartIcon,
  },
  {
    name: "Simple & Secure (GDPR)",
    description:
      "We take care of your data and we never share it with third parties.",
    icon: DeviceLockIcon,
  },
];

function DeviceArrowIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 138 138"
    >
      <path
        fill="#A3A3A3"
        fillOpacity="0.2"
        d="M69 138c38.108 0 69-30.892 69-69 0-38.108-30.892-69-69-69C30.892 0 0 30.892 0 69c0 38.108 30.892 69 69 69z"
      ></path>
      <path
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7.185"
        d="M90.305 67.356L62.014 39.065v15.717c-48.31 0-53.884 30.423-52.542 47.153 2.03-8.44 2.97-22.005 52.542-22.005v15.718l28.291-28.292z"
      ></path>
      <path
        fill="#737373"
        fillRule="evenodd"
        d="M26.615 5.052A17.25 17.25 0 0138.813 0h60.374a17.25 17.25 0 0117.251 17.25v103.5A17.251 17.251 0 0199.188 138H38.812a17.25 17.25 0 01-17.25-17.25V116h8.625v4.75a8.627 8.627 0 008.625 8.625h60.376a8.625 8.625 0 008.624-8.625V17.25a8.623 8.623 0 00-8.624-8.625h-5.96a4.313 4.313 0 00-3.856 2.385l-1.932 3.855a4.312 4.312 0 01-3.855 2.385h-29.17a4.312 4.312 0 01-3.855-2.385l-1.932-3.855a4.313 4.313 0 00-3.856-2.385h-5.96a8.625 8.625 0 00-8.624 8.625V32h-8.625V17.25a17.25 17.25 0 015.052-12.198z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function DeviceTailoredIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 138 138"
    >
      <clipPath id="a">
        <path d="M0 0h138v138H0z"></path>
      </clipPath>
      <g clipPath="url(#a)">
        <path
          fill="#a3a3a3"
          fillOpacity="0.2"
          d="M69 138c38.108 0 69-30.892 69-69 0-38.108-30.892-69-69-69C30.892 0 0 30.892 0 69c0 38.108 30.892 69 69 69z"
        ></path>
        <path
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="7.624"
          d="M112.053 111.585l18.6 18.6M103.968 103.5l26.685-26.685M103.968 103.5l-10.975 10.975m10.975-10.975L92.993 92.525m0 21.95a11.437 11.437 0 10-16.175 16.175 11.437 11.437 0 0016.175-16.175zm0-21.95A11.438 11.438 0 1076.817 76.35a11.438 11.438 0 0016.176 16.175z"
        ></path>
        <path
          fill="#737373"
          fillRule="evenodd"
          d="M26.615 5.052A17.25 17.25 0 0138.812 0h60.376a17.25 17.25 0 0117.25 17.25V62h-8.626V17.25a8.623 8.623 0 00-8.624-8.625h-5.96a4.313 4.313 0 00-3.856 2.385l-1.932 3.855a4.312 4.312 0 01-3.855 2.385h-29.17a4.312 4.312 0 01-3.855-2.385l-1.932-3.855a4.313 4.313 0 00-3.856-2.385h-5.96a8.625 8.625 0 00-8.625 8.625v103.5a8.627 8.627 0 008.625 8.625H60V138H38.812a17.25 17.25 0 01-17.25-17.25V17.25a17.25 17.25 0 015.053-12.198z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}

function DeviceBeautifulIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 138 138"
    >
      <path
        fill="#A3A3A3"
        fillOpacity="0.2"
        d="M69 138c38.108 0 69-30.892 69-69 0-38.108-30.892-69-69-69C30.892 0 0 30.892 0 69c0 38.108 30.892 69 69 69z"
      ></path>
      <path
        fill="#737373"
        fillRule="evenodd"
        d="M26.615 5.052A17.25 17.25 0 0138.813 0h60.374a17.25 17.25 0 0117.251 17.25V63h-8.626V17.25a8.623 8.623 0 00-8.624-8.625h-5.96a4.313 4.313 0 00-3.856 2.385l-1.932 3.855a4.312 4.312 0 01-3.855 2.385h-29.17a4.312 4.312 0 01-3.855-2.385l-1.932-3.855a4.313 4.313 0 00-3.856-2.385h-5.96a8.625 8.625 0 00-8.624 8.625v103.5a8.627 8.627 0 008.625 8.625H60V138H38.812a17.25 17.25 0 01-17.25-17.25V17.25a17.25 17.25 0 015.053-12.198z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#333"
        d="M135.673 93.297l-21.584-3.148-9.649-19.63a2.71 2.71 0 00-1.233-1.237 2.727 2.727 0 00-3.647 1.237l-9.648 19.63-21.585 3.148a2.711 2.711 0 00-1.555.793 2.74 2.74 0 00.05 3.865l15.617 15.279-3.69 21.576a2.734 2.734 0 001.081 2.67 2.71 2.71 0 002.864.205L102 127.498l19.306 10.187a2.698 2.698 0 001.726.273 2.726 2.726 0 002.219-3.148l-3.69-21.576 15.617-15.28c.425-.417.705-.963.79-1.56a2.718 2.718 0 00-2.295-3.097z"
      ></path>
    </svg>
  );
}

function DeviceExtensionIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 138 138"
    >
      <path
        fill="#A3A3A3"
        fillOpacity="0.2"
        d="M69 138c38.108 0 69-30.892 69-69 0-38.108-30.892-69-69-69C30.892 0 0 30.892 0 69c0 38.108 30.892 69 69 69z"
      ></path>
      <path
        fill="#737373"
        fillRule="evenodd"
        d="M38.813 0a17.25 17.25 0 00-17.25 17.25v103.5A17.25 17.25 0 0038.813 138h60.374a17.25 17.25 0 0017.251-17.25V17.25A17.25 17.25 0 0099.188 0H38.812zm0 8.625a8.625 8.625 0 00-8.626 8.625v103.5a8.627 8.627 0 008.625 8.625h60.376a8.625 8.625 0 008.624-8.625V17.25a8.623 8.623 0 00-8.624-8.625h-5.96a4.313 4.313 0 00-3.856 2.385l-1.932 3.855a4.313 4.313 0 01-3.855 2.385h-29.17a4.312 4.312 0 01-3.855-2.385l-1.932-3.855a4.313 4.313 0 00-3.856-2.385h-5.96z"
        clipRule="evenodd"
      ></path>
      <rect width="27" height="20" x="39" y="28" fill="#333" rx="3"></rect>
      <rect width="27" height="41" x="73" y="28" fill="#333" rx="3"></rect>
      <rect width="27" height="41" x="39" y="53" fill="#333" rx="3"></rect>
    </svg>
  );
}

function DeviceLockIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v10h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h5v2H9a4 4 0 01-4-4V4z"
        fill="#737373"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 19.5a3.5 3.5 0 117 0V22a2 2 0 012 2v6a2 2 0 01-2 2h-7a2 2 0 01-2-2v-6a2 2 0 012-2v-2.5zm2 2.5h3v-2.5a1.5 1.5 0 00-3 0V22z"
        fill="#171717"
      />
    </svg>
  );
}

function DeviceChartIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#737373"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 13.838V26a2 2 0 01-2 2H11a2 2 0 01-2-2V15.65l2.57 3.212a1 1 0 001.38.175L15.4 17.2a1 1 0 011.494.353l1.841 3.681c.399.797 1.562.714 1.843-.13L23 13.837z"
        fill="#171717"
      />
      <path
        d="M10 12h12"
        stroke="#737373"
        strokeWidth={2}
        strokeLinecap="square"
      />
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
    </svg>
  );
}

export function SecondaryFeatures() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for building a portfolio"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-landing-3xl font-medium tracking-tight text-gray-900">
            Now is the time to build your portfolio.
          </h2>
          <p className="mt-2 text-landing-lg text-gray-600">
            Recruiters say they are 70% more likely to hire someone with a
            portfolio. Go get yourself the pole position you deserve.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-landing-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li
              key={feature.name}
              className="rounded-2xl border border-gray-200 p-8"
            >
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 font-semibold text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-gray-700">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
