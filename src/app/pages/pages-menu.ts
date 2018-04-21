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
    icon: 'nb-tables',
    children: [
      {
        title: 'Main Work',
        link: '/pages/work-report/main-work',
      },
    ],
  },
  {
    title: 'Multimedia',
    icon: 'nb-tables',
    children: [
      {
        title: 'Audio Station',
        link: '/pages/multimedia/audio-station/梦乡',
      },
      {
        title: 'Video Station',
        link: '/pages/multimedia/video-station/The Shawshank Redemption',
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
