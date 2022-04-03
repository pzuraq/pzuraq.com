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

const COFFEE_HTML = '<img src="/coffee.svg" class="h-4 w-4 inline-block -mt-1.5" />';

export const formatReadingTime = (readingTime: number): string => {
  let coffees;

  if (readingTime < 5) {
    coffees = 1;
  } else if (readingTime < 10) {
    coffees = 2;
  } else if (readingTime < 20) {
    coffees = 3;
  } else if (readingTime < 30) {
    coffees = 4;
  } else {
    coffees = 5;
  }

  const coffeesHtml = new Array(coffees).fill(COFFEE_HTML).join('');

  return `<span class="mr-1">${readingTime} min read</span> ${coffeesHtml}`;
};
