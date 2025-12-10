import Image from "next/image";
import React from "react";

export function Logo(props: Partial<React.ComponentProps<typeof Image>>) {
  return (
    <Image
      alt="fireflyee-logo-new-transparent"
      src={"/images/fireflyee-logo-new-transparent.png"}
      height={30}
      width={53}
      {...props}
    />
  );
}
