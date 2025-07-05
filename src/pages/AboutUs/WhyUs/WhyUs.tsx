import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import styles from './WhyUs.module.css';

const WhyUs = () => {
  const services = [
    {
      id: 1,
      service: 'Complete buyer supply store',
      icon: LocalMallOutlinedIcon,
    },
    {
      id: 2,
      service: 'Same day dispatch on all orders',
      icon: ArchiveOutlinedIcon,
    },
    {
      id: 3,
      service: 'Free delivery on all orders',
      icon: LocalShippingOutlinedIcon,
    },
    {
      id: 4,
      service: 'Professional advice and support',
      icon: SupportAgentOutlinedIcon,
    },
    {
      id: 5,
      service: 'Fall savings are in the air',
      icon: SavingsOutlinedIcon,
    },
  ];

  return (
    <section className={styles.whyUsSection}>
      <h2 className={styles.whyUsTitle}>Why Choose Us?</h2>
      <div className={styles.whyUsAccentBar} />
      <div className={styles.whyUsGrid}>
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div className={styles.whyUsCard} key={service.id}>
              <Icon className={styles.whyUsIcon} />
              <div className={styles.whyUsText}>{service.service}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyUs;
