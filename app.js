//keyboard shortcuts
//focus add button
window.addEventListener('keydown', (event) => {
  // if(event.ctrlKey && event.altKey && event.key === '1') {
  //   document.getElementById('add_button').click();
  // }
  if(event.ctrlKey && event.altKey && event.code === 'Digit1') {
    document.getElementById('add_button').click();
  }
})
//focus list button
window.addEventListener('keydown', (event) => {
  // if(event.ctrlKey && event.altKey && event.key === '2') {
  //   document.getElementById('list_button').click();
  // }
  if(event.ctrlKey && event.altKey && event.code === 'Digit2') {
    document.getElementById('list_button').click();
  }
})
//focus remove button
window.addEventListener('keydown', (event) => {
  // if(event.ctrlKey && event.altKey && event.key === '3') {
  //   document.getElementById('remove_button').click();
  // }
  if(event.ctrlKey && event.altKey && event.code === 'Digit3') {
    document.getElementById('remove_button').click();
  }
})
//clear list
window.addEventListener('keydown', (event) => {
  // if(event.ctrlKey && event.altKey && event.key === '3') {
  //   document.getElementById('remove_button').click();
  // }
  if(event.ctrlKey && event.altKey && event.code === 'Digit4') {
    document.getElementById('clear_button').click();
  }
})
//close add window
window.addEventListener('keydown', (event) => {
  if(event.key === 'Escape') {
    document.getElementById('container_add').style.display = 'none';
  }
})
//close remove window
window.addEventListener('keydown', (event) => {
  if(event.key === 'Escape') {
    document.getElementById('container_remove').style.display = 'none';
  }
})
//focus first field
window.addEventListener('keydown', (event) => {
  if(event.ctrlKey && (event.key === 'm')) {
    let product_name = document.getElementById('product_name');
    product_name.focus();
    // product_name.placeholder = '';
  }
})
//erase product_name placeholder onfocus
function erase_placeholder() {
  document.getElementById('product_name').placeholder = '';
}
//close add/remove window
function close_window() {
  let container_add = document.getElementById('container_add');
  let container_remove = document.getElementById('container_remove');
  container_add.style.display = 'none';
  container_remove.style.display = 'none';
}

// Show add product's board
function showAdd() {
  document.getElementById('container_add').innerHTML = `
    <div class="informations">
      <fieldset class="close_field">
        <label class="close_button">Esc</label>
        <button class="close_button" onclick="close_window()">X</button>
      </fieldset>
      <label for="product_name">Product Name</label>
      <input type="text" name="product_name" id="product_name" placeholder="ctrl+m or tab" onfocus="erase_placeholder()">
      <label for="product_description">Product Description</label>
      <textarea name="product_description" id="product_description" cols="30" rows="10"></textarea>
      <label for="product_price">Product Price</label>
      <input type="number" name="product_price" id="product_price">
    
      <p>Available for sale?</p>
      <div class="available">
      Yes <input type="radio" name="available" value="yes" id="yes">
      No <input type="radio" name="available" value="no" id="no">
      </div>
      <div class="button_block"><button class="button" onclick="save()">Save</button></div>
    </div>
    `
  let add_board = document.getElementById('container_add');
  let container_remove = document.getElementById('container_remove');
  if(container_remove.style.display === 'flex') {
    container_remove.style.display = 'none';
  }
  add_board.style.display = 'flex';
}

//save new product
function save() {
  let product_name = document.getElementById('product_name').value;
  let product_description = document.getElementById('product_description').value;
  let product_price = document.getElementById('product_price').value;
  let new_item = {
    name: product_name.toLowerCase(),
    description: product_description,
    price: product_price.toString().slice(0, (product_price.indexOf('.')) + 3)
  };
  
  localStorage.setItem(new_item.name, JSON.stringify(new_item))

  listProducts();
  document.getElementById('container_add').style.display = 'none';
}

//list products
function listProducts() {
  let table = document.getElementById('products_table');
  let body = document.createElement('tbody');

  document.getElementById('products_table').innerHTML = ''
  document.getElementById('products_table').innerHTML = `
    <thead>
      <th width="200px">Name</th>
      <th width="200px">Price</th>
    </thead>
  `
  // ********** PROCURAR COMO ORDENAR ITENS LOCALSTORAGE
  for(const element in localStorage) {
    let new_item = document.createElement('tr')
    let new_name = document.createElement('td')
    let new_price = document.createElement('td')

    if(JSON.parse(localStorage.getItem(element)) != null) {
      new_name.innerText = JSON.parse(localStorage.getItem(element)).name
      new_price.innerText = JSON.parse(localStorage.getItem(element)).price
      new_item.appendChild(new_name)
      new_item.appendChild(new_price)
      body.appendChild(new_item)
    }
  }
  table.appendChild(body);
}

function showRemove() {
  //TODO: create a window to remove an item
  document.getElementById('container_remove').innerHTML = `
    <div class="informations">
      <fieldset class="close_field">
        <label class="close_button">Esc</label>
        <button class="close_button" onclick="close_window()">X</button>
      </fieldset>
      <fieldset>
        <label>Product Name:</label>
        <input 
          type="text" 
          name="product_name" 
          id="product_name" 
          class="product_name_remove" 
          placelist_products.spliceholder="ctrl+m or tab" 
          onfocus="erase_placeholder()"
        >
      </fieldset>
      <div class="button_block">
        <button class="button" onclick="remove()">
          Remove
        </button>
      </div>
    </div>
  `
  let remove_window = document.getElementById('container_remove');
  remove_window.style.display = 'flex'
}

function remove() {
  let product_name = document.getElementById('product_name').value.toLowerCase();
  for(const element in localStorage) {
    if(JSON.parse(localStorage.getItem(element)) != null) {
      let item_to_remove = JSON.parse(localStorage.getItem(element)).name
      if (item_to_remove === product_name) {
        localStorage.removeItem(product_name)
      }
    }
  }
  document.getElementById('container_remove').style.display = 'none';
  listProducts();
}

function clearList() {
  localStorage.clear();
  listProducts(); 
}