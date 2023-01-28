import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import Button from '../../components/commonComponents/Button/Button';

import { MSALInstance } from '../../api/Authentication/MSALConfig';
import { IReport, Reports } from '../../api/Reports';
import { IStatistics, Statistics } from '../../api/Statistics';

import styles from './AdminPanel.module.scss';
import { SectionMedium } from '../../components/Section/Section';

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
  const [statistics, setStatistics] = useState<IStatistics>(null);

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
    new Statistics().get().then(val => {
      console.log(val);
      setStatistics(val);
    });
  };

  const switchPage = (page: string) => {
    navigate(`${page}`);
  };

  const toggleReport = (id: number) => {
    new Reports().toggle(id).then(val => {
      toast.info(val);
      const newReports = [...reports];
      setReports(newReports.filter(v => v.id !== id));
    });
  };

  const getActiveView = () => {
    if (activePage === Pages.main.route) {
      return (
        <div className={styles.Reports}>
          {statistics ? (
            <>
              <div className={styles.StatsCard}>
                <p className={styles.CardTitle}>Liczba utworzonych ogłoszeń</p>
                <p className={styles.CardValue}>{statistics.offersCreated}</p>
              </div>
              <div className={styles.StatsCard}>
                <p className={styles.CardTitle}>Liczba użytkowników</p>
                <p className={styles.CardValue}>{statistics.amountOfUsers}</p>
              </div>
              <div className={styles.StatsCard}>
                <p className={styles.CardTitle}>Liczba zgłoszeń</p>
                <p className={styles.CardValue}>{statistics.amountOfReports}</p>
              </div>
            </>
          ) : (
            <></>
          )}
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
                  <div>
                    <Button kind="ghost" onClick={() => toggleReport(report.id)}>
                      Zamknij zgłoszenie
                    </Button>
                    <span
                      className={classnames(styles.ReportStatus, {
                        [styles.ReportComplete]: report.isCompleted,
                      })}
                    ></span>
                  </div>
                </div>
                <div className={styles.ReportContent}>
                  <label>Powód:</label>
                  <p>{report.reason}</p>
                  <label>Przedmiot zgłoszenia</label>
                  <Link to={`/ogloszenie/${report.offerId}`}>Ogłoszenie #{report.offerId}</Link>
                  <label>Zgłosil</label>
                  <Link to={`/profil/${report.reportingUser.userIdentifier}`}>
                    {report.reportingUser.givenName} {report.reportingUser.surname}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      );
    }
  };

  return (
    <SectionMedium>
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
    </SectionMedium>
  );
};

export default AdminPanel;
