import { FC, useEffect, useState } from 'react';
import styles from './AdminPanel.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MSALInstance } from '../../api/Authentication/MSALConfig';
import Button from '../../components/commonComponents/Button/Button';
import classnames from 'classnames';
import { IReport, Reports } from '../../api/Reports';

type AdminPanelProps = {};
const Pages = {
  main: {
    route: 'main',
    label: 'Statystyki',
  },
  reports: {
    route: 'reports',
    label: 'Zgłoszone posty',
  },
};

const AdminPanel: FC<AdminPanelProps> = () => {
  const navigate = useNavigate();
  let { subpage } = useParams<string>();
  const [activePage, setActivePage] = useState(Pages.main.route);
  const [reports, setReports] = useState<IReport[]>(null);

  useEffect(() => {
    const prof = MSALInstance.getAccount();
    if (!prof) {
      navigate('/notfound');
    } else if ((prof && !subpage) || !Object.values(Pages).some(v => v.route === subpage)) {
      setActivePage(Pages.main.route);
      getData();
    } else {
      setActivePage(subpage);
      getData();
    }
  }, [subpage]);

  const getData = () => {
    new Reports().get().then(val => {
      setReports(val);
    });
  };

  const switchPage = (page: string) => {
    navigate(`${page}`);
  };

  const getActiveView = () => {
    if (activePage === Pages.main.route) {
      return (
        <div className={styles.Reports}>
          <p>Brak statysyk</p>
        </div>
      );
    }
    if (activePage === Pages.reports.route) {
      return (
        <div className={styles.Reports}>
          {reports &&
            reports.map(report => (
              <div className={styles.Report} key={`report_${report.id}`}>
                <div className={styles.ReportHeader}>
                  <span className={styles.ReportID}>#{report.id}</span>
                  <span
                    className={classnames(styles.ReportStatus, {
                      [styles.ReportComplete]: report.isCompleted,
                    })}
                  ></span>
                </div>
                <div className={styles.ReportContent}>
                  <label>Powód:</label>
                  <p>{report.reason}</p>
                  <label>Przedmiot zgłoszenia</label>
                  <Link to={`/ogloszenie/${report.offerId}`}>Ogłoszenie #{report.offerId}</Link>
                  <label>Zgłosil</label>
                  <Link to={`/profil/${report.reportingUser.userIdentifier}`}>{report.reportingUser.givenName} {report.reportingUser.surname}</Link>
                </div>
              </div>
            ))}
        </div>
      );
    }
  };

  return (
    <>
      <main className={styles.Container}>
        <header className={styles.Header}>
          {Object.values(Pages).map(v => {
            return (
              <Button
                key={v.route}
                className={classnames(styles.HeaderBtn, {
                  [styles.HeaderBtnActive]: activePage === v.route,
                })}
                kind="ghost"
                active={activePage === v.route}
                onClick={() => switchPage(v.route)}
              >
                {v.label}
              </Button>
            );
          })}
        </header>
        {getActiveView()}
      </main>
    </>
  );
};

export default AdminPanel;
