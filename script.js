let container = document.querySelector(".container");
let snowflake = document.querySelector(".snowflake");
for (let i = 0; i < 300; i++) {
	let clone = snowflake.cloneNode(true);
	if (i < 300) clone.innerHTML = "&#10052";
	if (i < 200) clone.innerHTML = "&#10053";
	if (i < 100) clone.innerHTML = "&#10054";
	container.appendChild(clone);
}
const imagenes = document.querySelectorAll('.img-galeria');
const imagenesLight = document.querySelector('.agregar-imagen');
const contenedorLight = document.querySelector('.imagen-light');

imagenes.forEach(imagen =>{
    imagen.addEventListener('click', ()=>{
        aparecerImagen(imagen.getAttribute('src'))
    
    })
})

contenedorLight.addEventListener('click', (e) =>{
    if(e.target !== imagenesLight){
        contenedorLight.classList.remove('show');
        imagenesLight.classList.remove('showImage'); 
    }
})

const aparecerImagen = (imagen) =>{
    imagenesLight.src = imagen;
    contenedorLight.classList.add('show');
    imagenesLight.classList.add('showImage');
}