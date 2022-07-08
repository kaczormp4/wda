import React, { FC, useEffect, useRef, useState } from 'react';

import styles from './OfferEdit.module.scss';
import { IEditOffer, IOffer, Offers } from '../../../api/Offers';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from '../Skeleton/Skeleton';
import Slider from '../Slider/Slider';
import { FavButton } from '../../../components/FavButton/FavButton';
import { getTags } from '../../../components/OfferCard/OfferCard';
import Button from '../../../components/commonComponents/Button/Button';
import Input from '../../../components/commonComponents/Input/Input';
import TextField from '../../../components/commonComponents/TextField/TextField';
import { Controller, useForm } from 'react-hook-form';
import { TextEditor } from '../../../components/commonComponents/TextEditor/TextEditor';
import { MSALInstance } from '../../../api/Authentication/MSALConfig';
import { toast } from 'react-toastify';

type OfferEditProps = {};

const OfferEdit: FC<OfferEditProps> = () => {
  const [offer, setOffer] = useState<IOffer>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();
  let { offerId } = useParams();
  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };
  //form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      title: '',
      shortDescription: '',
      description: '',
    },
  });
  watch();

  useEffect(() => {
    if (offerId === undefined) navigateTo('notfound');

    new Offers()
      .get(offerId)
      .then(data => {
        const profile = MSALInstance.getAccount();
        if (data.author.userIdentifier === profile.accountIdentifier) {
          reset({
            title: data.title,
            shortDescription: data.shortDescription,
            description: data.description,
          });
          setOffer(data);
        } else {
          navigateTo('notfound');
        }
      })
      .catch(error => {
        navigateTo('notfound');
      });
  }, []);

  const onSubmit = (values: IEditOffer) => {
    console.log({ values });
    new Offers().patch(offer.id, values).then((v) => {
      toast.success(v);
      navigateTo(`ogloszenie/${offer.id}`);
    })
  };

  if (offer === null) {
    return <Skeleton />;
  }

  return (
    <>
      <form ref={formRef} className={styles.Container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.OfferInfoContainer}>
          <section className={styles.Slider}>
            {offer.images && <Slider photos={offer.images} maxNumOfPhotos={3} />}
          </section>
          <section className={styles.Description}>
            <div className={styles.DateAndFavourite}>
              <span> Dodano : 1 lipca 18:00</span>
              <FavButton disabled={true} offerId={String(offerId)} />
            </div>
            <Controller
              name="title"
              control={control}
              rules={{
                required: 'Hej, musisz podać tytuł ogłoszenia',
                maxLength: { value: 120, message: 'Tytuł nie może mieć więcej niż 120 znaków' },
              }}
              render={({ field }) => (
                <Input
                  className={styles.LongInput}
                  defaultValue={field.value}
                  kind="filled"
                  type="text"
                  label="Tytuł ogłoszenia"
                  required
                  errorText={errors.title?.message}
                  error={Boolean(errors.title)}
                  {...field}
                />
              )}
            />
            {/* <div className={styles.PriceAndInfo}>
              <h1>{getAdvPrice(offer as any)}</h1>
            </div> */}
            <div className={styles.AdditionalInfo}>{getTags(offer.selectedFilters)}</div>
            <Controller
              name="shortDescription"
              control={control}
              rules={{
                required: 'Hej, twoje ogłoszenie musi posiadać opis',
                maxLength: {
                  value: 1000,
                  message: 'Krótki opis ogłoszenia może mieć maksymalnie 1000 znaków',
                },
              }}
              render={({ field }) => (
                <TextField
                  id="newAdShortDesc"
                  className={styles.ShortDesc}
                  defaultValue={field.value}
                  kind="filled"
                  label="Krótki opis ogłoszenia"
                  required
                  errorText={errors.shortDescription?.message}
                  maxLength={1000}
                  error={Boolean(errors.shortDescription)}
                  {...field}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{
                required: 'Hej, twoje ogłoszenie musi posiadać opis',
                minLength: {
                  value: 50,
                  message: 'Opis ogłoszenia może mieć co najmniej 50 znaków',
                },
                maxLength: {
                  value: 8000,
                  message: 'Opis ogłoszenia może mieć maksymalnie 8000 znaków',
                },
              }}
              render={({ field }) => (
                <TextEditor
                  className={styles.TextEditor}
                  label="Opis ogłoszenia"
                  defaultValue={field.value}
                  required
                  errorText={errors.description?.message}
                  maxLength={8000}
                  error={Boolean(errors.description)}
                  {...field}
                />
              )}
            />
            <div className={styles.DescriptionFooter}>
              <div>ID: {offer.id}</div>
              <Button
                type="submit"
                size="lg"
                kind="secondary"
                value="Submit"
                onClick={handleSubmit(onSubmit)}
              >
                Wyślij
              </Button>
            </div>
          </section>
        </div>
      </form>
    </>
  );
};

export default OfferEdit;
