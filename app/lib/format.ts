export const formatTitle = (title: string): string => {
  return title.replace(/\(nbsp\)/g, '\xa0');
};

export const formatPublishDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
