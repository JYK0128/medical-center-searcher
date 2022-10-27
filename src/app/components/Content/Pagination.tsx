import React, { ComponentPropsWithoutRef, MouseEventHandler } from 'react';
import { CSSProperties } from 'styled-components';

/* Type for Molecules */
export type PaginationProps = ComponentPropsWithoutRef<'div'> & {
  pageCursor?: number;
  pageSize?: number;
  dataSize: number;
  nextPageHandler?: MouseEventHandler<HTMLSpanElement>;
  prevPageHandler?: MouseEventHandler<HTMLSpanElement>;
  clickPageHandler: MouseEventHandler<HTMLSpanElement>;
  forwardPageHandler?: MouseEventHandler<HTMLSpanElement>;
  backwardPageHandler?: MouseEventHandler<HTMLSpanElement>;
};

/** List of Molecules */
export const Pagination: React.FC<PaginationProps> = ({
  pageCursor = 1,
  pageSize = 10,
  dataSize,
  nextPageHandler,
  prevPageHandler,
  clickPageHandler,
  forwardPageHandler,
  backwardPageHandler,
  ...rest
}) => {
  const style: CSSProperties = {
    userSelect: 'none'
  };

  // functions
  const getMaxPage = () => Math.ceil(dataSize / pageSize);
  const getFirstPageOnList = (pageNumber: number) =>
    Math.floor(pageNumber / pageSize) * pageSize + 1;
  const getPagesOnList = () =>
    Array.from({ length: pageSize }, (_, index) => minPage + index).filter(
      index => index <= maxPage
    );
  const getValidPage = (pageNumber: number) => {
    pageNumber = pageNumber < 1 ? 1 : pageNumber;
    pageNumber = pageNumber > maxPage ? maxPage : pageNumber;
    return pageNumber;
  };

  // const getNextPageCursor = (pageNumber: number) =>
  //   pageNumber < maxPage ? pageNumber + 1 : maxPage;
  // const getPrevPageCursor = (pageNumber: number) => (pageNumber > 1 ? pageNumber - 1 : 1);
  // const getForwardPageCursor = (pageNumber: number) =>
  //   getFirstPageOnList(pageNumber + pageSize) < maxPage
  //     ? getFirstPageOnList(pageNumber + pageSize)
  //     : maxPage;
  // const getBackwardPageCursor = (pageNumber: number) =>
  //   getFirstPageOnList(pageNumber - pageSize) > 1 ? getFirstPageOnList(pageNumber - pageSize) : 1;

  // values
  const maxPage = getMaxPage();
  const minPage = getFirstPageOnList(getValidPage(pageCursor));
  const pages = getPagesOnList();
  const isSingularDial = (nextPageHandler && prevPageHandler) !== undefined;
  const isPluralDial = (forwardPageHandler && backwardPageHandler) !== undefined;

  // handler
  const nextHandler: MouseEventHandler<HTMLSpanElement> = e => {
    if (nextPageHandler) nextPageHandler(e);
  };
  const prevHandler: MouseEventHandler<HTMLSpanElement> = e => {
    if (prevPageHandler) prevPageHandler(e);
  };
  const forwardHandler: MouseEventHandler<HTMLSpanElement> = e => {
    if (forwardPageHandler) forwardPageHandler(e);
  };
  const backwardHandler: MouseEventHandler<HTMLSpanElement> = e => {
    if (backwardPageHandler) backwardPageHandler(e);
  };
  const clickHandler: MouseEventHandler<HTMLSpanElement> = e => {
    if (clickPageHandler) clickPageHandler(e);
  };

  return (
    <div {...rest} style={style}>
      {isPluralDial && <span onClick={backwardHandler} />}
      {isSingularDial && <span onClick={prevHandler} />}
      {pages.map(x => (
        <span onClick={clickHandler}>{x}</span>
      ))}
      {isSingularDial && <span onClick={nextHandler} />}
      {isPluralDial && <span onClick={forwardHandler} />}
    </div>
  );
};

/* Setting for Molecules */
