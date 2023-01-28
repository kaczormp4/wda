import React, { useEffect, useRef, useState } from 'react';
import styles from './ExactCoversation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../components/commonComponents/Button/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '../../../components/commonComponents/TextField/TextField';
import moment from 'moment';

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

  const handleSendMessage = (e: any) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      handleSendMsg(message);
    }
    if (e.type === 'click') {
      handleSendMsg(message);
    }
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
          {/* <img src={exactMessage?.photo} /> */}
          <img src={'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png'} />
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
            {/* <FontAwesomeIcon icon="flag" />
            <FontAwesomeIcon icon="trash-alt" /> */}
          </div>
        </div>
      </div>
      <div className={styles.ConversationContent}>
        {messages.map((msg: any) => {
          const d = moment(msg.date);
          // let day = `${d.getDay()}/ ${d.getMonth()} ${d.getHours()}:${d.getMinutes()}`;
          const formattedHours = `${d.format('HH:mm')}`;
          if (msg.senderId === myUserId) {
            return (
              <div className={styles.ConwerstionOnelineContainerRight} ref={autoScroll}>
                <div className={styles.ConwerstionOnelineContentRight}>{msg.message}</div>
                <div className={styles.ConwerstionOnelineDate}>{formattedHours}</div>
              </div>
            );
          } else if (msg.senderId !== myUserId) {
            return (
              <div className={styles.ConwerstionOnelineContainerLeft} ref={autoScroll}>
                <div className={styles.ConwerstionOnelineContentLeft}>{msg.message}</div>
                <div className={styles.ConwerstionOnelineDate}>{formattedHours}</div>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.WriteMessageContainer}>
        <TextField
          id="ExactConversation"
          className={styles.textField}
          kind="outlined"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => handleSendMessage(e)}
          disableResize
        />
        <Button
          size="lg"
          onClick={(e: React.MouseEvent) => handleSendMessage(e)}
          className={styles.SendMessageButton}
        >
          WYŚLIJ
        </Button>
      </div>
    </>
  );
};
export default ExactCoversation;
