import { useState } from "react";
import { useOutlet } from "react-router-dom";

export const PublicLayout = () => {
  const [context] = useState(useOutlet());

  return <>{context}</>;
};
