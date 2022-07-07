import React, { useEffect, useRef, useState } from 'react';
import styles from './ExactCoversation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../../../components/commonComponents/Input/Input';
import Button from '../../../components/commonComponents/Button/Button';
import { useNavigate } from 'react-router-dom';

const ExactCoversation = ({
  close,
  userMessages,
  handleSendMsg,
  messages,
  myUserId,
  userId,
}: {
  close: any;
  userMessages: any;
  handleSendMsg: any;
  messages: any;
  myUserId: any;
  userId: any;
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');

  const autoScroll = useRef<any>(null);

  useEffect(() => {
    if (autoScroll) {
      autoScroll?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };

  const exactMessage = userMessages.find((user: { id: string }) => user.id === userId);

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
          onClick={() => navigateTo(`profil/${userId}`)}
        >
          <img src={exactMessage?.photo} />
        </div>
        <div className={styles.ConversationInfoAndButtonsContainer}>
          <div className={styles.ConversationInfoNameAndStatus}>
            <h3>
              {exactMessage?.name} {exactMessage?.surname}
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
              <div className={styles.ConwerstionOnelineContainerRight} ref={autoScroll}>
                <div className={styles.ConwerstionOnelineContentRight}>{msg.message}</div>
              </div>
            );
          } else if (msg.senderId !== myUserId) {
            return (
              <div className={styles.ConwerstionOnelineContainerLeft} ref={autoScroll}>
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
        <Button
          size="lg"
          onClick={() => handleSendMsg(message)}
          className={styles.SendMessageButton}
        >
          WYSLIJ
        </Button>
      </div>
    </>
  );
};
export default ExactCoversation;
