import styles from './index.module.css';

import igniteLogo from '../../assets/image/ignite-logo.svg'

export function Header(){
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Ignite logo" />
    </header>
  )
}