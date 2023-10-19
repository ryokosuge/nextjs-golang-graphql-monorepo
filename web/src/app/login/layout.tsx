type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className="max-w-full border rounded-lg">{children}</div>;
}
