import moment from 'moment';

export const isExpired = (expireAt: Date): boolean => {
  if (moment(expireAt) < moment(Date.now())) {
    return true;
  }
  return false;
};
