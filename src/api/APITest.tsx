import React, { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/commonComponents/Button/Button';
import Input from '../components/commonComponents/Input/Input';
import styles from "./../components/Showcase/Showcase.module.scss";
import Buggy from './Buggy';
import Categories from './Categories';

const Showcase: FC = () => {
    const [data, setData] = React.useState(null);
    const [categoryID, setCategoryID] = React.useState(1);

    useEffect(() => {
        new Categories().get().then(resp => {
            setData(resp);
        })
    }, []);

    const addCategory = () => {
        new Categories().post({ name: 'test category' }).then((newID) => {
            toast.info(`Added new category with id: ${newID}`);
        })
    }

    const removeCategory = () => {
        new Categories().remove(categoryID).then((resp) => {
            console.log(resp);
            toast.warn(`Removed category with id: ${resp}`);
        }).catch(e => {
            console.log(e);
        })
    }

    return <section className={styles.Showcase}>
        <h1>Showcase</h1>
        <div className={styles.componentWrapper}>
            Categories
            <ul>
                {data && data.map((v: any, i: number) =>
                    <li key={i}>{v.name}</li>
                )}
            </ul>
        </div>
        <div className={styles.componentWrapper}>
            <Button kind="ghost" onClick={() => addCategory()}>Post new category</Button>
            <Button kind="ghost" onClick={() => removeCategory()}>Remove category with id {categoryID} </Button>
            <Input type="number" defaultValue={categoryID} onChange={(ev: InputEvent) => setCategoryID(Number((ev.target as HTMLInputElement).value))} />
        </div>
        <div className={styles.componentWrapper}>
            <Button danger kind="ghost" onClick={() => new Buggy().getBadRequest()}>Bad request</Button>
            <Button danger kind="ghost" onClick={() => new Buggy().getNotFound()}>Not found</Button>
            <Button danger kind="ghost" onClick={() => new Buggy().getServerError()}>Server error</Button>
            <Button danger kind="ghost" onClick={() => new Buggy().getUnauthorized()}>Unauthorized</Button>
        </div>

    </section>
}


export default Showcase;
