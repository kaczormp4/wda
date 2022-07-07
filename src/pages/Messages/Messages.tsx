import { FC, useContext, useEffect, useState } from 'react';

import styles from './Messages.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/commonComponents/Input/Input';
import ExactCoversation from './ExactCoversation/ExactCoversation';
import AuthenticationContext from '../../api/Authentication/AuthenticationContext';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { MSALInstance } from '../../api/Authentication/MSALConfig';
import { Users } from '../../api/Users';

// const userMessages = [
//   {
//     id: 0,
//     photo:
//       'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png',
//     name: 'Jan',
//     surname: 'Kowalski',
//     lastMessage: 'Witam Serdecznie. Czy ten golf wolkswagen to na gaz?',
//     date: '22.02',
//   },
//   {
//     id: 1,
//     photo: 'https://wolnomularstwo.pl/wp-content/uploads/2020/12/john-locke-mason.jpg',
//     name: 'John',
//     surname: 'Lock',
//     lastMessage: 'Nie dam rady',
//     date: '21.02',
//   },
//   {
//     id: 2,
//     photo: 'https://www.pinknews.co.uk/images/2018/04/Emily-2-Tinder-650x635.jpg',
//     name: 'Anna',
//     surname: 'Nowak',
//     lastMessage: 'Za darmo to uczciwa cena',
//     date: '2.02',
//   },
//   {
//     id: 3,
//     photo: 'https://skslegal.pl/wp-content/uploads/2020/02/skibniewski_karol-5.jpg',
//     name: 'Karol',
//     surname: 'Cepen',
//     lastMessage: 'Będe o 14',
//     date: '22.12',
//   },
//   {
//     id: 4,
//     photo: 'https://static.goldenline.pl/user_photo/040/user_6049064_7db230_huge.jpg',
//     name: 'Michał',
//     surname: 'Kichał',
//     lastMessage: 'haha',
//     date: '22.02',
//   },
//   {
//     id: 5,
//     photo: 'https://img.a.transfermarkt.technology/portrait/big/208166-1594710596.jpg',
//     name: 'Bartłomiej',
//     surname: 'Nieobecny',
//     lastMessage: 'Nie pozdrawiam',
//     date: '22.02',
//   },
//   {
//     id: 6,
//     photo: 'https://skslegal.pl/wp-content/uploads/2020/02/skibniewski_karol-5.jpg',
//     name: 'Jarosław',
//     surname: 'Polskezbaw',
//     lastMessage: 'Za PO to by pan wiecej zaplacil',
//     date: '22.12',
//   },
//   {
//     id: 7,
//     photo: 'https://bi.im-g.pl/im/e4/8e/18/z25751524V,Adam-Malysz.jpg',
//     name: 'Adam',
//     surname: 'Małysz',
//     lastMessage: 'Skocze pozniej',
//     date: '21.02',
//   },
// ];
type MessagesProps = {};

const Messages: FC<MessagesProps> = () => {
  const [findMessage, setfindMessage] = useState<string>('');
  const [openMobileModal, setOpenMobileModal] = useState<boolean>(true);
  const [messages, setMessages] = useState<any>([]);
  const [userMessages, setUserMessages] = useState<any>([]); // lista wiadomosci  z lewej str

  const [user, setUser] = useState<any>(null);
  const context = useContext(AuthenticationContext);

  const navigate = useNavigate();
  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };

  const [isConnection, setConnection] = useState<any>();

  let { userId: userIdFromParams } = useParams();

  useEffect(() => {
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
      });

      await connection.start();
    };
    sss().catch(console.error);
  }, []);

  useEffect(() => {
    const prof = MSALInstance.getAccount();
    if (prof && userIdFromParams === prof.accountIdentifier) {
      navigateTo('profil');
    } else {
      new Users().get(userIdFromParams).then(user => {
        setUser(user);
      });
    }
  }, [userIdFromParams]);

  useEffect(() => {
    if (!!user) {
      setUserMessages([
        {
          id: user?.userIdentifier,
          photo:
            'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png',
          name: user?.givenName,
          surname: user?.surname,
          lastMessage: 'Skocze pozniej',
          date: '21.02',
        },
      ]);
    } else {
      setUserMessages([
        {
          id: 7,
          photo: 'https://bi.im-g.pl/im/e4/8e/18/z25751524V,Adam-Malysz.jpg',
          name: 'Adam',
          surname: 'Małysz',
          lastMessage: 'Skocze pozniej',
          date: '21.02',
        },
      ]);
    }
  }, [user]);

  const changeMessage = (id: string) => {
    // setOpenMobileModal(true);
    // setUserId(id);
    // zmienic gdy bedzie endpoint na zapisane wiadomoscioo
  };

  const handleSendMsg = (message: string) => {
    isConnection.invoke('SendMessage', userIdFromParams, message);

    setMessages((prev: any) => [
      ...prev,
      {
        date: '2022-07-07T06:30:53.8777528Z',
        message,
        senderDisplayName: context?.authInfo?.name,
        senderId: context?.authInfo?.accountIdentifier,
      },
    ]);
  };

  const filtredUserMessages = userMessages.filter(
    (user: any) =>
      user.name.toLowerCase().includes(findMessage.toLowerCase()) ||
      user.surname.toLowerCase().includes(findMessage.toLowerCase()) ||
      user.lastMessage.toLowerCase().includes(findMessage.toLowerCase())
  );

  return (
    <>
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
                <div className={styles.OneMessageContainer} onClick={() => changeMessage(user.id)}>
                  <div className={styles.OneMessageAvatar}>
                    <img src={user.photo} />
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
              userId={user?.userIdentifier}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Messages;
