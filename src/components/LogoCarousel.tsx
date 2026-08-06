import "./LogoCarousel.css";
import googleLogo from "../assets/google_logo.png";
import awsLogo from "../assets/aws_logo.png";
import ibmLogo from "../assets/ibm_logo.png";
import salesforceLogo from "../assets/salesforce_logo.png";
import progressiveLogo from "../assets/progressive_logo.png";
import teslaLogo from "../assets/tesla_logo.png";
import zipRecruiterLogo from "../assets/zipRecruiter_logo.png";
import lockheedMartinLogo from "../assets/lockheedMartin_logo.png";

interface Logo {
  name: string;
  src: string;
}

const logos: Logo[] = [
  {
    name: "Google",
    src: googleLogo,
  },
  {
    name: "Progressive",
    src: progressiveLogo,
  },
  {
    name: "AWS",
    src: awsLogo,
  },
  {
    name: "IBM",
    src: ibmLogo,
  },
  {
    name: "Salesforce",
    src: salesforceLogo,
  },
  {
    name: "Tesla",
    src: teslaLogo,
  },
  {
    name: "ZipRecruiter",
    src: zipRecruiterLogo,
  },
  {
    name: "Lockheed Martin",
    src: lockheedMartinLogo,
  },
];

function LogoGroup({
  logos: items,
  suffix,
  hidden,
}: {
  logos: Logo[];
  suffix: string;
  hidden?: boolean;
}) {
  return (
    <div className="carousel-group" aria-hidden={hidden || undefined}>
      {items.map((logo) => (
        <div className="carousel-item" key={`${logo.name}-${suffix}`}>
          <img src={logo.src} alt={logo.name} draggable={false} />
        </div>
      ))}
    </div>
  );
}

export default function LogoCarousel() {
  return (
    <div className="carousel-section">
      <p className="carousel-headline">
        Our organization has helped{" "}
        <span className="carousel-headline-stat">58</span> people land paid
        jobs in tech!
      </p>
      <p className="carousel-label">Developers have landed roles at</p>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          <LogoGroup logos={logos} suffix="1" />
          <LogoGroup logos={logos} suffix="2" hidden />
        </div>
      </div>
    </div>
  );
}
