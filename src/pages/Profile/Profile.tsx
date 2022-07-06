import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IOffer, Offers as OfferAPI } from '../../api/Offers';
import styles from './Profile.module.scss';
import Button from '../../components/commonComponents/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { MSALInstance } from '../../api/Authentication/MSALConfig';
import { Account } from 'msal';
import { IUser, Users } from '../../api/Users';
import Offers from '../Offers/Offers';

type ProfileProps = {};

const Profile: FC<ProfileProps> = () => {
  const [offers, setOffers] = useState<IOffer[]>(null);
  const [profile, setPofile] = useState<Account>(null);
  const [user, setUser] = useState<IUser>(null);
  const [isShowPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);

  let { id } = useParams();
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };

  useEffect(() => {
    const prof = MSALInstance.getAccount();
    if (prof && id === prof.accountIdentifier) {
      navigateTo('profil');
    } else if (id === undefined) {
      if (prof) {
        setPofile(prof);
        new OfferAPI().getUserOffers(prof.accountIdentifier).then(userOffers => {
          console.log({ userOffers });
          setOffers(userOffers);
        });
      } else navigateTo('notfound');
    } else {
      new Users().get(id).then(user => {
        setUser(user);
      });
      new OfferAPI().getUserOffers(id).then(userOffers => {
        console.log({ userOffers });
        setOffers(userOffers);
      });
    }
  }, [id]);

  const visibleProfile: IUser = profile
    ? {
        userIdentifier: profile.sid,
        givenName: profile.idTokenClaims.given_name,
        surname: profile.idTokenClaims.family_name,
      }
    : user;

  if (!visibleProfile) {
    return <></>; // implement skeleton
  }

  return (
    <>
      <main className={styles.Container}>
        <section className={styles.MainProfileInfoContainer}>
          <div className={styles.UserAvatar}>
            <img
              src={
                'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png'
              }
            />
          </div>
          <div className={styles.MainUserInfoContainer}>
            <div className={styles.UserNameAndRate}>
              <div>
                {visibleProfile.givenName || visibleProfile.surname ? (
                  <h1>
                    {visibleProfile.givenName} {visibleProfile.surname}
                  </h1>
                ) : (
                  <h1>{profile?.name}</h1>
                )}
                <FontAwesomeIcon icon="check-circle" />
              </div>
              <div>45 opinii</div>
              <div>★★★★★</div>
            </div>
            <div className={styles.Buttons}>
              {profile && <Button icon={<FontAwesomeIcon icon="edit" />}>Edytuj profil</Button>}
              <Button onClick={() => setShowPhoneNumber(!isShowPhoneNumber)}>Zadzwoń</Button>
              {isShowPhoneNumber && (
                <div className={styles.PhoneNumber}>
                  723 333 222 <FontAwesomeIcon icon="clone" />
                </div>
              )}
              {user && (
                <Button renderAsLink={true} href={`/wiadomosci/${visibleProfile.userIdentifier}`}>
                  Wyślij wiadomość
                </Button>
              )}
            </div>
          </div>
        </section>
        <h2 className={styles.Header}>Oferty użytkownika</h2>
        <section className={styles.UserOffers}>{offers && <Offers offers={offers} />}</section>
      </main>
    </>
  );
};

export default Profile;
