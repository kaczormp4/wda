import { FC } from 'react'
import { ICategory } from '../../../api/Categories';
import Button from '../../../components/commonComponents/Button/Button';
import s from "./CategoriesView.module.scss";
import { useNavigate } from 'react-router-dom';
import { fill } from 'lodash';


type P = {
    categories: ICategory[]
}

export const CategoriesView: FC<P> = (props) => {
    const navigate = useNavigate();
    const { categories } = props;

    const goToAdv = (cat: ICategory) => {
        navigate(`/ogloszenia/${cat.id}`);
    }

    return <div className={s.Categories}>
        <div className={s.CatList}>
            {categories
                ? categories.map((v) => {
                    return <Button key={v.id} size="lg" onClick={() => goToAdv(v)}>{v.name}</Button>
                })
                : fill(Array(12), null).map((x, i) => <Button key={i} size="lg" skeleton></Button>)
            }
        </div>
    </div>
}
