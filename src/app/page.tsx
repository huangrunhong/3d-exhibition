import PasswordInput from "components/password-input";

import styles from "./page.module.scss";

const Home = () => (
  <main className={styles.main}>
    <svg width="80" height="42" viewBox="0 0 73 38">
      <path
        d="M28 0v31h8V0h37v38h-7V7h-8v31h-7V7h-8v31H21V7h-7v31H7V7H0V0h28z"
        fill="currentColor"
      />
    </svg>
    <div className={styles.card}>
      <PasswordInput name="password" label="Password" />
      <button className="primary w-full">Explore</button>
    </div>
  </main>
);

export default Home;
