import useFetch from "../hooks/useFetch";
import Error from "./Error";
import Loader from "./Loader";

interface Props<T> {
  url: string;
  renderFunc: (item: T) => React.ReactNode;
}

export default function SectionShell<T>({ url, renderFunc }: Props<T>) {
  const { data, isLoading, error } = useFetch<T[]>(url);

  if (isLoading) return <Loader />;
  if (error) return <Error>{error}</Error>;
  if (data) return <>{data.map(renderFunc)}</>;
}
