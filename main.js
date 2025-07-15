<<<<<<< HEAD
// Referencias a elementos del DOM
const TITLE = document.title;
const showItems = document.getElementById('show-items-btn');
/* Para el modal de "SACRIFICIO" */
const tablaBody = document.getElementById('tableBody');
const deleteItems = document.getElementById('delete-item-btn');
const deleteModal = document.getElementById('delete-modal-card');
const selectItem = document.getElementById('select-item');
const quantityInput = document.getElementById('quantity-input');
const quantityError = document.getElementById('quantity-error');
const confirmDiscountBtn = document.getElementById('confirm-discount-btn');
const cancelDiscountBtn = document.getElementById('cancel-discount-btn');
const searchItems = document.getElementById('search-items');
/* Para el modal de "NUEVOS" */
const addItemsBtn = document.getElementById('add-item-btn');
const addModal = document.getElementById('add-modal-card'); 
const newItemNameInput = document.getElementById('new-item-name');
const newItemPriceInput = document.getElementById('new-item-price');
const newItemStockInput = document.getElementById('new-item-stock');
const newItemCategoryInput = document.getElementById('new-item-category');
const addErrorMessage = document.getElementById('add-error-message');
const confirmAddBtn = document.getElementById('confirm-add-btn');
const cancelAddBtn = document.getElementById('cancel-add-btn');

/* FUNCIONES PARA CAMBIAR EL TITULO DE LA PAGINA CUANDO NO ESTA FOCUS    */
const tittles = [
    "Na mentira..😔",
    "Volve...🥺",
    "Mira, llego Messi 😎",
    "Ella no te ama 🤡",
    "Ya cambie mira ✨",
];
let tittlesIndex = 0;
let intervalT; 
function setChange() {
    if(intervalT){
        clearInterval(intervalT)
    }
    intervalT = setInterval(() => {
    document.title = tittles[tittlesIndex];
    tittlesIndex = (tittlesIndex + 1) % tittles.length;
}, 5000);
}
function stopChange() {
    clearInterval(intervalT)
    document.title = TITLE
    tittlesIndex= 0
}
document.addEventListener('visibilitychange', () =>{
    if(document.hidden){
        setChange()
    }else{
        stopChange()
    }
})


