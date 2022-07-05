import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Advertisements, IAdvertisement } from '../../api/Advertisements';
import { Categories, FilterType, ICategory, ICategoryFilter } from '../../api/Categories';
import { PriceUnits } from '../../api/PriceUnits';
import Button from '../../components/commonComponents/Button/Button';
import Input from '../../components/commonComponents/Input/Input';
import Select, { ISelectItem } from '../../components/commonComponents/Select/Select';
import TextField from '../../components/commonComponents/TextField/TextField';
import CategoriesModal from './CategoriesModal';
import { useForm, Controller } from 'react-hook-form';

import styles from './NewAd.module.scss';
import PhotoAdder from './PhotoAdder';
import { TextEditor } from '../../components/commonComponents/TextEditor/TextEditor';
import MultiSelect from '../../components/commonComponents/MultiSelect/MultiSelect';

enum PRICE_TYPES {
  UNIT = 'UNIT',
  RANGE = 'RANGE',
}

enum PRICE_ERRORS {
  RANGE = 'Cena minimalna musi być mniejsza od ceny maksymalnej',
  NEGATIVE = 'Cena nie może być liczbą ujemną',
}

const priceTypes: ISelectItem[] = [
  {
    id: PRICE_TYPES.UNIT,
    value: PRICE_TYPES.UNIT,
    text: 'Cena jednostkowa',
  },
  {
    id: PRICE_TYPES.RANGE,
    value: PRICE_TYPES.RANGE,
    text: 'Zakres cen',
  },
];

