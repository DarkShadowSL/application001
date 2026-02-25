const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

function activateTab(tabId) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.id === tabId;
    panel.classList.toggle('active', isActive);
    panel.setAttribute('aria-hidden', String(!isActive));
  });
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => activateTab(button.dataset.tab));
});

const forms = document.querySelectorAll('.application-form');
forms.forEach((form) => {
  const resultMessage = form.querySelector('.result');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const applicantName = formData.get('name');
    const type = form.dataset.formType;

    resultMessage.classList.add('success');
    resultMessage.textContent =
      type === 'support'
        ? `Thanks ${applicantName}! Your support request has been received.`
        : `Thanks ${applicantName}! Your staff application has been submitted.`;

    form.reset();
  });
});