/* BASE DE INVENTARIO */
const inventario={ 
    productos: [
    {id:1 , nombre: "Yerba Mate",categoria: "Infucion" , stock: 44, precio: 1900},
    {id:2 , nombre: "Salsa de tomate Marolio",categoria: "Cocina" , stock: 151, precio: 2500},
    {id:3 , nombre: "Jabon Head&Shouldes",categoria: "Higiene" , stock: 0, precio: 1500},
    {id:4 , nombre: "Azucar la Pampa",categoria: "Infucion" , stock: 303, precio: 1000},
    {id:5 , nombre: "Cafe Nestter",categoria: "Infucion" , stock: 0, precio: 3000 }
    ],

    descontarStock(idProducto, cantidad = 0) { 
    let productoEncontrado = this.productos.find(p => p.id === idProducto); 
    if (!productoEncontrado) { 
        alert(`Error: El producto con ID ${idProducto} no fue encontrado.`);
        return false;
    }
    if (isNaN(cantidad) || cantidad <= 0) { 
        quantityError.textContent = `¡Pone un numero valido, animalito de dios!. Debe ser mayor a 0.`;
        quantityError.classList.add('visible');
        quantityInput.style.animation = 'shake 0.3s';
        setTimeout(() => quantityInput.style.animation = '', 300);
        return false;
    }
    if (productoEncontrado.stock < cantidad) {
        quantityError.textContent = `¡No tenés tanto raton! Stock actual: ${productoEncontrado.stock}. Cantidad solicitada: ${cantidad}.`;
        quantityError.classList.add('visible');
        quantityInput.style.animation = 'shake 0.3s';
        setTimeout(() => quantityInput.style.animation = '', 300);
        return false;
    }
    productoEncontrado.stock -= cantidad; 
    alert(`¡${cantidad} unidades de "${productoEncontrado.nombre}" fueron sacrificadas!`)
    this.mostrarInventario()
    return true;
    },
    mostrarItem(e){
    const itemFilter= this.productos.filter(item=>{
        if(e.trim() === ''){
            return true
        }
        const categoriaMinus= item.categoria.toLowerCase() 
        const nombreMinus= item.nombre.toLocaleLowerCase()
        const terminoMinus= e.toLowerCase()
        return categoriaMinus.includes(terminoMinus) || nombreMinus.includes(terminoMinus)
    })
    itemFilter.forEach(item => {
        const fila = document.createElement('tr'); 

        const celdaId = document.createElement('td');
        celdaId.textContent = item.id;
        fila.appendChild(celdaId); 

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = item.nombre;
        fila.appendChild(celdaNombre);

        const celdaCategoria = document.createElement('td');
        celdaCategoria.textContent = item.categoria || 'N/A'; 
        fila.appendChild(celdaCategoria);

        const celdaStock = document.createElement('td');
        celdaStock.textContent = item.stock;
        fila.appendChild(celdaStock);

        const celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = `$${item.precio.toFixed(2)}`; 
        fila.appendChild(celdaPrecio);
        tablaBody.appendChild(fila); 
    });
    },

    mostrarInventario() {
    tablaBody.innerHTML = ''; 

    this.productos.forEach(item => {
        const fila = document.createElement('tr'); 

        const celdaId = document.createElement('td');
        celdaId.textContent = item.id;
        fila.appendChild(celdaId); 

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = item.nombre;
        fila.appendChild(celdaNombre);

        const celdaCategoria = document.createElement('td');
        celdaCategoria.textContent = item.categoria || 'N/A'; 
        fila.appendChild(celdaCategoria);

        const celdaStock = document.createElement('td');
        celdaStock.textContent = item.stock;
        if (item.stock <= 5) { // Lógica para stock crítico
            celdaStock.classList.add('low-stock');
            celdaStock.innerHTML = `${item.stock} <span class="alert-pill">🚨 ¡Bajo!</span>`;
        }
        fila.appendChild(celdaStock);

        const celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = `$${item.precio.toFixed(2)}`; 
        fila.appendChild(celdaPrecio);
        tablaBody.appendChild(fila); 

        
    });
    },
    agregarStock(nombre, categoria="General", stock, precio){
        if(!nombre || nombre.trim() === ""){
            addErrorMessage.textContent = "El nombre no fue reconocido.";
            addErrorMessage.classList.add('visible')
            return false
        }
        if(!categoria || categoria.trim() === ""){
            addErrorMessage.textContent = "La categoria se asignara a GENERAL.";
            addErrorMessage.classList.add('visible')
            return false
        }
        if (isNaN(stock) || stock < 0){
            addErrorMessage.textContent = "El stock debe ser positivo, Salame.";
            addErrorMessage.classList.add('visible')
            return false
        }
        if(isNaN(precio) || precio < 0){
            addErrorMessage.textContent = "El precio debe ser mayor a 0, querido usuario.";
            addErrorMessage.classList.add('visible')
            return false
        }
    let newId= this.productos.length += 1
    const newitem= {
        id: newId,
        nombre: nombre.trim(),
        categoria: categoria.trim(),
        stock: parseInt(stock),
        precio: parseInt(precio)
    }
    this.productos.push(newitem)
    alert(`¡"${newitem.nombre}" fue registrado!`)
    this.mostrarInventario()
    return true
    }
}
/* BOTONES PARA: CHUSMEAR, SACRIFICAR Y AÑADIR */
searchItems.addEventListener('input', (e) => {
    inventario.mostrarItem(e.target.value);
});
showItems.addEventListener('click', () =>{
    inventario.mostrarInventario()
})
deleteItems.addEventListener('click', () => {
    deleteModal.classList.add('visible');
    selectItem.innerHTML = inventario.productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');
    quantityInput.value = '';
    quantityError.classList.remove('visible');
});
addItemsBtn.addEventListener('click', () =>{
    addModal.classList.add('visible')
    newItemNameInput.value= ''
    newItemCategoryInput.value= ''
    newItemStockInput.value= ''
    newItemPriceInput.value= ''
    addErrorMessage.classList.remove('visible')
} )

