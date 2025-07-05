import src from '@/assets/profile.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from './OurTeam.module.css';

const OurTeam = () => {
  const members = [
    {
      id: 1,
      name: 'Jehad Hossain',
      title: 'Founder & CEO',
      src: src,
      linkedin: 'https://www.linkedin.com/in/jehad-hossain',
      devTo: 'https://dev.to/jehad_hossain',
      facebook: 'https://www.facebook.com/zihad31hussain',
      twitter: 'https://twitter.com/Jehadhossain_',
    },
    {
      id: 2,
      name: 'Jehad Hossain',
      title: 'Frontend Developer',
      src: src,
      linkedin: 'https://www.linkedin.com/in/jehad-hossain',
      devTo: 'https://dev.to/jehad_hossain',
      facebook: 'https://www.facebook.com/zihad31hussain',
      twitter: 'https://twitter.com/Jehadhossain_',
    },
    {
      id: 3,
      name: 'Jehad Hossain',
      title: 'Backend Developer',
      src: src,
      linkedin: 'https://www.linkedin.com/in/jehad-hossain',
      devTo: 'https://dev.to/jehad_hossain',
      facebook: 'https://www.facebook.com/zihad31hussain',
      twitter: 'https://twitter.com/Jehadhossain_',
    },
    {
      id: 4,
      name: 'Jehad Hossain',
      title: 'Web Developer',
      src: src,
      linkedin: 'https://www.linkedin.com/in/jehad-hossain',
      devTo: 'https://dev.to/jehad_hossain',
      facebook: 'https://www.facebook.com/zihad31hussain',
      twitter: 'https://twitter.com/Jehadhossain_',
    },
  ];
  return (
    <section className={styles.ourTeamSection}>
      <div className={styles.ourTeamGrid}>
        {members.map((member) => (
          <div className={styles.ourTeamCard} key={member.id}>
            {/* image */}
            <div className={styles.avatarWrapper}>
              <img
                src={member.src}
                className={styles.avatarImg}
                alt={member.name}
              />
            </div>
            {/* socials */}
            <div className={styles.socials}>
              <a
                href={member.linkedin}
                className={styles.socialBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className={styles.socialIcon} />
              </a>
              <a
                href={member.devTo}
                className={styles.socialBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogoDevIcon className={styles.socialIcon} />
              </a>
              <a
                href={member.facebook}
                className={styles.socialBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className={styles.socialIcon} />
              </a>
              <a
                href={member.twitter}
                className={styles.socialBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className={styles.socialIcon} />
              </a>
            </div>
            {/* about */}
            <div>
              <div className={styles.memberName}>{member.name}</div>
              <div className={styles.memberTitle}>{member.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
