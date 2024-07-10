let shoppingList = [];
    // Load list from local storage
    if (localStorage.getItem('shoppingList')) {
      shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
      renderList();
    }

    // Event listeners
    document.getElementById('add-btn').addEventListener('click', addItem);
    document.getElementById('clear-btn').addEventListener('click', clearList);

    // Function to add item 
    function addItem() {
      const newItemInput = document.getElementById('new-item');
      const newItemText = newItemInput.value.trim();
      if (newItemText) {
        shoppingList.push({ text: newItemText, purchased: false });
        newItemInput.value = '';
        renderList();
      }
    }

    // Function to render list
    function renderList() {
      const listContainer = document.getElementById('list-container');
      listContainer.innerHTML = '';
      shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.purchased;
        checkbox.addEventListener('click', () => {
          togglePurchased(index);
        });
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(item.text));
        listContainer.appendChild(listItem);
      });
      saveListToLocalStorage();
    }

    // Function for the purchase change
    function togglePurchased(index) {
      shoppingList[index].purchased = !shoppingList[index].purchased;
      renderList();
    }

    // Function to clear list
    function clearList() {
      shoppingList = [];
      renderList();
    }

    // Function to save list to local storage
    function saveListToLocalStorage() {
      localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }