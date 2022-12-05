interface Props {
  children: React.ReactNode;
}

export function PageLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col justify-between">{children}</div>
  );
}

export function Content({ children }: Props) {
  return <div>{children}</div>;
}

export default function SignLayout({ children }: Props) {
  return <PageLayout>{children}</PageLayout>;
}
