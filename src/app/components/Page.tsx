import React, { ComponentPropsWithoutRef } from 'react';
import { Header } from './Division/Header';
import { Main } from './Division/Main';
import { Footer } from './Division/Footer';
import { Section } from './Division/Section';
import { Navigation } from './Division/Navigation';
import { Aside } from './Division/Aside';

/* Type for Molecules */
type PageContents = {
  Section: typeof Section;
  Main: typeof Main;
  Header: typeof Header;
  Footer: typeof Footer;
  Aside: typeof Aside;
  Navigation: typeof Navigation;
};

export type PageProps = ComponentPropsWithoutRef<'div'>;

/* List of Molecules */
/**
 * Page has two strategies.
 * @example Page.Section
 * @example Page.Header, Page.Main, Page.Footer, Page.Navigation, Page.Aside
 */
export const Page: React.FC<PageProps> & PageContents = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

/* Setting for Molecules */
Page.Section = Section;
Page.Main = Main;
Page.Header = Header;
Page.Footer = Footer;
Page.Aside = Aside;
Page.Navigation = Navigation;
