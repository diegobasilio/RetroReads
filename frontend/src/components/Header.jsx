import { Link, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import classNames from 'classnames';
import '../css/global.css';
import styles from "../css/Header&Footer/header.module.css";

const HeaderDefault = ({ className = "" }) => {
  const location = useLocation(); 

  // Verifica se a rota atual é login ou signup
  const hideSearchBar = ["/login", "/signup"].includes(location.pathname.toLowerCase());

  return (
    <header className={classNames(styles.headerDefault, className)}>
      <section className={styles.header}>

        {/* Logo e Nome da Empresa */}
        <div className={styles.brand}>
          <a href='/'><img className={styles.companyLogoIcon} loading="lazy" alt="Company Logo" src="/assets/img/companylogo@2x.png" /></a>
          <h1 className={styles.companyName}>
            <Link to="/" className={styles.companyNameLink}>RetroReads</Link>
          </h1>
        </div>

        {/* Barra de Pesquisa */}
        {!hideSearchBar && (
          <div className={styles.searchBarContainer}>
            <form className={styles.searchBar} role="search">
              <input 
                className={styles.searchInput} 
                type="text" 
                placeholder="Pesquisar..." 
              />
              <button type="submit" className={styles.searchIconWrapper}>
                <img className={styles.searchIcon} alt="Ícone de Pesquisa" src="/assets/icons/search-icon.svg" />
              </button>
            </form>
          </div>
        )}

        {/* Ícones de Login e Criar Conta */}
        <div className={styles.accountWrapper}>
          <Link to="/login">
            <img className={styles.loginIcon} loading="lazy" alt="Ícone de Login" src="/assets/icons/login-icon.svg" />
          </Link>

          <Link to="/signup" className={styles.signupLabel}>
            <span>Criar Conta</span>
          </Link>
        </div>
      </section>
    </header>
  );
};

HeaderDefault.propTypes = {
  className: PropTypes.string,
};

export default HeaderDefault;