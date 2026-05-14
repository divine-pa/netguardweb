document.addEventListener('DOMContentLoaded', function() {
  const nav = document.getElementById('navigation');
  if (!nav) return;

  const headerRow = nav.parentNode;
  let toggle = headerRow.querySelector('.nav-toggle');

  if (!toggle) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.setAttribute('aria-expanded', 'false');
    headerRow.insertBefore(toggle, nav);
  }

  const setNavOpen = open => {
    nav.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setNavOpen(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  document.addEventListener('click', event => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    setNavOpen(false);
  });

  const menuItems = nav.querySelectorAll('li');
  menuItems.forEach(item => {
    const submenu = item.querySelector('ul');
    if (!submenu) return;

    item.classList.add('has-submenu');
    submenu.classList.add('submenu');

    const submenuToggle = document.createElement('button');
    submenuToggle.type = 'button';
    submenuToggle.className = 'submenu-toggle';
    submenuToggle.setAttribute('aria-label', 'Toggle submenu');
    item.insertBefore(submenuToggle, submenu);

    submenuToggle.addEventListener('click', () => {
      const expanded = item.classList.toggle('submenu-open');
      submenuToggle.setAttribute('aria-expanded', String(expanded));
    });
  });
});
