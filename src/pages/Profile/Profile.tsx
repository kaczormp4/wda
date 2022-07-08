import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IOffer, Offers as OfferAPI } from '../../api/Offers';
import styles from './Profile.module.scss';
import Button from '../../components/commonComponents/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { MSALInstance } from '../../api/Authentication/MSALConfig';
import { Account } from 'msal';
import { IUser, IUserEdit, Users } from '../../api/Users';
import Offers from '../Offers/Offers';
import { OffersView } from '../Offers/OffersView';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../components/commonComponents/Input/Input';
import { toast } from 'react-toastify';

type ProfileProps = {};

const Profile: FC<ProfileProps> = () => {
  const [offers, setOffers] = useState<IOffer[]>(null);
  const [profile, setPofile] = useState<Account>(null);
  const [editUserForm, setEditUserForm] = useState<boolean>(null);
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
    } else if (isOwnProfile) {
      if (prof) {
        setPofile(prof);
        reset({
          givenName: prof.idTokenClaims.given_name,
          surname: prof.idTokenClaims.family_name,
          description: '',
        });
        new OfferAPI().getUserOffers(prof.accountIdentifier).then(userOffers => {
          console.log({ userOffers });
          setOffers(userOffers);
        });
      } else navigateTo('notfound');
    } else {
      setPofile(null);
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

  const onSubmit = (values: IUserEdit) => {
    console.log({ values });
    new Users().patch(profile.accountIdentifier, values).then(v => {
      const newProfile = {
        ...profile,
        idTokenClaims: {
          ...profile.idTokenClaims,
          given_name: values.givenName,
          family_name: values.surname,
        },
      };
      console.log(newProfile);
      setPofile(newProfile);
      setEditUserForm(false);
      toast.success(v);
    });
  };

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
                    kind="secondary"
                    value="Submit"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Wyślij
                  </Button>
                </form>
              ) : (
                <>
                  <div>
                    {visibleProfile.givenName || visibleProfile.surname ? (
                      <h1>
                        {visibleProfile.givenName} {visibleProfile.surname}
                      </h1>
                    ) : (
                      <h1>{profile?.name}</h1>
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
              {profile && (
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
              {!profile && (
                <Button renderAsLink={true} href={`/wiadomosci/${visibleProfile.userIdentifier}`}>
                  Wyślij wiadomość
                </Button>
              )}
            </div>
          </div>
        </section>
        {
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
    </>
  );
};

export default Profile;
