import Image from "next/image";
import styles from "@/components/common/Common.module.css";

export default function Logo() {
  return (
    <Image
      priority
      src="/old-dominion-monarchs.svg"
      width={900}
      height={900}
      alt="odu_logo"
      id={styles.oduLogo}
    />
  );
}
