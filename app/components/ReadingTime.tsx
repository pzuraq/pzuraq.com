export default function ReadingTime({ readingTime }: { readingTime: number }) {
  let coffees: number;

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

  return (
    <>
      <span className="mr-1">{readingTime} min read</span>
      {Array.from({ length: coffees }, (_, i) => (
        <img
          key={i}
          alt="coffee"
          src="/assets/coffee.svg"
          aria-hidden="true"
          className="h-4 w-4 inline-block -mt-1.5"
        />
      ))}
    </>
  );
}
