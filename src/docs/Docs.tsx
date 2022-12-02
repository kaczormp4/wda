import { FC, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkhint from 'remark-hint';
import mark from './docs.md';
import mark2 from './docsTEMPLATE.md';
import s from './Docs.module.scss';
import classNames from 'classnames';

type Nav = {
  index: number;
  level: number;
  text: string;
};

export const Docs: FC = () => {
  const [docsSource, setDocsSource] = useState<string>('');
  const [nav, setNav] = useState<Nav[]>([]);
  const contentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    fetch(mark)
      .then(response => {
        return response.text();
      })
      .then(text => {
        setDocsSource(text);
        setNav(getNavStructure(text));
      });

    // add special styling case for docs
    document.querySelector('.App .app')?.classList.add('no-scroll');
    return () => {
      document.querySelector('.App .app')?.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    if (nav.length && contentRef.current) {
      const headings = contentRef.current.querySelectorAll(`h1, h2, h3, h4`);
      headings.forEach((v, i) => {
        v.id = generateFriendlyHashLink(nav[i]);
      });
    }
    const hash = window.location.hash;
    if (hash) {
      document.getElementById(hash.substring(1))?.scrollIntoView({ behavior: 'auto' });
    }
  }, [nav]);

  const generateFriendlyHashLink = (item: Nav) => {
    return encodeURIComponent(item.text);
  };

  const getNavStructure = (source: string) => {
    const contentWithoutCode = source
      .replace(/(?:[^\n#]+)#+\s([^#\n]+)\n*/g, '')
      .replace(/```[^`\n]*\n+[^```]+```\n+/g, '')
      .replace(/`([^`\n]+)`/g, '$1')
      .replace(/\*\*?([^*\n]+)\*\*?/g, '$1')
      .replace(/__?([^_\n]+)__?/g, '$1')
      .trim();

    const pattOfTitle = /#+\s([^#\n]+)\n*/g;
    const matchResult = contentWithoutCode.match(pattOfTitle);

    if (!matchResult) {
      return [];
    }

    const navData = matchResult
      .map((r, i) => ({
        index: i,
        level: r.match(/^#+/g)[0].length,
        text: r.replace(pattOfTitle, '$1').replace('\r', ''),
      }))
      .filter(v => v.level <= 4);

    let maxLevel = 0;
    navData.forEach(t => {
      if (t.level > maxLevel) {
        maxLevel = t.level;
      }
    });

    return navData;
  };

  const getNav = () => {
    return (
      <nav className={s.Nav}>
        {nav.map(v => {
          const classes = classNames(s.NavLink, {
            [`level_${v.level}`]: true,
          });

          return (
            <a className={classes} href={`#${generateFriendlyHashLink(v)}`} key={v.index}>
              {v.text}
            </a>
          );
        })}
      </nav>
    );
  };

  return (
    <>
      <div className={s.Docs} ref={contentRef}>
        {getNav()}
        <div className={s.DocsContent}>
          <div className={s.DocsContentInner}>
            <ReactMarkdown children={docsSource} remarkPlugins={[remarkGfm, remarkhint]} />
          </div>
        </div>
      </div>
    </>
  );
};
