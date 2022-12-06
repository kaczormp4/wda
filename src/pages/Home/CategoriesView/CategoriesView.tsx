import { FC } from 'react';
import { ICategory } from '../../../api/Categories';
import Button from '../../../components/commonComponents/Button/Button';
import s from './CategoriesView.module.scss';
import { useNavigate } from 'react-router-dom';
import { fill } from 'lodash';

type P = {
  categories: ICategory[];
};

const getImg = (name: string) => {
  let fileName = name;
  // special cases
  if (name === 'Sale weselne') {
    fileName = 'Sale';
  }
  const img = require(`./../../../assets/images/${fileName}.jpg`);
  return img;
};

export const CategoriesView: FC<P> = props => {
  const navigate = useNavigate();
  const { categories } = props;
  console.log(categories);

  const getCategoryBtn = (cat: ICategory) => {
    const img = getImg(cat.name);

    return (
      <a
        href={`/ogloszenia/${cat.id}`}
        key={cat.id}
        className={s.CatBtn}
        style={{ backgroundImage: `url(${img})` }}
        title={cat.name}
      >
        <span className={s.CatBtnName}>
        {cat.name}
        </span>
      </a>
    );
  };

  return (
    <div className={s.Categories}>
      <div className={s.CatList}>
        {categories
          ? [...categories, categories[1], categories[3]].map(v => {
              return getCategoryBtn(v);
            })
          : fill(Array(8), null).map((x, i) => <Button key={i} size="lg" skeleton></Button>)}
      </div>
    </div>
  );
};
