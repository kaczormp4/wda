import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAdvertisement, Advertisements as AdvAPI } from '../../api/Advertisements';
import styles from './Profile.module.scss';
import Button from '../../components/commonComponents/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { OfferCard } from '../../components/OfferCard/OfferCard';
import { MSALInstance } from '../../api/Authentication/MSALConfig';
import { Account } from 'msal';

type ProfileProps = {};

const Profile: FC<ProfileProps> = () => {
  const [offers, setOffers] = useState<IAdvertisement[]>(null);
  const [profile, setPofile] = useState<Account>(null);
  const [isShowPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);

  let { id } = useParams();
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };

  useEffect(() => {
    if (id === undefined) {
      const prof = MSALInstance.getAccount();
      if (prof) setPofile(prof);
      else navigateTo('notfound');
    } else {
    }
  }, [id]);

  if (id) {
    return <p>Public profile not implemented</p>;
  }
  if (!profile) {
    return <p>Loading...</p>;
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
                {profile.idTokenClaims.given_name || profile.idTokenClaims.family_name ? (
                  <h1>
                    {profile.idTokenClaims.given_name} {profile.idTokenClaims.family_name}
                  </h1>
                ) : (
                  <h1>{profile.name}</h1>
                )}
                <FontAwesomeIcon icon="check-circle" />
              </div>
              <div>45 opinii</div>
              <div>★★★★★</div>
            </div>
            <div className={styles.Buttons}>
              <Button icon={<FontAwesomeIcon icon="edit" />}>Edytuj profil</Button>
              <Button onClick={() => setShowPhoneNumber(!isShowPhoneNumber)}>Zadzwoń</Button>
              {isShowPhoneNumber && (
                <div className={styles.PhoneNumber}>
                  723 333 222 <FontAwesomeIcon icon="clone" />
                </div>
              )}
              <Button>Wyślij Wiadomość</Button>
            </div>
          </div>
        </section>
        <section className={styles.SearchEngineAndFilter}></section>
        {/* <section className={styles.ActiveOffers}>
                {
                    offers?.map((off) => <OfferCard key={off.id} offer={off} />)
                }
            </section> */}
      </main>
    </>
  );
};

export default Profile;
