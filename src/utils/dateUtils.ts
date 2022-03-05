import moment, { Moment } from 'moment';

function getRandomDate(): Moment {
    return moment(new Date(+(new Date()) - Math.floor(Math.random() * 1000000000)));
}

function newMomentDate(date: Date | string): Moment {
    return moment(date);
}

function getHour(date: Date | string): string {
    const momentDate = newMomentDate(date);
    return momentDate.format('HH:SS');
}

export {
    getRandomDate,
    getHour,
}