/* BOTONES DE LOS MODALES: SACRIFICAR Y AÑADIR */
cancelDiscountBtn.addEventListener('click', () => {
    deleteModal.classList.remove('visible');
    quantityError.classList.remove('visible');
});
confirmDiscountBtn.addEventListener('click', () => {
    const selectedProductId = parseInt(selectItem.value);
    const quantityToDiscount = parseInt(quantityInput.value);
    const succes = inventario.descontarStock(selectedProductId, quantityToDiscount)
    if(succes){
        deleteModal.classList.remove('visible');
        quantityError.classList.remove('visible');
    }

})
cancelAddBtn.addEventListener('click', () =>{
    addModal.classList.remove('visible')
    addErrorMessage.classList.remove('visible')
})
confirmAddBtn.addEventListener('click', ()=>{
    const nombre = newItemNameInput.value
    const categoria = newItemCategoryInput.value
    const stock = newItemStockInput.value
    const precio = newItemPriceInput.value

    const succes = inventario.agregarStock(nombre, categoria, stock, precio)
    if(succes){
        addModal.classList.remove('visible');
        addErrorMessage.classList.remove('visible');
    }
})


/* FUNCION PARA CAMBIAR EL PLACEHOLDER DEL BUSCADOR */
const placeholders = [
    "Pregúnta, no muerdo",
    "Buscando al nemo",
    "Que buscas maestro?",
    "¿Se te perdio un dolar?",
    "¿Que juega el finde?",
];
let placeholderIndex = 0;
let intervalId = setInterval(() => {
    searchItems.placeholder = placeholders[placeholderIndex];
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
}, 5000); 

//  Limpiar el intervalo cuando el input esté en foco para no distraer
searchItems.addEventListener('focus', () => {
    clearInterval(intervalId);
    searchItems.placeholder = placeholders[placeholderIndex];
});
searchItems.addEventListener('blur', () => {
    intervalId = setInterval(() => {
        searchItems.placeholder = placeholders[placeholderIndex];
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    }, 3000);
});
=======
// Referencias a elementos del DOM
// 

// const tableContainer = document.getElementById('product-table-container');

// const tableBody = document.querySelector('#product-list-table tbody');



