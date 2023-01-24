import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import classNames from 'classnames';

import Input from '../../components/commonComponents/Input/Input';
import { SectionMedium } from '../../components/Section/Section';

import ExactCoversation from './ExactCoversation/ExactCoversation';

import AuthenticationContext from '../../api/Authentication/AuthenticationContext';
import { MSALInstance } from '../../api/Authentication/MSALConfig';
import { Users } from '../../api/Users';

import styles from './Messages.module.scss';

const mockUserMessages = [
  {
    id: '7b54b360-d73b-4432-b173-55adccb42590',
    photo:
      'https://media-exp1.licdn.com/dms/image/C4E03AQEwQK67CAdYqw/profile-displayphoto-shrink_400_400/0/1637600147999?e=1662595200&v=beta&t=Dkf_nzQf3ycfMrioWgZy_iz7OFx4qCBuMVATrR2Xoc8',
    name: 'Jakub  ',
    surname: 'Faliszewski',
    lastMessage: 'Mock Message',
    date: '22.02',
  },
  {
    id: '0793d5fc-f20a-4498-b336-8a359aa0ab0f',
    photo:
      'https://media-exp1.licdn.com/dms/image/C5603AQEKIu8SJ5n-kg/profile-displayphoto-shrink_800_800/0/1596805427253?e=1662595200&v=beta&t=now8Ux5h8piZkHJul9N937rC-Ih4vuSpMSlJm0S2J3c',
    name: 'Tomasz',
    surname: 'Lesniak',
    lastMessage: 'Mock Message',
    date: '21.02',
  },
  {
    id: '63b313b2-50af-4695-97f7-c357788ff92d',
    photo:
      'https://media-exp1.licdn.com/dms/image/C4E03AQHUl0wLziO19w/profile-displayphoto-shrink_800_800/0/1648037282153?e=1662595200&v=beta&t=K1L7WPLYDCSfUT-_Lpg5M_BFwfW0ubWCcvgrZnqR6lI',
    name: 'Bartłomiej',
    surname: 'Kaczmarczyk',
    lastMessage: 'Mock Message',
    date: '2.02',
  },
  {
    id: '6fbb147d-279c-4a08-abb9-9f90b96c8e97',
    photo: 'https://www.pinknews.co.uk/images/2018/04/Emily-2-Tinder-650x635.jpg',
    name: 'Bartusiek',
    surname: 'Kczmrczyk',
    lastMessage: 'Mock Message',
    date: '2.02',
  },
];
type MessagesProps = {};

