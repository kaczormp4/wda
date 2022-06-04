import React from 'react'
import styles from "./ExactCoversation.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../../../components/commonComponents/Input/Input';
import Button from '../../../components/commonComponents/Button/Button';
import { useNavigate } from 'react-router-dom';

const ExactCoversation = ({ array, close, userMessages, id }: { array: any, close: any, userMessages: any, id: any }) => {
    const arr3 = array;
    const navigate = useNavigate();
    const navigateTo = (route: string) => {
        navigate(`/${route}`);
    }
    return (
        <>
            <div className={styles.ConversationInfoNavbar}>
                <div className={styles.ArrowMobile}>
                    <Button kind="ghost" size="lg" iconOnly icon={<FontAwesomeIcon icon="chevron-left" />} onClick={() => close(false)} />
                </div>
                <div className={styles.ConversationInfoNavbarAvatar} onClick={() => navigateTo(`profil/${22}`)}>
                    <img src={userMessages[id].photo} />
                </div>
                <div className={styles.ConversationInfoAndButtonsContainer}>
                    <div className={styles.ConversationInfoNameAndStatus}>
                        <h3>{userMessages[id].name} {userMessages[id].surname}</h3>
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
                    arr3.map((el: any) =>
                        <div className={styles.ConwerstionOnelineContainerRight}>
                            <div className={styles.ConwerstionOnelineContentRight}>
                                {el}
                            </div>
                        </div>
                    )
                }
                {
                    arr3.map((el: any) =>
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
        </>
    )
}
export default ExactCoversation;