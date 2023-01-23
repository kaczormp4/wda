import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../components/commonComponents/Button/Button';
import Input from '../../components/commonComponents/Input/Input';

import { OffersView } from '../Offers/OffersView';

import { MSALInstance } from '../../api/Authentication/MSALConfig';
import { IUser, IUserEdit, Users } from '../../api/Users';
import { IOffer, Offers as OfferAPI } from '../../api/Offers';

import styles from './Profile.module.scss';
import { SectionMedium } from '../../components/Section/Section';

type ProfileProps = {};

const Profile: FC<ProfileProps> = () => {
  const [offers, setOffers] = useState<IOffer[]>(null);
  const [editUserForm, setEditUserForm] = useState<boolean>(null);
  const [sendingEditUserReq, setSendingEditUserReq] = useState<boolean>(false);
  // const [premiumVisbility, setPremiumVisbility] = useState<boolean>(false);
  const [isShowPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(null);

  let { id } = useParams();
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    formState,
    watch,
    getValues,
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      givenName: '',
      surname: '',
      description: '',
    },
  });
  watch();

  const isOwnProfile = id === undefined;

  useEffect(() => {
    const prof = MSALInstance.getAccount();
    if (prof && id === prof.accountIdentifier) {
      navigateTo('profil');
    }
    new Users().get(isOwnProfile ? prof.accountIdentifier : id).then(user => {
      reset({
        givenName: user.givenName,
        surname: user.surname,
        description: '',
      });
      setUser(user);
    });
    new OfferAPI().getUserOffers(isOwnProfile ? prof.accountIdentifier : id).then(userOffers => {
      setOffers(userOffers);
    });
  }, [id]);

  if (!user) {
    return <></>; // implement skeleton
  }

  const onSubmit = (values: IUserEdit) => {
    setSendingEditUserReq(true);
    new Users().patch(user.userIdentifier, values).then(v => {
      setUser({ ...user, ...values });
      setEditUserForm(false);
      setSendingEditUserReq(false);
      toast.success(v);
    });
  };

  return (
    <SectionMedium>
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
              {editUserForm ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="givenName"
                    control={control}
                    rules={{
                      required: 'Imię nie może być puste',
                      maxLength: {
                        value: 120,
                        message: 'Imię nie może mieć więcej niż 120 znaków',
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        className={styles.LongInput}
                        defaultValue={field.value}
                        kind="filled"
                        type="text"
                        disabled={sendingEditUserReq}
                        label="Imię"
                        required
                        errorText={errors.givenName?.message}
                        error={Boolean(errors.givenName)}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="surname"
                    control={control}
                    rules={{
                      required: 'Nazwisko nie może być puste',
                      maxLength: {
                        value: 120,
                        message: 'Nazwisko nie może mieć więcej niż 120 znaków',
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        className={styles.LongInput}
                        defaultValue={field.value}
                        kind="filled"
                        type="text"
                        disabled={sendingEditUserReq}
                        label="Nazwisko"
                        required
                        errorText={errors.surname?.message}
                        error={Boolean(errors.surname)}
                        {...field}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    size="md"
                    disabled={sendingEditUserReq}
                    kind="secondary"
                    value="Submit"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Zapisz
                  </Button>
                </form>
              ) : (
                <>
                  <div>
                    {user.givenName || user.surname && (
                      <h1>
                        {user.givenName} {user.surname}
                      </h1>
                    )}
                    <span className={styles.ProfileType}>Zwykły użytkownik</span>
                  </div>
                  <div>45 opinii</div>
                  <div>★★★★★</div>
                </>
              )}
              {/* <Button kind="secondary" onClick={() => setPremiumVisbility(!premiumVisbility)}>
                {!premiumVisbility ? 'Zmień plan na wyższy' : 'Ukryj sekcję pakietów'}
              </Button> */}
            </div>
            <div className={styles.Buttons}>
              {isOwnProfile && (
                <Button
                  icon={<FontAwesomeIcon icon="edit" />}
                  onClick={() => setEditUserForm(!editUserForm)}
                >
                  Edytuj profil
                </Button>
              )}
              <Button onClick={() => setShowPhoneNumber(!isShowPhoneNumber)}>Zadzwoń</Button>
              {isShowPhoneNumber && (
                <div className={styles.PhoneNumber}>
                  723 333 222 <FontAwesomeIcon icon="clone" />
                </div>
              )}
              {!isOwnProfile && (
                <Button renderAsLink={true} href={`/wiadomosci/${user.userIdentifier}`} disabled={!MSALInstance.getAccount()}>
                  Wyślij wiadomość
                </Button>
              )}
            </div>
          </div>
        </section>
        {isOwnProfile &&
          <section className={styles.PremiumSection}>
            <h2>Pakiet twojego konta</h2>
            <div className={styles.PremiumSectionWrapper}>
              <div className={styles.Card}>
                <div className={styles.CardContent}>
                  <p className={styles.CardTitle}>Zwykły</p>
                  <ul>
                    <li>Maksymalna liczba ogłoszeń: 3</li>
                    <li>Zwykłe pozycjonowane ogłoszeń</li>
                    <li>Brak dodatkowych benefitów</li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>

                <p>To twój aktualny pakiet</p>
              </div>
              <div className={styles.Card}>
                <div className={styles.CardContent}>
                  <p className={styles.CardTitle}>Premium</p>
                  <ul>
                    <li>Maksymalna liczba ogłoszeń: 10</li>
                    <li>Ulepszone pozycjonowane ogłoszeń</li>
                    <li>Możliwość uczestniczenia w akcjach promocyjnych</li>
                    <li>Zweryfikowane konto</li>
                    <li></li>
                  </ul>
                </div>
                <Button>Wybierz</Button>
              </div>
              <div className={styles.Card}>
                <div className={styles.CardContent}>
                  <p className={styles.CardTitle}>Premium+ </p>
                  <ul>
                    <li>Nieograniczona liczba ogłoszeń</li>
                    <li>Najlepsze pozycjonowane ogłoszeń</li>
                    <li>Możliwość uczestniczenia w akcjach promocyjnych</li>
                    <li>Zweryfikowane konto</li>
                    <li>Możliwość wyświetlenia ogłoszeń na stronie głównej</li>
                  </ul>
                </div>
                <Button kind="secondary">Wybierz</Button>
              </div>
            </div>
          </section>
        }
        <h2 className={styles.Header}>
          {isOwnProfile ? 'Twoje ogłoszenia' : 'Oferty użytkownika'}
        </h2>
        <section className={styles.UserOffers}>
          {<OffersView allowEdit={isOwnProfile} offers={offers} />}
        </section>
      </main>
    </SectionMedium>
  );
};

export default Profile;
