import './Team.css';
import yaleLogo from '../assets/Yale_University_Shield_1.svg';
import cmuLogo from '../assets/Carnegie_Mellon_University_seal.svg.png';
import brownLogo from '../assets/brown_logo.gif';
import waterlooLogo from '../assets/University_of_Waterloo_seal.svg.png';
import rutgersLogo from '../assets/Rutgers_University_seal.svg';
import uciLogo from '../assets/University_of_California,_Irvine_seal.svg.png';
import illinoisLogo from '../assets/University_of_Illinois_seal.svg.png';
import uvaLogo from '../assets/University_of_Virginia_seal.svg.png';
import purdueLogo from '../assets/Old_Purdue_Seal.png';
import coloradoTechLogo from '../assets/ColoradoTechnicalUniversitySeal.png';
import wvuLogo from '../assets/West_Virginia_University_seal.svg.png';
import easternPennLogo from '../assets/Eastern_univ_penn_seal.png';
import georgetownLogo from '../assets/GeorgetownUniversity-Logo-255x300.avif';
import northeasternLogo from '../assets/NorthEasternUniversity_RGB_seal_R.png';
import ucRiversideLogo from '../assets/UC_Riverside_seal.svg.png';
import utAustinLogo from '../assets/University_of_Texas_at_Austin_seal.svg.png';

const universities = [
  { name: 'Yale', logo: yaleLogo },
  { name: 'Carnegie Mellon', logo: cmuLogo },
  { name: 'Brown', logo: brownLogo },
  { name: 'Waterloo', logo: waterlooLogo },
  { name: 'Rutgers', logo: rutgersLogo },
  { name: 'UC Irvine', logo: uciLogo },
  { name: 'University of Illinois', logo: illinoisLogo },
  { name: 'University of Virginia', logo: uvaLogo },
  { name: 'Purdue', logo: purdueLogo },
  { name: 'Colorado Tech', logo: coloradoTechLogo },
  { name: 'West Virginia', logo: wvuLogo },
  { name: 'Eastern University', logo: easternPennLogo },
  { name: 'Georgetown', logo: georgetownLogo },
  { name: 'Northeastern', logo: northeasternLogo },
  { name: 'UC Riverside', logo: ucRiversideLogo },
  { name: 'UT Austin', logo: utAustinLogo },
];

function Team() {
  return (
    <section className="team">
      <div className="container">
        <div className="team-header">
          <h2 className="team-title">Our Team</h2>
          <p className="team-subtitle">
            A diverse collective of researchers and developers from different backgrounds, who have come together to build unique and creative platforms for AI-driven productivity. Weare planning on releasing our first product within the next year, and are very excited to share our work with the world.
          </p>
        </div>
        <div className="team-stats">
          <div className="team-stat">
            <div className="team-stat-number">35+</div>
            <div className="team-stat-label">Developers</div>
          </div>
          <div className="team-stat">
            <div className="team-stat-number">Top</div>
            <div className="team-stat-label">Universities</div>
          </div>
          <div className="team-stat">
            <div className="team-stat-number">Global</div>
            <div className="team-stat-label">Collaboration</div>
          </div>
        </div>
        <div className="universities">
          <p className="universities-label">Developers from Leading Institutions Worldwide</p>
          <div className="universities-grid">
            {universities.map((uni, index) => (
              <div key={index} className="university-logo">
                <img
                  src={uni.logo}
                  alt={`${uni.name} University Logo`}
                  className="university-img"
                />
              </div>
            ))}
            <div className="university-more">
              <span className="more-text">and many other universities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;


