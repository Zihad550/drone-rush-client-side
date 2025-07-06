import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';
import Details from '@/pages/Details';
import Drones from '@/pages/Drones';
import Home from '@/pages/Home';
import type { IUserPath } from '@/types';

export const publicPaths: IUserPath[] = [
  {
    name: 'Home',
    path: '',
    element: <Home />,
  },
  {
    name: 'Drones',
    path: 'drones',
    element: <Drones />,
  },
  {
    path: `details/:id`,
    element: <Details />,
  },
  {
    element: <ContactUs />,
  },
  {
    name: 'About Us',
    path: 'aboutUs',
    element: <AboutUs />,
  },
  {
    name: 'Contact Us',
    path: 'contactUs',
    element: <ContactUs />,
  },
];