// // Referencias para el toggle de tema
// const themeToggle = document.getElementById('theme-toggle');
// const moonIcon = document.getElementById('moon-icon');
// const sunIcon = document.getElementById('sun-icon');
// const body = document.body;
// const themeSlider = document.querySelector('.theme-toggle .slider');
/* Para el modal de "SACRIFICIO" */
const tablaBody = document.getElementById('tableBody');
const deleteItems = document.getElementById('delete-item-btn');
const deleteModal = document.getElementById('delete-modal-card');
const selectItem = document.getElementById('select-item');
const quantityInput = document.getElementById('quantity-input');
const quantityError = document.getElementById('quantity-error');
const confirmDiscountBtn = document.getElementById('confirm-discount-btn');
const cancelDiscountBtn = document.getElementById('cancel-discount-btn');
const searchItems = document.getElementById('search-items');
/* Para el modal de "NUEVOS" */
const addItemsBtn = document.getElementById('add-item-btn');
const addModal = document.getElementById('add-modal-card'); 
const newItemNameInput = document.getElementById('new-item-name');
const newItemPriceInput = document.getElementById('new-item-price');
const newItemStockInput = document.getElementById('new-item-stock');
const newItemCategoryInput = document.getElementById('new-item-category');
const addErrorMessage = document.getElementById('add-error-message');
const confirmAddBtn = document.getElementById('confirm-add-btn');
const cancelAddBtn = document.getElementById('cancel-add-btn');
/* Base de Inventario */
const inventario={ 
    productos: [
    {id:1 , nombre: "Yerba Mate",categoria: "Infucion" , stock: 44, precio: 1900},
    {id:2 , nombre: "Salsa de tomate Marolio",categoria: "Cocina" , stock: 151, precio: 2500},
    {id:3 , nombre: "Jabon Head&Shouldes",categoria: "Higiene" , stock: 0, precio: 1500},
    {id:4 , nombre: "Azucar la Pampa",categoria: "Infucion" , stock: 303, precio: 1000},
    {id:5 , nombre: "Cafe Nestter",categoria: "Infucion" , stock: 0, precio: 3000 }
    ],

    descontarStock(idProducto, cantidad = 0) { 
    let productoEncontrado = this.productos.find(p => p.id === idProducto); 
    if (!productoEncontrado) { 
        alert(`Error: El producto con ID ${idProducto} no fue encontrado.`);
        return false;
    }
    if (isNaN(cantidad) || cantidad <= 0) { 
        quantityError.textContent = `¡Pone un numero valido, animalito de dios!. Debe ser mayor a 0.`;
        quantityError.classList.add('visible');
        quantityInput.style.animation = 'shake 0.3s';
        setTimeout(() => quantityInput.style.animation = '', 300);
        return false;
    }
    if (productoEncontrado.stock < cantidad) {
        quantityError.textContent = `¡No tenés tanto raton! Stock actual: ${productoEncontrado.stock}. Cantidad solicitada: ${cantidad}.`;
        quantityError.classList.add('visible');
        quantityInput.style.animation = 'shake 0.3s';
        setTimeout(() => quantityInput.style.animation = '', 300);
        return false;
    }
    productoEncontrado.stock -= cantidad; 
    alert(`¡${cantidad} unidades de "${productoEncontrado.nombre}" fueron sacrificadas!`)
    this.mostrarInventario()
    return true;
    },
    mostrarItem(e){
    const itemFilter= this.productos.filter(item=>{
        if(e.trim() === ''){
            return true
        }
        const categoriaMinus= item.categoria.toLowerCase() 
        const nombreMinus= item.nombre.toLocaleLowerCase()
        const terminoMinus= e.toLowerCase()
        return categoriaMinus.includes(terminoMinus) || nombreMinus.includes(terminoMinus)
    })
    itemFilter.forEach(item => {
        const fila = document.createElement('tr'); 

        const celdaId = document.createElement('td');
        celdaId.textContent = item.id;
        fila.appendChild(celdaId); 

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = item.nombre;
        fila.appendChild(celdaNombre);

        const celdaCategoria = document.createElement('td');
        celdaCategoria.textContent = item.categoria || 'N/A'; 
        fila.appendChild(celdaCategoria);

        const celdaStock = document.createElement('td');
        celdaStock.textContent = item.stock;
        fila.appendChild(celdaStock);

        const celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = `$${item.precio.toFixed(2)}`; 
        fila.appendChild(celdaPrecio);
        tablaBody.appendChild(fila); 
    });
    },

    mostrarInventario() {
    tablaBody.innerHTML = ''; 

    this.productos.forEach(item => {
        const fila = document.createElement('tr'); 

        const celdaId = document.createElement('td');
        celdaId.textContent = item.id;
        fila.appendChild(celdaId); 

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = item.nombre;
        fila.appendChild(celdaNombre);

        const celdaCategoria = document.createElement('td');
        celdaCategoria.textContent = item.categoria || 'N/A'; 
        fila.appendChild(celdaCategoria);

        const celdaStock = document.createElement('td');
        celdaStock.textContent = item.stock;
        fila.appendChild(celdaStock);

        const celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = `$${item.precio.toFixed(2)}`; 
        fila.appendChild(celdaPrecio);
        tablaBody.appendChild(fila); 
    });
    },
    agregarStock(nombre, categoria="General", stock, precio){
        if(!nombre || nombre.trim() === ""){
            addErrorMessage.textContent = "El nombre no fue reconocido.";
            addErrorMessage.classList.add('visible')
            return false
        }
        if(!categoria || categoria.trim() === ""){
            addErrorMessage.textContent = "La categoria se asignara a GENERAL.";
            addErrorMessage.classList.add('visible')
            return false
        }
        if (isNaN(stock) || stock < 0){
            addErrorMessage.textContent = "El stock debe ser positivo, Salame.";
            addErrorMessage.classList.add('visible')
            return false
        }
        if(isNaN(precio) || precio < 0){
            addErrorMessage.textContent = "El precio debe ser mayor a 0, querido usuario.";
            addErrorMessage.classList.add('visible')
            return false
        }
    let newId= this.productos.length += 1
    const newitem= {
        id: newId,
        nombre: nombre.trim(),
        categoria: categoria.trim(),
        stock: parseInt(stock),
        precio: parseInt(precio)
    }
    this.productos.push(newitem)
    alert(`¡"${newitem.nombre}" fue registrado!`)
    this.mostrarInventario()
    return true
    }
}

