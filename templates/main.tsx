import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

// Import styles
import styles from './main.module.scss';

// Import icons
import { Icons } from '../lib/icons';

// Import components
import { AppHeader, AppFooter, Logo } from 'components';

// Import types
import FcProps from 'lib/types/fc-props';
import { User } from 'lib/types/user';
export interface Props extends FcProps {
  children: React.ReactNode;
  user?: User;
}

const MainTemplate: NextPage<Props> = ({ children, user }: Props) => {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || '';

  const links = [
    {
      href: '/',
      label: 'Home',
      icon: <Icons.house width={'15px'} />
    },
    {
      href: '/about',
      label: 'About'
    },
    {
      href: '/contact',
      label: 'Contact'
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>{appName}</title>
        <meta
          name="description"
          content={`${appName} - The essential app for any move. Keep track of everything you pack!`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader
        appName={appName}
        appSubtitle={
          <span>
            The <strong>essential</strong> moving companion
          </span>
        }
        logo={<Logo />}
        user={user}
        links={links}
      />
      <main className={styles.main}>{children}</main>
      <AppFooter appName={appName} />
    </div>
  );
};

export default MainTemplate;
