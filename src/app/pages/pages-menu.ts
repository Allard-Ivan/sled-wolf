import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Work Report',
    icon: 'nb-compose',
    children: [
      {
        title: 'Main Work',
        link: '/pages/work-report/main-work',
      },
    ],
  },
  {
    title: 'Multimedia',
    icon: 'nb-paper-plane',
    children: [
      {
        title: 'Audio Station',
        link: '/pages/multimedia/audio-station/梦乡',
      },
      {
        title: 'Video Station',
        link: '/pages/multimedia/video-station/The Shawshank Redemption',
      },
      {
        title: 'Image Station',
        link: '/pages/multimedia/image-station/Null',
      },
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
