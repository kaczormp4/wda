import { FC, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkhint from 'remark-hint';
import mark2 from './docsTEMPLATE.md';
import s from './Docs.module.scss';
import classNames from 'classnames';
import { MSALInstance } from '../api/Authentication/MSALConfig';

type Nav = {
  index: number;
  level: number;
  text: string;
};

export const Docs: FC = () => {
  const mark = require(`./../assets/docs.md`);
  const markAdmin = require(`./../assets/docsAdmin.md`);
  
  const [docsSource, setDocsSource] = useState<string>('');
  const [nav, setNav] = useState<Nav[]>([]);
  const [activeNavIndex, setActiveNavIndex] = useState<number>();
  const contentRef = useRef<HTMLDivElement>();
  const docsWrapper = useRef<HTMLDivElement>();
  const isAdmin = MSALInstance.getAccount(); // currently just isLoggedIn
  console.log({'d': 'd', mark, markAdmin});
  useEffect(() => {
    Promise.all([fetch(mark), fetch(markAdmin)])
      .then(async ([resp, respAdmin]) => {
        let text = await resp.text();
        const textAdmin = await respAdmin.text();
        if(isAdmin) {
          text = text + textAdmin;
        }
        setDocsSource(text);
        setNav(getNavStructure(text));
      });
  }, []);

  useEffect(() => {
    if (nav.length) {
      docsWrapper.current.addEventListener('scroll', scrollObserver);
    }
  }, [nav]);

  useEffect(() => {
    if (nav.length && contentRef.current) {
      const headings = getHeadings();
      headings.forEach((v, i) => {
        v.id = generateFriendlyHashLink(nav[i]);
      });
    }
    const hash = window.location.hash;
    if (hash) {
      scrollToId(hash.substring(1));
    }
  }, [nav]);

  const getHeadings = (): NodeListOf<Element> => {
    if (nav.length && contentRef.current) {
      return contentRef.current.querySelectorAll(`h1, h2, h3, h4`);
    }
  };

  const scrollObserver = (e: Event) => {
    const doc = e.target as HTMLElement;
    const scrollVal = doc.scrollTop;
    if (contentRef.current) {
      const headings = getHeadings();
      const pos: number[] = [];
      headings.forEach(v => {
        const top = v.getBoundingClientRect().top - doc.getBoundingClientRect().top;
        pos.push(Math.floor(top));
      });
      const nearestValue = Math.floor(
        pos.reduce((p, n) => (Math.abs(p) > Math.abs(n) ? n : p), Infinity)
      );
      const activeIndex = pos.findIndex(v => v === nearestValue);
      if (activeIndex !== -1) {
        setActiveNavIndex(activeIndex);
      }
    }
  };

  const scrollToId = (id: string) => {
    const wrapper = docsWrapper.current;
    const el = document.getElementById(id);
    if (!wrapper || !el) {
      return;
    }
    const prevTarget = wrapper.getElementsByClassName(s.target);
    if (prevTarget[0]) {
      prevTarget[0].classList.remove(s.target);
    }
    el.classList.add(s.target);
    el.addEventListener('animationend', () => {
      el.classList.remove(s.target);
    });
    wrapper.scrollTo({ top: el.offsetTop - wrapper.offsetTop, behavior: 'smooth' });
  };

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
        {nav.map((v, i) => {
          const classes = classNames(s.NavLink, {
            [`level_${v.level}`]: true,
            [`active`]: i === activeNavIndex,
          });

          return (
            <a
              className={classes}
              href={`#${generateFriendlyHashLink(v)}`}
              key={v.index}
              onClick={ev => {
                const target = ev.target as HTMLLinkElement;
                ev.preventDefault();
                ev.stopPropagation();
                window.history.pushState({}, '', target.href);
                const hash = window.location.hash;
                scrollToId(hash.substring(1));
              }}
            >
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
        <div className={s.DocsContent} ref={docsWrapper}>
          <div className={s.DocsContentInner}></div>
          <div className={s.DocsContentInner}>
            <ReactMarkdown children={docsSource} remarkPlugins={[remarkGfm, remarkhint]} />
          </div>
        </div>
      </div>
    </>
  );
};
