<template>
  <nav class="sidebar d-flex flex-column justify-content-between h-100">
    <div>
      <div class="logo-area">
        <router-link to="/" class="d-inline-block">
          <img
            src="../../assets/images/LOGO.png"
            alt="Personal Logo"
            class="logo-img"
          />
        </router-link>
      </div>

      <ul class="nav flex-column menu-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link">HOME</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">ABOUT</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/works" class="nav-link">WORKS</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link">CONTACT</router-link>
        </li>
      </ul>
    </div>

    <div class="footer-area">
      <div class="social-links mb-3">
        <a href="https://www.behance.net/49b3ad3c" class="social-icon"
          ><i class="bi bi-behance"></i
        ></a>
        <a href="https://github.com/andylinsally" class="social-icon"
          ><i class="bi bi-github"></i
        ></a>
      </div>
      <p class="copyright text-muted mb-0">© 2026 Jhih Syuan Lin</p>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.sidebar {
 
  padding: 3rem 2rem;
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: transparent;

  @media (min-width: map-get($grid-breakpoints, xl)) {
    
    padding: 4rem 3rem;
  }
}

.logo-area {
  margin-bottom: 4rem !important; 

  .logo-img {
    width: 80%;
    max-width: 120px;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }
  }
}

.menu-list {
  gap: 0.5rem; 
}

.nav-item {
  position: relative; 
}

.nav-link {
  color: #888; 
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  padding: 0.5rem 0;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  font-weight: 500;
  display: inline-block;

  
  &.router-link-active {
    color: var(--bs-primary);
    font-weight: 700;

    
    &::before {
      content: "●";
      font-size: 9px;
      position: absolute;
      left: -18px; 
      top: 50%;
      transform: translateY(-50%);
    }
  }

 
  &:hover:not(.router-link-active) {
    color: #111;
    transform: translateX(5px);
  }
}

.footer-area {
  .social-icon {
    display: inline-block;
    color: #888;
    font-size: 1.1rem;
    margin-right: 1.2rem;
    transition: all 0.3s ease;

    &:hover {
      color: var(--bs-primary);
      transform: translateY(-3px);
    }
  }

  .copyright {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
  }
}
</style>
