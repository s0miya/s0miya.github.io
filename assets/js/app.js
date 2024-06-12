const navItems = document.getElementsByClassName('nav-link');
const navToggle = document.getElementById('nav-toggle');
let activeNavItem = navItems[0]
let isNavItemClicked = false;

const setActiveNavItem = () => {

navItems[0].classList.add('active')

for (let i = 0; i < navItems.length; ++i) {
    let navItem = navItems[i];
    navItem.onclick = function () {
        isNavItemClicked = true

        if (navToggle.checked) {
            navToggle.checked = false;
        }

        if (i != (navItems.length - 1)) {
          activeNavItem = document.getElementsByClassName('active')[0];
          activeNavItem.classList.remove('active');
          this.classList.add('active');
        }
    }
}
}

const storageKey = 'theme-preference'

const getColorPreference = () => {
    if (localStorage.getItem(storageKey))
      return localStorage.getItem(storageKey)
    else
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
}

const setPreference = () => {
    localStorage.setItem(storageKey, theme.value)
    reflectPreference()
  }
  
const reflectPreference = () => {
    document.firstElementChild
      .setAttribute('data-theme', theme.value)

    document
      .querySelector('#theme-toggle')
      ?.setAttribute('aria-label', `${theme.value}theme`)

    updateThemeElement()
}

const theme = {
    value: getColorPreference(),
}

const onClick = () => {
    if (theme.value === 'light') {
        theme.value = 'dark'
    } else {
        theme.value = 'light'
    }
  
    setPreference()
  }

const updateThemeElement = () => {
    document
    .getElementById('github-logo')
    .src = (theme.value === 'dark')
    ? '/assets/images/icons/github-logo-white.webp'
    : '/assets/images/icons/github-logo.webp'
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
    // set on load so screen readers can see latest value on the button
    reflectPreference()
  
    // now this script can find and listen for clicks on the control
    document
      .querySelector('#theme-toggle')
      .addEventListener('click', onClick)

    setActiveNavItem()
}

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches:isDark}) => {
    theme.value = isDark ? 'dark' : 'light'
    setPreference()
  })

const sections = document.getElementsByTagName('section')
const scrollOffsetTop = sections[0].offsetTop

window.onscroll = () => {
  if (navToggle.checked) {
    navToggle.checked = false;
  }

  if (!isNavItemClicked) {
    for (let i = 0; i < sections.length; i++) {
      if ((window.scrollY + scrollOffsetTop) >= sections[i].offsetTop && (window.scrollY <= sections[i].offsetHeight || (i+1) == sections.length)) {
        activeNavItem = document.getElementsByClassName('active')[0];
        activeNavItem.classList.remove('active')
        navItems[i].classList.add('active')
        activeNavItem = navItems[i]
      }
    }
  }
}

window.onscrollend = () => {
  isNavItemClicked = false
}