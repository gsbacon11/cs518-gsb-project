import Image from "next/image";
import styles from '../home/Home.module.css';


export default function Logo() {
  return (
    <Image src="/old-dominion-monarchs.svg" width={900} height={900} alt="odu_logo" id={styles.oduLogo}/>
  );
}