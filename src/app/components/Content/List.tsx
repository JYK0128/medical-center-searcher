import { useClick, useHover, useSortable } from 'app/effects/list';
import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
type ListContents = {
  Item: typeof Item;
  useFancyList: [typeof useClick, typeof useHover, typeof useSortable];
};
type ListProps = ComponentPropsWithoutRef<'ul' | 'ol'> & {
  type: 'unordered' | 'ordered';
};
type ItemProps = ComponentPropsWithoutRef<'li'>;

type DefinitionListContents = {
  Term: typeof DefinitionTerm;
  Description: typeof DefinitionDescription;
};
type DefinitionListProps = ComponentPropsWithoutRef<'dl'>;
type DefinitionTermProps = ComponentPropsWithoutRef<'dt'>;
type DefinitionDescriptionProps = ComponentPropsWithoutRef<'dd'>;

/* List of Molecules */
/**
 * List
 * @param type - ordered, unordered
 * @example List.Item
 */
export const List: React.FC<ListProps> & ListContents = ({ children, type, ...rest }) => {
  switch (type) {
    case 'ordered':
      return <ol {...rest}>{children}</ol>;
    default:
      return <ul {...rest}>{children}</ul>;
  }
};
const Item: React.FC<ItemProps> = ({ children, ...rest }) => {
  return <li {...rest}>{children}</li>;
};

/**
 * Definition List
 * @example DefinitionList.Term
 * @example DefinitionList.Description
 */
export const DefinitionList: React.FC<DefinitionListProps> & DefinitionListContents = ({
  children,
  ...rest
}) => {
  return <dl {...rest}>{children}</dl>;
};
export const DefinitionTerm: React.FC<DefinitionTermProps> = ({ children, ...rest }) => {
  return <dt {...rest}>{children}</dt>;
};
export const DefinitionDescription: React.FC<DefinitionDescriptionProps> = ({
  children,
  ...rest
}) => {
  return <dt {...rest}>{children}</dt>;
};

/* Setting for Molecules */
List.Item = Item;
List.useFancyList = [useClick, useHover, useSortable];

DefinitionList.Term = DefinitionTerm;
DefinitionList.Description = DefinitionDescription;
