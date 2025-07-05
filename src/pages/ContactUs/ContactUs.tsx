import emailjs from '@emailjs/browser';
import { SendOutlined } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import React, { useRef, useState } from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    if (!form.current) return;
    e.preventDefault();
    setSuccess(false);
    emailjs
      .sendForm(
        'service_f285mw9',
        'template_dp3s2l4',
        form.current,
        'user_zhFfInA9MfeHXHO7YmUav'
      )
      .then(
        () => {
          setSuccess(true);
          setError('');
        },
        (error) => {
          setError(error.text);
          setSuccess(false);
        }
      );
  };

  const socials = [
    {
      id: 1,
      icon: PersonIcon,
      link: 'https://jehad-hossain.netlify.app/',
    },
    {
      id: 2,
      icon: GitHubIcon,
      link: 'https://github.com/Zihad550',
    },
    {
      id: 3,
      icon: LinkedInIcon,
      link: 'https://www.linkedin.com/in/jehad-hossain/',
    },
    {
      id: 4,
      icon: FacebookIcon,
      link: 'https://www.facebook.com/zihad31hussain/',
    },
  ];

  const contactInfos = [
    {
      id: 1,
      title: 'Address',
      text: 'Dhaka, Bangladesh',
      icon: LocationOnIcon,
    },
    {
      id: 2,
      title: 'Email',
      text: 'jehadhossain008@gmail.com',
      icon: EmailIcon,
    },
    { id: 3, title: 'Phone', text: '+88 01855629170', icon: PhoneIcon },
  ];
  return (
    <div className={styles.contactUsContainer}>
      <h1 className={styles.contactUsTitle}>Contact Us</h1>
      <div className={styles.contactUsAccentBar} />
      <div className={styles.contactUsGrid}>
        {/* Contact Form Card */}
        <div className={styles.contactCard}>
          <div className={styles.formTitle}>Get In Touch</div>
          <form
            className={styles.form}
            onSubmit={sendEmail}
            ref={form}
            autoComplete="off"
          >
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                placeholder="Your Name"
                type="text"
                name="user_name"
                required
              />
              <input
                className={styles.input}
                placeholder="Your Email"
                type="email"
                name="user_email"
                required
              />
            </div>
            <input
              className={styles.input}
              placeholder="Subject"
              type="text"
              name="subject"
              required
            />
            <textarea
              className={styles.textarea}
              placeholder="Message"
              name="message"
              required
            />
            <button className={styles.sendBtn} type="submit">
              Send <SendOutlined style={{ fontSize: 22 }} />
            </button>
          </form>
          {success && (
            <div className={`${styles.alert} ${styles.success}`}>
              Message Sent Successfully
            </div>
          )}
          {error && (
            <div className={`${styles.alert} ${styles.error}`}>{error}</div>
          )}
        </div>
        {/* Contact Info Card */}
        <div className={styles.contactCard}>
          <div className={styles.infoTitle}>Contact Information</div>
          <div className={styles.infoList}>
            {contactInfos.map((info) => (
              <div className={styles.infoItem} key={info.id}>
                <span className={styles.infoIcon}>
                  <info.icon style={{ fontSize: 22 }} />
                </span>
                <span>
                  <div className={styles.infoTextTitle}>{info.title}</div>
                  <div className={styles.infoText}>{info.text}</div>
                </span>
              </div>
            ))}
          </div>
          <div>
            <div className={styles.infoTextTitle}>Social</div>
            <div className={styles.socials}>
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    className={styles.socialLink}
                    key={social.id}
                    target="_blank"
                    href={social.link}
                    rel="noreferrer"
                  >
                    <Icon style={{ fontSize: 28 }} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
