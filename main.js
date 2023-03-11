console.log('Hello from main.js!');
// IIFE 
(async () => {

  // Wait for the target element to appear in the DOM
  await new Promise(resolve => {
    const observer = new MutationObserver(() => {
      if (document.querySelector('.pw-post-title')) {
        resolve();
        observer.disconnect();
      }
    });
    observer.observe(document, { childList: true, subtree: true });
  });

  // if there is already a mark as read button, exit
  if (document.querySelector('.mark-as-read-button')) {
    return;
  }

  const targetElement = document.querySelector('.pw-post-title');

  if (!targetElement) {
    console.log('Could not find the target element!');
  } else {
    // Create the "Mark as Read" button
    const markAsReadButton = document.createElement('button');

    // tick svg 
    const tickSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
    <path d="M13.97 4.97a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06L6.47 10.94l6.47-6.47a.75.75 0 0 1 1.06 0z"/>
    </svg>`;

    // Set the button's text
    markAsReadButton.innerHTML = `${tickSvg} Mark as Read`;

    // class
    markAsReadButton.classList.add('mark-as-read-button');

    let isMarkedAsRead = false;
    let removedFromReadingList = false;

    // Add a click event listener to the button
    markAsReadButton.addEventListener('click', () => {
      console.log('Mark as Read button clicked');

      document.querySelectorAll('[aria-controls="addToCatalogBookmarkButton"]')[0].click();

      const addReadingListInterval = setInterval(() => {
        const pTags = document.querySelectorAll('p');
        pTags.forEach(pTag => {
          if (pTag.innerText.includes("Read Story")) {
            const parentDiv = pTag.parentElement.parentElement;
            const isChecked = parentDiv.querySelector('input').checked;

            if (!isChecked) {
              pTag.click();
            }

            isMarkedAsRead = true;

            clearInterval(addReadingListInterval);
          }
        });
      }, 1000);

      const removeReadingListInterval = setInterval(() => {
        const pTags = document.querySelectorAll('p');
        pTags.forEach(pTag => {
          if (pTag.innerText.includes("Reading list")) {
            const parentDiv = pTag.parentElement.parentElement;
            const isChecked = parentDiv.querySelector('input').checked;

            if (isChecked) {
              pTag.click();
            }

            removedFromReadingList = true;

            clearInterval(removeReadingListInterval);
          }
        });
      }, 1000);

      const removeInterval = setInterval(() => {
        console.log(isMarkedAsRead, removedFromReadingList);
        if (isMarkedAsRead && removedFromReadingList) {
          markAsReadButton.remove();
          document.querySelectorAll('[aria-controls="addToCatalogBookmarkButton"]')[0].click();
          clearInterval(removeInterval);
        }
      }, 1000);

    });

    // Inject the button into the page
    targetElement.prepend(markAsReadButton);
  }


})();