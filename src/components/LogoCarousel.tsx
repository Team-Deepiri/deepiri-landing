import "./LogoCarousel.css";
import googleLogo from "../assets/google_logo.png";
import awsLogo from "../assets/aws_logo.png";
import ibmLogo from "../assets/ibm_logo.png";
import salesforceLogo from "../assets/salesforce_logo.png";
import progressiveLogo from "../assets/progressive_logo.png";

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
      <p className="carousel-label">Our developers have landed roles at</p>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          <LogoGroup logos={logos} suffix="1" />
          <LogoGroup logos={logos} suffix="2" hidden />
        </div>
      </div>
    </div>
  );
}
