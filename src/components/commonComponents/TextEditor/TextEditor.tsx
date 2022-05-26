import React, { useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from "../Button/Button";
import "./TextEditor.scss";
import { cssPrefix } from '../../../config';
import classNames from "classnames";

const cls = `${cssPrefix}-text-editor`;

const modules = {
    toolbar: {
        container: "#toolbar",
    }
};

const formats = [
    "header",
    "size",
    "bold",
    "italic"
];
const CustomToolbar = () => (
    <div id="toolbar">
        <select className="ql-header">
            <option value="1">Tytuł</option>
            <option value="2">Podtytuł</option>
            <option value="">Tekst</option>
        </select>
        <Button kind="ghost" className="ql-bold" />
        <Button kind="ghost" className="ql-italic" />
        <Button kind="ghost" className="ql-clean" />
    </div>
);

export function TextEditor(props: any) {
    const {
        id, label, errorText, className, defaultValue,
        error, readOnly, maxLength,
        onChange
    } = props;
    const [value, setValue] = useState(defaultValue || '');
    const [isError, setError] = useState<boolean>(error);
    const editorRef = useRef(null);
    useEffect(() => {
        console.log(editorRef);
        onChange(value);
    }, [value]);

    const classes = classNames(className, {
        [`${cls}`]: true,
        [`${cls}--error`]: isError || error,
    });

    return (
        <div className={classes}>
            <CustomToolbar />
            <ReactQuill
                ref={editorRef}
                id={id}
                theme="snow"
                readOnly={readOnly}
                value={value}
                placeholder={label}
                onChange={(val) => setValue(val)}
                modules={modules}
                formats={formats}
            />
            {
                (isError || error) && <p className={`${cls}--errorText`} onClick={(e) => editorRef.current?.focus()}>{errorText}</p>
            }
            {
                (!isError && !error) && maxLength && <p className={`${cls}--helperText`} onClick={(e) => editorRef.current?.focus()}>{`${value.length} / ${maxLength}`}</p>
            }
        </div>
    );
}