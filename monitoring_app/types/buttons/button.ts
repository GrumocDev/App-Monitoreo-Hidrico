interface Button {
  children?: React.ReactNode;
  testid?: string;
  disabled?: boolean;
  color: "white" | "green";
  className?: string;
  [key: string]: any;
}

interface ButtonProps extends Button {
  type?: "button" | "reset" | "submit";
}

interface LinkBtnProps extends Button {
  href?: string;
  testid?: string;
}

export type { ButtonProps, LinkBtnProps };
