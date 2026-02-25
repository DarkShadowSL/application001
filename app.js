const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const textAreas = document.querySelectorAll('textarea[maxlength]');

const ticketPrefixes = {
  support: 'SUP',
  staff: 'STAFF',
  leave: 'LEAVE',
  equipment: 'EQP',
};

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

textAreas.forEach((textarea) => {
  const counter = textarea.parentElement.querySelector(`[data-counter-for="${textarea.name}"]`);
  if (!counter) return;

  const updateCounter = () => {
    counter.textContent = `${textarea.value.length} / ${textarea.maxLength} characters`;
  };

  textarea.addEventListener('input', updateCounter);
  updateCounter();
});

const forms = document.querySelectorAll('.application-form');
forms.forEach((form) => {
  const resultMessage = form.querySelector('.result');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const applicantName = formData.get('name') || 'there';
    const type = form.dataset.formType;
    const formTitle = form.dataset.formTitle || 'application';

    const ticketPrefix = ticketPrefixes[type] || 'REQ';
    const ticketId = `${ticketPrefix}-${Math.floor(1000 + Math.random() * 9000)}`;

    resultMessage.classList.add('success');
    resultMessage.textContent = `Thank you, ${applicantName}. Your ${formTitle} (${ticketId}) has been submitted.`;

    form.reset();

    form.querySelectorAll('textarea[maxlength]').forEach((textarea) => {
      const counter = textarea.parentElement.querySelector(`[data-counter-for="${textarea.name}"]`);
      if (counter) counter.textContent = `0 / ${textarea.maxLength} characters`;
    });
  });
});
