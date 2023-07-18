import { PropsWithChildren, ReactNode } from "react";

type Props = {
  children: ReactNode;
  id: string;
};

export default ({ children, id }: Props) => {
  return (
    <section
      id={id}
      className="flex gap-6 items-center justify-center min-h-[650px] h-[100vh] w-full flex-col"
    >
      {children}
    </section>
  );
};
