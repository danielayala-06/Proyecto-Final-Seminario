const comprobante = document.getElementById('comprobante');
const vistaPrevia = document.getElementById('vistaPrevia');
const imgPrevia = document.getElementById('imgPrevia');
const nombreArchivo = document.getElementById('nombreArchivo');

//Mostrar la vista Previa de la imagen
comprobante.addEventListener('change', function(e){
    const archivo = e.target.files[0];

    if(archivo){
      if(archivo.type.startsWith('image/')){
        const reader = new FileReader();

        reader.onload = function(e){
            imgPrevia.src = e.target.result;
            nombreArchivo.textContent = archivo.name;
            vistaPrevia.style.display = 'block';
        }


        reader.readAsDataURL(archivo);
      } else {
        alert('Por favor, seleccione un archivo de imagen válido.');
        comprobante.value = '';
      }
    }
});