searchItems.addEventListener('input', (e) => {
    inventario.mostrarItem(e.target.value);
});

const showItems = document.getElementById('show-items-btn');
showItems.addEventListener('click', () =>{
    inventario.mostrarInventario()
})


deleteItems.addEventListener('click', () => {
    deleteModal.classList.add('visible');
    selectItem.innerHTML = inventario.productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');
    quantityInput.value = '';
    quantityError.classList.remove('visible');
});

cancelDiscountBtn.addEventListener('click', () => {
    deleteModal.classList.remove('visible');
    quantityError.classList.remove('visible');
});

confirmDiscountBtn.addEventListener('click', () => {
    const selectedProductId = parseInt(selectItem.value);
    const quantityToDiscount = parseInt(quantityInput.value);
    const succes = inventario.descontarStock(selectedProductId, quantityToDiscount)
    if(succes){
        deleteModal.classList.remove('visible');
        quantityError.classList.remove('visible');
    }

})

addItemsBtn.addEventListener('click', () =>{
    addModal.classList.add('visible')
    newItemNameInput.value= ''
    newItemCategoryInput.value= ''
    newItemStockInput.value= ''
    newItemPriceInput.value= ''
    addErrorMessage.classList.remove('visible')
} )

cancelAddBtn.addEventListener('click', () =>{
    addModal.classList.remove('visible')
    addErrorMessage.classList.remove('visible')
})

confirmAddBtn.addEventListener('click', ()=>{
    const nombre = newItemNameInput.value
    const categoria = newItemCategoryInput.value
    const stock = newItemStockInput.value
    const precio = newItemPriceInput.value

    const succes = inventario.agregarStock(nombre, categoria, stock, precio)
    if(succes){
        addModal.classList.remove('visible');
        addErrorMessage.classList.remove('visible');
    }
})

const placeholders = [
    "Pregúnta, no muerdo",
    "Buscando al nemo",
    "Que buscas maestro?",
    "¿Se te perdio un dolar?",
    "¿Que juega el finde?",
];
let placeholderIndex = 0;
let intervalId = setInterval(() => {
    searchItems.placeholder = placeholders[placeholderIndex];
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
}, 5000); 



















// // Función para renderizar la tabla de productos
// const renderProducts = (filter = '') => {
//     tableBody.innerHTML = '';
//     const filteredProducts = products.filter(product =>
//         product.name.toLowerCase().includes(filter.toLowerCase()) ||
//         product.category.toLowerCase().includes(filter.toLowerCase())
//     );

//     filteredProducts.forEach(product => {
//         const row = document.createElement('tr');
//         row.setAttribute('data-product-id', product.id);
        
//         let stockContent = product.stock;
//         if (product.stock <= 5) { // Lógica para stock crítico
//             row.classList.add('low-stock');
//             stockContent = `${product.stock} <span class="stock-pill">🚨 ¡Bajo!</span>`;
//         }

//         row.innerHTML = `
//             <td>${product.name}</td>
//             <td>${product.category}</td>
//             <td>${stockContent}</td>
//             <td>${product.price.toLocaleString('es-AR')}</td>
//         `;
//         tableBody.appendChild(row);
//     });
// };

// // Función para cambiar el tema
// const toggleTheme = () => {
//     body.classList.toggle('light-mode');
//     themeToggle.classList.toggle('light'); // Para controlar el slider

//     if (body.classList.contains('light-mode')) {
//         localStorage.setItem('theme', 'light');
//         themeToggle.classList.remove('dark');
//         themeToggle.classList.add('light');
//     } else {
//         localStorage.setItem('theme', 'dark');
//         themeToggle.classList.remove('light');
//         themeToggle.classList.add('dark');
//     }
//     // Actualizar variables RGB para Glassmorphism si es necesario
//     updateRgbVariables();
// };

