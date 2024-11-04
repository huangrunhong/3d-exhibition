"use client";
import { useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";

const EyeIcon = ({ reveal = false }) =>
  reveal ? <RiEyeLine size={18} /> : <RiEyeCloseLine size={18} />;

type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends InputAttributes {
  name: string;
  label: string;
  suffix?: React.ReactNode;
}

const PasswordInput = ({
  name,
  label,
  autoComplete = "current-password",
  ...props
}: InputProps) => {
  const [reveal, setReveal] = useState(false);

  const toggle = () => setReveal(!reveal);
  const type = reveal ? "text" : "password";

  const suffix = (
    <button type="button" className="input-suffix" onClick={toggle}>
      <EyeIcon reveal={reveal} />
    </button>
  );

  return (
    <div className="flex-column gap-2">
      <label htmlFor={name}>{label}</label>
      <div className="p-relative">
        <input autoComplete={autoComplete} name={name} type={type} {...props} />
        {suffix}
      </div>
    </div>
  );
};

export default PasswordInput;
