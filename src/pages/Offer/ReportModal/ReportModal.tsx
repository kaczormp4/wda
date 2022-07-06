import React, { Component, useState } from 'react';
import { toast } from 'react-toastify';
import { IOffer, Offers } from '../../../api/Offers';
import Modal from '../../../components/commonComponents/Modal/Modal';
import TextField from '../../../components/commonComponents/TextField/TextField';
import styles from './ReportModal.module.scss';

type P = {
  offer: IOffer;
  setModalOpen: Function;
};

const ReportModal = (props: P) => {
  const { offer, setModalOpen } = props;
  const [reason, setReason] = useState<string>('');
  const [requestSending, setRequestSending] = useState<boolean>(false);

  const sendReport = () => {
    setRequestSending(true);
    new Offers().report(offer.id, {reason: reason}).then((v) => {
        toast.success(v);
        setModalOpen(false);
    }).catch((reason) => {
        console.error(reason);
        setRequestSending(false);
    })
  }

  return (
    <Modal
      id="reportOfferModal"
      heading="Czy na pewno chcesz zgłosić tę ofertę?"
      open={true}
      danger={true}
      primaryButtonText={'Zgłoś'}
      disabled={!reason || requestSending}
      action={() => sendReport()}
      onClose={() => setModalOpen(false)}
    >
      <div>
        <div className={styles.ModalBody}>
          <p>Nazwa: </p>
          <span>{offer.title}</span>
          <hr />
          <p>ID: </p>
          <span>#{offer.id}</span>
          <TextField
            required
            onChange={event => setReason(event.target.value)}
            label={'Powód zgłoszenia'}
            className={styles.TextField}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
