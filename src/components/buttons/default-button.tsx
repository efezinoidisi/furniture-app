import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function DefaultButton(props: ButtonProps) {
  const { children, ...otherButtonProps } = props;
  return <button {...otherButtonProps}>{children}</button>;
}
