import React, { useState } from 'react';
import styles from './ExactCoversation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../../../components/commonComponents/Input/Input';
import Button from '../../../components/commonComponents/Button/Button';
import { useNavigate } from 'react-router-dom';

const ExactCoversation = ({
  close,
  userMessages,
  id,
  handleSendMsg,
  messages,
  myUserId,
}: {
  close: any;
  userMessages: any;
  handleSendMsg: any;
  id: any;
  messages: any;
  myUserId: any;
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');

  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };

  return (
    <>
      <div className={styles.ConversationInfoNavbar}>
        <div className={styles.ArrowMobile}>
          <Button
            kind="ghost"
            size="lg"
            iconOnly
            icon={<FontAwesomeIcon icon="chevron-left" />}
            onClick={() => close(false)}
          />
        </div>
        <div
          className={styles.ConversationInfoNavbarAvatar}
          onClick={() => navigateTo(`profil/${22}`)}
        >
          <img src={userMessages[id].photo} />
        </div>
        <div className={styles.ConversationInfoAndButtonsContainer}>
          <div className={styles.ConversationInfoNameAndStatus}>
            <h3>
              {userMessages[id].name} {userMessages[id].surname}
            </h3>
            <div>
              <div>◉ Aktywny teraz</div>
            </div>
          </div>
          <div className={styles.ConversationInfoButtons}>
            <FontAwesomeIcon icon="flag" />
            <FontAwesomeIcon icon="trash-alt" />
          </div>
        </div>
      </div>
      <div className={styles.ConversationContent}>
        {messages.map((msg: any) => {
          if (msg.senderId === myUserId) {
            return (
              <div className={styles.ConwerstionOnelineContainerRight}>
                <div className={styles.ConwerstionOnelineContentRight}>{msg.message}</div>
              </div>
            );
          } else if (msg.senderId !== myUserId) {
            return (
              <div className={styles.ConwerstionOnelineContainerLeft}>
                <div className={styles.ConwerstionOnelineContentLeft}>{msg.message}</div>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.WriteMessageContainer}>
        <Input
          kind="outlined"
          className={styles.SearchEngineInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        />
        <button onClick={() => handleSendMsg(message)}>WYSLIJ</button>
      </div>
    </>
  );
};
export default ExactCoversation;
