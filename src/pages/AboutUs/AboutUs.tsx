import styles from './AboutUs.module.css';
import AboutUsBanner from './AboutUsBanner';
import OurTeam from './OurTeam';
import WhyUs from './WhyUs';

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      {/* banner */}
      <AboutUsBanner />

      {/* mission statement */}
      <div className={styles.introSection}>
        <h1 className={styles.pageTitle}>About Drone Rush</h1>
        <div className={styles.accentBar} />
        <p className={styles.missionText}>
          At Drone Rush, we are passionate about delivering cutting-edge drone
          technology and exceptional service. Our mission is to empower
          individuals and businesses with innovative aerial solutions, ensuring
          quality, reliability, and a commitment to excellence in everything we
          do.
        </p>
      </div>

      {/* why us */}
      <section className={styles.section + ' ' + styles.fadeIn}>
        <WhyUs />
      </section>

      {/* our team */}
      <section className={styles.section + ' ' + styles.fadeIn}>
        <h2 className={styles.sectionTitle}>Meet Our Team</h2>
        <div className={styles.accentBarSmall} />
        <OurTeam />
      </section>
    </div>
  );
};

export default AboutUs;