const Messages: FC<MessagesProps> = () => {
  const [findMessage, setfindMessage] = useState<string>('');
  const [openMobileModal, setOpenMobileModal] = useState<boolean>(true);
  const [messages, setMessages] = useState<any>([]);
  const [userMessages, setUserMessages] = useState<any>([]); // lista wiadomosci  z lewej str
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<any>(user?.userIdentifier);

  const context = useContext(AuthenticationContext);

  const navigate = useNavigate();
  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };

  const [isConnection, setConnection] = useState<any>();

  let { userId: userIdFromParams } = useParams();

  useEffect(() => {
    if (context.isAuthenticated) {
      const sss = async () => {
        const token = await context.getToken();

        const connection = new HubConnectionBuilder()
          .withUrl('https://weddings.azurewebsites.net/chatHub', {
            accessTokenFactory: () => token.accessToken,
          })
          .configureLogging(LogLevel.Debug)
          .build();

        setConnection(connection);

        connection.on('ReceiveMessage', (message: any) => {
          setMessages((prev: any) => [...prev, message]);
          // if (messages) {
          //   const currentUser = userMessages?.map((user: any) => {
          //     console.log(messages[messages.length - 1]?.message);

          //     if (user?.id === messages[messages.length - 1]?.senderId) {
          //       return { ...user, lastMessage: 'sssss' };
          //     } else {
          //       return { ...user };
          //     }
          //   });
          //   if (currentUser) {
          //     setUserMessages(currentUser);
          //   }
          // }
        });

        await connection.start();
      };
      sss().catch(console.error);
    }
  }, [context.isAuthenticated]);

  useEffect(() => {
    const prof = MSALInstance.getAccount();
    if (prof && userIdFromParams === prof.accountIdentifier) {
      navigateTo('profil');
    } else {
      if (!!userIdFromParams) {
        new Users().get(userIdFromParams).then(user => {
          setUser(user);
        });
      }
    }
  }, [userIdFromParams]);

  useEffect(() => {
    if (!!user) {
      const orderMsgs = mockUserMessages
        .filter(msg => msg.id !== context?.authInfo?.accountIdentifier)
        .map(msg => {
          if (msg.id === user?.userIdentifier) {
            return {
              isBold: true,
              ...msg,
            };
          } else {
            return { ...msg };
          }
        });
      setUserMessages(orderMsgs);
    } else {
      const orderMsgs = mockUserMessages.filter(
        msg => msg.id !== context?.authInfo?.accountIdentifier
      );
      setUserMessages(orderMsgs);
    }
  }, [user]);

  const changeMessage = (id: string) => {
    // setOpenMobileModal(true);
    setUserId(id);
    navigateTo(`wiadomosci/${id}`);
    // zmienic gdy bedzie endpoint na zapisane wiadomoscioo
  };

  const handleSendMsg = (message: string) => {
    if (message) {
      isConnection.invoke('SendMessage', userIdFromParams, message);

      setMessages((prev: any) => [
        ...prev,
        {
          date: new Date(),
          message,
          senderDisplayName: context?.authInfo?.name,
          senderId: context?.authInfo?.accountIdentifier,
        },
      ]);
    }
  };

  const filtredUserMessages = userMessages.filter(
    (user: any) =>
      user.name.toLowerCase().includes(findMessage.toLowerCase()) ||
      user.surname.toLowerCase().includes(findMessage.toLowerCase()) ||
      user.lastMessage.toLowerCase().includes(findMessage.toLowerCase())
  );

  if (!context.isAuthenticated) {
    navigateTo(``);
  }

  return (
    <SectionMedium>
      <main className={styles.Container}>
        <div className={styles.UserAndMessgesContainer}>
          <div className={styles.SearchEngineAndFilter}>
            <Input
              label="Search in messages"
              kind="outlined"
              className={styles.SearchEngineInput}
              onChange={(e: any) => setfindMessage(e.target.value)}
            />
          </div>
          <div className={styles.AllMessages}>
            {filtredUserMessages.length > 0 ? (
              filtredUserMessages.map((user: any) => (
                <div
                  className={classNames(styles.OneMessageContainer, {
                    [`${styles.OneMessageContainerSelected} `]: user.isBold,
                  })}
                  onClick={() => changeMessage(user.id)}
                >
                  <div className={styles.OneMessageAvatar}>
                    {/* <img src={user.photo} /> */}
                    <img src={'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png'} />
                  </div>
                  <div className={styles.OneMessageInfoAndMessage}>
                    <div className={styles.NameAndMessage}>
                      <h3>
                        {user.name} {user.surname}
                      </h3>
                      <p>{user.lastMessage}</p>
                    </div>
                    <div className={styles.DateAndInfo}>{user.date}</div>
                  </div>
                </div>
              ))
            ) : (
              <>Brak wiadomosci</>
            )}
          </div>
        </div>
        <div className={styles.ExactConversationContainer}>
          {openMobileModal && (
            <ExactCoversation
              userMessages={userMessages}
              close={setOpenMobileModal}
              handleSendMsg={handleSendMsg}
              messages={messages}
              myUserId={context?.authInfo?.accountIdentifier}
              userId={userId || userIdFromParams || userMessages[0]?.id}
            />
          )}
        </div>
      </main>
    </SectionMedium>
  );
};

export default Messages;
