import React from 'react';
import { ModalProps } from 'app/components/Content/Modal';
import { useIsFetching } from '@tanstack/react-query';
import { Modal } from '../../components/Content/Modal';

type GlobalLoadingProps = ModalProps;

export const GlobalLoading: React.FC<GlobalLoadingProps> = (props: GlobalLoadingProps) => {
  const isFetching = useIsFetching();

  return isFetching ? <Modal {...props}>Queries are fetching in the background...</Modal> : null;
};
