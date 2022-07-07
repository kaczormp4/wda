import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { IOffer, Offers } from '../../../api/Offers';
import Modal from '../../../components/commonComponents/Modal/Modal';
import TextField from '../../../components/commonComponents/TextField/TextField';
import styles from './DeleteOfferModal.module.scss';

type P = {
  offer: IOffer;
  setModalOpen: Function;
  onDelete: Function;
};

const DeleteOfferModal = (props: P) => {
  const { offer, setModalOpen, onDelete } = props;
  const [requestSending, setRequestSending] = useState<boolean>(false);

  const deleteOffer = () => {
    setRequestSending(true);
    new Offers().delete(offer.id).then((v) => {
        toast.success(v);
        onDelete();
        setModalOpen(false);
    }).catch((reason) => {
        console.error(reason);
        setRequestSending(false);
    })
  }

  return (
    <Modal
      id="deleteOfferModal"
      heading="Czy na pewno chcesz usunąć to ogłoszenie?"
      open={true}
      danger={true}
      primaryButtonText={'Usuń'}
      disabled={requestSending}
      action={() => deleteOffer()}
      onClose={() => setModalOpen(false)}
    >
      <div>
        <div className={styles.ModalBody}>
          <p>Nazwa: </p>
          <span>{offer.title}</span>
          <hr />
          <p>ID: </p>
          <span>#{offer.id}</span>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteOfferModal;
