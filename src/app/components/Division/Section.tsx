import React, { ComponentPropsWithoutRef } from 'react';
import { Paragraph, Subject } from '../Content/Text';

/* Type for Molecules */
type SectionContents = {
  Subject: typeof Subject;
  Paragraph: typeof Paragraph;
  Article: typeof Article;
  Division: typeof Division;
};
type ArticleContents = {
  Subject: typeof Subject;
  Paragraph: typeof Paragraph;
  Section: typeof Section;
  Division: typeof Division;
};

type SectionProps = ComponentPropsWithoutRef<'section'>; // 섹션
type ArticleProps = ComponentPropsWithoutRef<'article'>; // 아티클
type DivisionProps = ComponentPropsWithoutRef<'div'>; // 기타영역

/* List of Molecules */
/**
 * Section is the generic block of related contents.
 * @example Section.Subject
 * @example Section.Paragraph
 * @example Section.Division
 * @example Section.Article
 */
export const Section: React.FC<SectionProps> & SectionContents = ({ children, ...rest }) => {
  return <section {...rest}>{children}</section>;
};

/**
 * Article is independent item of content
 * @example Article.Subject
 * @example Article.Paragraph
 * @example Article.Division
 * @example Article.Section
 */
export const Article: React.FC<ArticleProps> & ArticleContents = ({ children, ...rest }) => {
  return <article {...rest}>{children}</article>;
};

/**
 * Division is the generic container for flow content
 */
export const Division: React.FC<DivisionProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

/* Setting for Molecules */
Section.Subject = Subject;
Section.Paragraph = Paragraph;
Section.Division = Division;
Section.Article = Article;

Article.Subject = Subject;
Article.Paragraph = Paragraph;
Article.Division = Division;
Article.Section = Section;
