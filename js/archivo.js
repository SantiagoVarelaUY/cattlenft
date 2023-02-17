let resultado = 8;
let meses = 10;
function sumar (numerouno, numerodos) {
    return numerouno * numerodos
}
let socio = prompt ("¿Ya sos socio? S/N");
while (socio !="S"){
    let cuota = prompt ("Eliga una suscripcion. Anual (A), mensual (M).");
    if (cuota=="M") {
        alert ("El precio de la suscripcion mensual son 8 USD por mes");
        resultado = 8;
        socio = "S";
        alert ("Debera abonar: " + resultado);
    }
    else {
        alert ("Eligio la suscrpicon anual, se le aplica una promocion de 2 meses de regalo.");
        resultado = sumar (resultado,meses);
        socio = "S";
        alert ("Debera abonar: " + resultado);
    }
}
alert ("¡GRACIAS POR ELEGIRNOS!")

//CARRITO DE COMPRAS -- REMERAS
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')


const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => { fetchData()
	if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    } 
})

cards.addEventListener('click', e => addCarrito(e))

//items.addEventListener('click', e => accionBotones())


const fetchData = async () => {
    const res = await fetch('api.json')
    const data = await res.json()
    pintarCards(data)
}

const pintarCards = arraysProd => {
	
	for (const key in arraysProd) {
	    const element = arraysProd[key];
	    
	    templateCard.querySelector('h5').textContent = element.nombre
	    templateCard.querySelector('p').textContent = element.precio
	    templateCard.querySelector('img').setAttribute("src", element.img)
	    templateCard.querySelector('.btn-dark').dataset.id = key

	    const clone = templateCard.cloneNode(true)
	    fragment.appendChild(clone)
	}	
	cards.appendChild(fragment)
}

const addCarrito = e => {
	if(e.target.classList.contains('btn-dark')) {
		setCarrito(e.target.parentElement)
	}
	e.stopPropagation()
}

const setCarrito = objeto => {
	const producto = {
		id: objeto.querySelector('.btn-dark').dataset.id,
		nombre: objeto.querySelector('h5').textContent, 
		precio: objeto.querySelector('p').textContent,
		cantidad: 1
	}

	if(carrito.hasOwnProperty(producto.id)) {
		producto.cantidad = carrito[producto.id].cantidad + 1
	}

	carrito[producto.id] = {...producto}

	pintarCarrito()
}

const pintarCarrito = () => {
	items.innerHTML =''
	Object.values(carrito).forEach(producto => {
		templateCarrito.querySelector('th').textContent = producto.id
		templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
		templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
		templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

		templateCarrito.querySelector('.btn-info').dataset.id = producto.id
		templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
		
		const clone = templateCarrito.cloneNode(true)
		fragment.appendChild(clone)
	})
	items.appendChild(fragment)

	pintarFooter()
	accionBotones()

	localStorage.setItem('carrito', JSON.stringify(carrito))
}

const VaciarStorage = () => {
	localStorage.clear()
}

const pintarFooter = () => {
	footer.innerHTML= ''
	if(Object.keys(carrito).length === 0) {
		footer.innerHTML = `
		<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
	`
		return 
	}

	const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
	const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio}) => acc + cantidad * precio,0)

	templateFooter.querySelector('td').textContent = nCantidad
	templateFooter.querySelector('span').textContent = nPrecio

	const clone = templateFooter.cloneNode(true)
	fragment.appendChild(clone)
	footer.appendChild(fragment)

	const btnVaciarCarrito = document.getElementById('vaciar-carrito')
	btnVaciarCarrito.addEventListener('click', () => {
		carrito = {}
		pintarCarrito()
	})

	const btnFinalizarCarrito = document.getElementById('finalizar-compra')
	btnFinalizarCarrito.addEventListener('click', () => {
		swal({
			title: "Genial, tu carrito se actualizo!",
			text: "Seras redirigido para finalizar tu compra",
			icon: "success",
			buttons: true,
			dangerMode: true,
		})
		  .then((willDelete) => {
			if (willDelete) {
				window.location.href = "carrito.html"
			}
		});		
	})
}



const accionBotones = () => {
	const botonesAgregar = document.querySelectorAll('#items .btn-info')
	const botonesEliminar = document.querySelectorAll('#items .btn-danger')

	botonesAgregar.forEach(btn => {
		btn.addEventListener('click', () => {
			const producto = carrito[btn.dataset.id]
			 producto.cantidad++
			 carrito[btn.dataset.id] = { ...producto }
			 pintarCarrito()
		})
	})

	botonesEliminar.forEach(btn => {
		btn.addEventListener('click', () => {
			const producto = carrito[btn.dataset.id]
			producto.cantidad--
			
			(producto.cantidad === 0) ? delete carrito[btn.dataset.id] : carrito[btn.dataset.id] = { ...producto}

			pintarCarrito()
		})
	})
	
}