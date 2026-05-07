/**
 * Shared utility functions for all sites
 */

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
};

export const truncateString = (str, num) => {
  if (str.length <= num) return str;
  return str.slice(0, num) + '...';
};
