//products list
let list_products = [
  {name:'apple', price:9.99},
  {name:'avocado', price:9.99},
  {name:'Pineapple', price:9.99}
]

//keyboard shortcuts
//focus add button
window.addEventListener('keydown', (event) => {
  if(event.ctrlKey && event.altKey && event.key === '1') {
    document.getElementById('add_button').click();
  }
})
//focus list button
window.addEventListener('keydown', (event) => {
  if(event.ctrlKey && event.altKey && event.key === '2') {
    document.getElementById('list_button').click();
  }
})
//focus remove button
window.addEventListener('keydown', (event) => {
  if(event.ctrlKey && event.altKey && event.key === '3') {
    document.getElementById('remove_button').click();
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

// Show add product's board
function showAdd() {
  document.getElementById('container_add').innerHTML = `
    <div class="informations">
      <fieldset class="close_field">
        <label class="close_button">Esc</label>
        <button class="close_button">X</button>
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
  add_board.style.display = 'flex';
}

//save new product
function save() {
  let product_name = document.getElementById('product_name').value;
  let product_description = document.getElementById('product_description').value;
  let product_price = document.getElementById('product_price').value;
  let new_item = {
    name: product_name,
    description: product_description,
    price: product_price.toString().slice(0, (product_price.indexOf('.')) + 3)
  };
  
  list_products.push(new_item)
  console.log(list_products) 
  listProducts();

  document.getElementById('container_add').style.display = 'none';
}

//list products
function listProducts() {
  //get table
  let table = document.getElementById('products_table');
  //create table's body
  let body = document.createElement('tbody');
  //erase table before showing (prevent multiple tables if the button is pressed again)
  document.getElementById('products_table').innerHTML = ''
  //insert columns' names
  document.getElementById('products_table').innerHTML = `
    <thead>
      <th width="200px">Name</th>
      <th width="200px">Price</th>
    </thead>
  `
  let ordered_list = list_products.sort((a, b) => a.price - b.price);
  //iterate through list
  ordered_list.forEach(el => {
    //create new item with name/price at row
    let new_item = document.createElement('tr');
    let new_name = document.createElement('td');
    let new_price = document.createElement('td');
    new_name.innerText = el.name;
    new_price.innerText = el.price;
    new_item.appendChild(new_name);
    new_item.appendChild(new_price);
    //insert new item in body
    body.appendChild(new_item);
  })
  //insert body in table
  table.appendChild(body);
}

function showRemove() {
  //TODO: create a window to remove an item
  document.getElementById('container_remove').innerHTML = `
    <div class="informations">
      <fieldset class="close_field">
        <label class="close_button">Esc</label>
        <button class="close_button">X</button>
      </fieldset>
      <fieldset>
        <label>Product Name:</label>
        <input 
          type="text" 
          name="product_name" 
          id="product_name" 
          class="product_name_remove" 
          placeholder="ctrl+m or tab" 
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
  list_products.forEach(item => {
    if (item.name === product_name) {
      list_products.splice(list_products.indexOf(item), 1);
    }
  })
  document.getElementById('container_remove').style.display = 'none';
  listProducts();
}