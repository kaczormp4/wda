import React, { FC, useEffect, useState } from 'react';

import styles from "./Messages.module.scss";
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/commonComponents/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type MessagesProps = {
}

const Messages: FC<MessagesProps> = () => {
    const [findMessage, setfindMessage] = useState<string>('');

    const navigate = useNavigate();

    // let { MessagesId } = useParams();

    const navigateTo = (route: string) => {
        navigate(`/${route}`);
    }

    useEffect(() => {

    }, [])


    // if (1 === null) {
    //     return <></>
    // }
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 4, 5, 6, 7,]
    // const arr = [1, 2, 3, 4, 5, 6, 7,]
    const arr3 = [
        'Nie dam Rady',
        '300000 za jeden przejazd to zdecydowanie za duzo',
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        'Szanowny panie nie mam czasu pozdrawiam',
        'zgadzam się',
        'wolne jutro',
        'e tyle to nie',
    ]
    return <>
        <main className={styles.Container}>
            <div className={styles.UserAndMessgesContainer}>
                <div className={styles.SearchEngineAndFilter}>
                    <Input label='Search in messages' kind='outlined' className={styles.SearchEngineInput} onChange={(e: any) => setfindMessage(e.target.value)} />
                </div>
                <div className={styles.AllMessages}>
                    {
                        arr.map(() =>
                            <div className={styles.OneMessageContainer}>
                                <div className={styles.OneMessageAvatar}>
                                    <img src={"https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"} />
                                </div>
                                <div className={styles.OneMessageInfoAndMessage}>
                                    <div className={styles.NameAndMessage}>
                                        <h3>Jan Kowalski</h3>
                                        <p>Witam Serdecznie. Czy ten golf wolkswagen to na gaz?</p>
                                    </div>
                                    <div className={styles.DateAndInfo}>
                                        22.02
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles.ExactConversationContainer}>
                <div className={styles.ConversationInfoNavbar}>
                    <div className={styles.ConversationInfoNavbarAvatar}>
                        <img src={"https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"} />
                    </div>
                    <div className={styles.ConversationInfoAndButtonsContainer}>
                        <div className={styles.ConversationInfoNameAndStatus}>
                            <h3>Jan Kowalski</h3>
                            <div><div>◉ Aktywny teraz</div></div>
                        </div>
                        <div className={styles.ConversationInfoButtons}>
                            <FontAwesomeIcon icon="flag" />
                            <FontAwesomeIcon icon="trash-alt" />
                        </div>
                    </div>
                </div>
                <div className={styles.ConversationContent}>
                    {
                        arr3.map((el) =>
                            <div className={styles.ConwerstionOnelineContainerRight}>
                                <div className={styles.ConwerstionOnelineContentRight}>
                                    {el}
                                </div>
                            </div>
                        )
                    }
                    {
                        arr3.map((el) =>
                            <div className={styles.ConwerstionOnelineContainerLeft}>
                                <div className={styles.ConwerstionOnelineContentLeft}>
                                    {el}
                                </div>
                            </div>
                        )
                    }


                </div>
                <div className={styles.WriteMessageContainer}>
                    <Input kind='outlined' className={styles.SearchEngineInput} />
                </div>
            </div>
        </main >
    </>
}


export default Messages;
