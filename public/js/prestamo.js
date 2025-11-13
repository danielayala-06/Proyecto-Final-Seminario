//ACTUALIZAR PRESTAMO
// Vista previa de imagen
  const letraCambioInput = document.getElementById('letraCambio');
  const imagePreview = document.getElementById('imagePreview');
  const removeImageBtn = document.getElementById('removeImage');
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');

  letraCambioInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe exceder 5MB');
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        imagePreview.src = e.target.result;
        removeImageBtn.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  // Eliminar imagen
  removeImageBtn.addEventListener('click', function() {
    letraCambioInput.value = '';
    imagePreview.src = 'https://via.placeholder.com/300x150?text=Letra+de+Cambio';
    removeImageBtn.style.display = 'none';
  });

  // Enviar formulario (ejemplo)
  document.getElementById('formActualizarPrestamo').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí puedes recolectar los datos con FormData
    const formData = new FormData(this);
    
    console.log('Datos del préstamo actualizado:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    alert('Préstamo actualizado correctamente');
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalActualizarPrestamo'));
    modal.hide();
  });