// const updateRgbVariables = () => {
//     const bgPrimaryRgb = getCssVariableRgb(body, '::before');
//     const bgSecondaryRgb = getCssVariableRgb(document.querySelector('.dashboard-card'), '::before');
//     const accentColorRgb = getCssVariableRgb(document.querySelector('.action-button'), '::before');
//     const shadowColorRgb = getCssVariableRgb(document.querySelector('.modal-content'), '::before');
//     const textPrimaryRgb = getCssVariableRgb(document.querySelector('.low-stock'), '::before');
//     document.documentElement.style.setProperty('--bg-primary-rgb', bgPrimaryRgb);
//     document.documentElement.style.setProperty('--bg-secondary-rgb', bgSecondaryRgb);
//     document.documentElement.style.setProperty('--accent-color-rgb', accentColorRgb);
//     document.documentElement.style.setProperty('--shadow-color-rgb', shadowColorRgb);
//     document.documentElement.style.setProperty('--text-primary-rgb', textPrimaryRgb);
// };


// // Cargar tema al inicio (si hay preferencia guardada)
// const savedTheme = localStorage.getItem('theme');
// if (savedTheme === 'light') {
//     body.classList.add('light-mode');
//     themeToggle.classList.add('light');
// } else {
//     // Predeterminado: modo oscuro
//     body.classList.remove('light-mode');
//     themeToggle.classList.add('dark');
// }
// updateRgbVariables(); // Inicializar las variables RGB

// // Event Listeners
// themeToggle.addEventListener('click', toggleTheme);

// showItems.addEventListener('click', () => {
//     tableContainer.classList.toggle('visible');
//     renderProducts();
// });

// searchItems.addEventListener('input', (e) => {
//     renderProducts(e.target.value);
// });



//     const updatedRow = document.querySelector(`tr[data-product-id="${selectedProductId}"]`);
//     if (updatedRow) {
//         const stockCell = updatedRow.children[2];
//         const originalBg = getComputedStyle(stockCell).backgroundColor;
//         const originalTransform = getComputedStyle(stockCell).transform;

//         stockCell.style.transition = 'none'; // Desactivar transición temporalmente
//         stockCell.style.backgroundColor = 'var(--success-color)'; // Usar variable
//         stockCell.style.transform = 'scale(1.1)'; // Pequeño rebote

//         setTimeout(() => {
//             // Restaurar transiciones y estilos originales
//             stockCell.style.transition = 'background-color 0.3s ease, transform 0.2s ease';
//             stockCell.style.backgroundColor = originalBg; // Restaurar color original
//             stockCell.style.transform = originalTransform; // Restaurar transformación original

//             if (productToUpdate.stock <= 5) {
//                 updatedRow.classList.add('low-stock'); // Aplicar clase de stock crítico si aplica
//             } else {
//                 updatedRow.classList.remove('low-stock');
//             }
//         }, 300);
//     }

//     deleteModal.classList.remove('visible');
//     alert(`¡${quantityToDiscount} unidades de "${productToUpdate.name}" fueron sacrificadas!`);
// });

// // Placeholder animado para el input de búsqueda
// const placeholders = [
//     "Pregúnta, no muerdo...",
//     "Buscando al nemo...",
//     "Que buscas maestro?...",
//     "¿Se te perdio un dolar?"
// ];
// let placeholderIndex = 0;
// let intervalId = setInterval(() => {
//     searchItems.placeholder = placeholders[placeholderIndex];
//     placeholderIndex = (placeholderIndex + 1) % placeholders.length;
// }, 3000); // Cambia cada 3 segundos

// // Limpiar el intervalo cuando el input esté en foco para no distraer
// searchItems.addEventListener('focus', () => {
//     clearInterval(intervalId);
//     searchItems.placeholder = placeholders[placeholderIndex]; // Mantener el último placeholder
// });
// searchItems.addEventListener('blur', () => {
//     intervalId = setInterval(() => {
//         searchItems.placeholder = placeholders[placeholderIndex];
//         placeholderIndex = (placeholderIndex + 1) % placeholders.length;
//     }, 3000);
// });
>>>>>>> b8403d0eb8085ffb38a78fe57ec85fc608081bcc
