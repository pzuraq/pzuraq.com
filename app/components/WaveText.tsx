export default function WaveText({ text }: { text: string }) {
  const letters = text.split('');

  return (
    <span className="text-effect">
      {letters.map((letter, index) => (
        <span key={index} style={{ '--n': index } as React.CSSProperties}>
          {letter === ' ' ? '\xa0' : letter}
        </span>
      ))}
    </span>
  );
}