const NewAd: FC = () => {
  const navigate = useNavigate();
  // REST
  const [categories, setCategories] = useState<ICategory[]>(null);
  const [priceUnits, setPriceUnits] = useState<ISelectItem[]>(null);
  // form validation
  const {
    control,
    handleSubmit,
    formState: { errors /* isValid */ },
    formState,
    watch,
    getValues,
  } = useForm({
    mode: 'all',
    defaultValues: {
      title: '',
      shortDescription: '',
      description: '',
      priceUnit: null,
      categoryId: null,
      priceUnitId: null,
      minPrice: 0,
      maxPrice: 0,
      selectedFilterValueIds: [],
      images: [],
    },
  });
  // form
  const [selectedCategory, setSelectedCategory] = useState<ICategoryFilter>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [priceType, setPriceType] = useState<string | number>();
  const formRef = useRef<HTMLFormElement>(null);
  const formValues = getValues();
  watch();
  useEffect(() => {
    new Categories().get().then(cats => {
      setCategories(cats);
    });
    new PriceUnits().get().then(data => {
      const firstItem: ISelectItem = {
        id: 0,
        value: null,
        text: 'Za darmo',
      };
      const selectItems = data.map(v => {
        return {
          id: v.id.toString(),
          value: v.id.toString(),
          text: v.unit,
        };
      });
      setPriceUnits([firstItem, ...selectItems]);
    });
  }, []);

  const onSubmit = (values: IAdvertisement) => {
    const formData = new FormData();
    if (priceType === PRICE_TYPES.UNIT) {
      values.maxPrice = values.minPrice;
    }
    if (values.selectedFilterValueIds) {
      values.selectedFilterValueIds = Object.values(values.selectedFilterValueIds)
        .flat()
        .map((v: any) => v.id);
      for (var i = 0; i < values.selectedFilterValueIds.length; i++) {
        formData.append('selectedFilterValueIds[]', values.selectedFilterValueIds[i] as any);
      }
      delete values.selectedFilterValueIds;
    }
    Object.entries(values).forEach(v => {
      formData.set(v[0], v[1] || '');
    });
    if (values.images) {
      for (const img of values.images) {
        formData.append('images', img as Blob);
      }
    }
    // sadly, formData cannot be string typed
    new Advertisements()
      .post(formData as any)
      .then(adId => {
        navigate(`/ogloszenie/${adId}`);
        toast.success('Dodano ogłoszenie!');
      })
      .catch(err => console.error(err));
  };

  const isPriceWrongErr = () => {
    const { minPrice, maxPrice } = getValues();
    if (formValues.priceUnitId && priceType === PRICE_TYPES.RANGE) {
      if (minPrice !== null && maxPrice !== null) {
        if (minPrice > maxPrice) {
          return PRICE_ERRORS.RANGE;
        } else if (minPrice < 0 || maxPrice < 0) {
          return PRICE_ERRORS.NEGATIVE;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const applyCategory = (category: ICategory, field: { onChange: any; name?: 'categoryId' }) => {
    setCategoryModalOpen(false);
    field.onChange(category.id);
    new Categories().getById(category.id).then(cat => {
      setSelectedCategory(cat);
    });
  };

  const setPhotos = (photos: { data: File }[], field: { onChange: any; name?: 'images' }) => {
    const data = photos.filter(v => v);
    field.onChange(data.map((v: { data: File }) => v.data));
  };

  const getFiltersSection = () => {
    const filters = selectedCategory.filters;
    return (
      <>
        <h2 className={styles.SectionHeader}>Dodatkowe informacje</h2>
        {filters.map(filter => {
          switch (filter.filterType) {
            case FilterType.SelectOne:
              return (
                <Controller
                  name="selectedFilterValueIds"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <div className={styles.FilterField} key={`${filter.id}__filter`}>
                      <label htmlFor={String(filter.id)} className={styles.FilterLabel}>
                        {filter.name}
                      </label>
                      <Select
                        id={`${filter.id}__filter`}
                        items={filter.filterValues.map(v => {
                          return {
                            ...v,
                            text: v.value,
                          };
                        })}
                        error={Boolean(errors.selectedFilterValueIds)}
                        {...field}
                        onChange={(e: ISelectItem) => {
                          const filterID = filter.id;
                          const newValue = {
                            ...field.value,
                            [filterID]: e,
                          };
                          field.onChange(newValue);
                        }}
                      />
                    </div>
                  )}
                />
              );
            case FilterType.SelectMany:
              return (
                <Controller
                  name="selectedFilterValueIds"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <div className={styles.FilterField} key={`${filter.id}__filter`}>
                      <label htmlFor={String(filter.id)} className={styles.FilterLabel}>
                        {filter.name}
                      </label>
                      <MultiSelect
                        id={`${filter.id}__filter`}
                        items={filter.filterValues?.map(v => {
                          return { id: v.id, text: v.value, value: v.id };
                        })}
                        error={Boolean(errors.selectedFilterValueIds)}
                        {...field}
                        onChange={(e: ISelectItem) => {
                            console.log(e);
                          const filterID = filter.id;
                          const newValue = {
                            ...field.value,
                            [filterID]: e,
                          };
                          field.onChange(newValue);
                        }}
                      />
                    </div>
                  )}
                />
              );
            default:
              return null;
          }
        })}
      </>
    );
  };

  const getPriceSection = () => {
    return (
      <>
        <h2 className={styles.SectionHeader}>Określ cenę</h2>
        <p className={styles.BtnLabel}>
          Dzięki określonej cenie pozwolisz dotrzeć klientom do swojej oferty{' '}
        </p>
        <div className={styles.PriceSection}>
          <Controller
            name="priceUnitId"
            control={control}
            defaultValue={Number(priceUnits[0].id)}
            render={({ field }) => (
              <Select
                items={priceUnits}
                error={Boolean(errors.priceUnitId)}
                errorText={errors.priceUnitId?.message}
                {...field}
                onChange={(e: ISelectItem) => field.onChange(e.value)}
              />
            )}
          />
          {formValues.priceUnitId ? (
            <Select
              items={priceTypes}
              defaultSelected={priceType}
              onChange={(e: ISelectItem) => {
                setPriceType(e.id);
              }}
            />
          ) : (
            <></>
          )}
        </div>
        {isPriceWrongErr() && (
          <p className={classNames(styles.BtnLabel, styles.Error)}>{isPriceWrongErr()}</p>
        )}
        {formValues.priceUnitId && priceType === PRICE_TYPES.UNIT && (
          <Controller
            name="minPrice"
            control={control}
            shouldUnregister
            rules={{
              required: 'Podaj cenę',
              min: { value: 0, message: 'Cena nie może być mniejsza niż 0' },
              max: { value: 99999, message: 'Cena nie może być większa niż 99999' },
            }}
            render={({ field }) => (
              <Input
                kind="filled"
                type="number"
                label="Cena"
                required
                defaultValue={formValues.minPrice || ''}
                error={Boolean(errors.minPrice)}
                errorText={errors.minPrice?.message}
                {...field}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(Number(e.target.value))
                }
              />
            )}
          />
        )}
        {formValues.priceUnitId && priceType === PRICE_TYPES.RANGE && (
          <>
            <div className={styles.PriceInputs}>
              <Controller
                name="minPrice"
                control={control}
                shouldUnregister
                rules={{
                  required: 'Podaj cenę',
                  min: { value: 0, message: 'Cena nie może być mniejsza niż 0' },
                  max: { value: 99999, message: 'Cena nie może być większa niż 99999' },
                  validate: isPriceWrongErr,
                }}
                render={({ field }) => (
                  <Input
                    kind="filled"
                    type="number"
                    label="Cena minimalna"
                    defaultValue={formValues.minPrice || ''}
                    required
                    error={Boolean(errors.minPrice)}
                    errorText={errors.minPrice?.type !== 'validate' && errors.minPrice?.message}
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(Number(e.target.value))
                    }
                  />
                )}
              />
              <Controller
                name="maxPrice"
                control={control}
                shouldUnregister
                rules={{
                  required: 'Podaj cenę',
                  min: { value: 0, message: 'Cena nie może być mniejsza niż 0' },
                  max: { value: 99999, message: 'Cena nie może być większa niż 99999' },
                  validate: isPriceWrongErr,
                }}
                render={({ field }) => (
                  <Input
                    kind="filled"
                    type="number"
                    label="Cena maksymalna"
                    defaultValue={formValues.maxPrice || ''}
                    required
                    error={Boolean(errors.maxPrice)}
                    errorText={errors.maxPrice?.type !== 'validate' && errors.maxPrice?.message}
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(Number(e.target.value))
                    }
                  />
                )}
              />
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <main className={styles.NewAd}>
        <h1 className={styles.Header}>Dodaj ogłoszenie</h1>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.FormSection}>
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
            <p className={styles.BtnLabel}>
              Dodaj krótki opis ogłoszenia, będzie on widoczny z poziomu wyszukiwania ogłoszeń
            </p>
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
              name="categoryId"
              control={control}
              rules={{ required: 'Musisz wybrać kategorię ogłoszenia' }}
              render={({ field }) => (
                <>
                  <Button
                    type="button"
                    size="lg"
                    icon={<FontAwesomeIcon icon="chevron-right" />}
                    onClick={() => setCategoryModalOpen(true)}
                  >
                    {selectedCategory ? selectedCategory.name : 'Wybierz kategorię'}
                  </Button>
                  {categoryModalOpen && (
                    <CategoriesModal
                      categories={categories}
                      onClose={() => setCategoryModalOpen(false)}
                      onBtnClick={(category: ICategory) => applyCategory(category, field)}
                    />
                  )}
                  {errors.categoryId && (
                    <p className={classNames(styles.BtnLabel, styles.Error)}>
                      {errors.categoryId?.message}
                    </p>
                  )}
                </>
              )}
            />
          </section>
          <section className={styles.FormSection}>
            <h2 className={styles.SectionHeader}>Dodaj zdjęcia</h2>
            <p className={styles.SectionDesc}>
              Dodaj zdjęcia jak najlepiej oddające przedmiot ogłoszenia. Pierwsze zdjęcie będzie
              miniaturą ogłoszenia.
            </p>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <>
                  <PhotoAdder
                    count={3}
                    {...field}
                    onChange={(photos: { data: File }[]) => {
                      setPhotos(photos, field);
                    }}
                  />
                </>
              )}
            />
          </section>
          <section className={styles.FormSection}>
            <h2 className={styles.SectionHeader}>Dodaj opis ogłoszenia</h2>
            <p className={styles.BtnLabel}>Opisz szczegółowo przedmiot ogłoszenia</p>
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
                  required
                  errorText={errors.description?.message}
                  maxLength={8000}
                  error={Boolean(errors.description)}
                  {...field}
                />
              )}
            />
          </section>
          {formValues.categoryId !== null && (
            <section className={styles.FormSection}>
              {getPriceSection()}
              {selectedCategory?.filters?.length ? getFiltersSection() : null}
            </section>
          )}
          <section className={classNames(styles.FormSection, styles.SubmitSection)}>
            <Button
              type="submit"
              size="lg"
              kind="secondary"
              value="Submit"
              onClick={handleSubmit(onSubmit)}
            >
              Dodaj ogłoszenie
            </Button>
          </section>
        </form>
      </main>
    </>
  );
};

export default NewAd;
