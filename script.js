function fadeOutAndFadeIn(elToFadeOut, elToFadeIn) {
    var opacity = 1; // Opacidad inicial
    var interval = setInterval(function() {
      if (opacity > 0) {
        opacity -= 0.1;
        elToFadeOut.style.opacity = opacity;
      } else {
        clearInterval(interval); // Detiene el intervalo cuando la opacidad llega a 0
        elToFadeOut.style.display = 'none'; // Oculta el elemento después de la transición
        fadeIn(elToFadeIn);
      }
    }, 50);
  }
  
  function fadeIn(el) {
    el.style.opacity = 0; // Configura la opacidad inicial a 0
    el.style.display = 'block'; // Asegura que el elemento esté visible antes de la transición
    var opacity = 0; // Opacidad inicial
    var interval = setInterval(function() {
      if (opacity < 1) {
        opacity += 0.1;
        if (opacity >= 1) {
          opacity = 1; // Asegura que la opacidad no supere 1
          clearInterval(interval); // Detiene el intervalo cuando la opacidad alcanza 1
        }
        el.style.opacity = opacity;
      } else {
        clearInterval(interval); // Detiene el intervalo si la opacidad ya es 1
      }
    }, 50);
  }
  
  let btn = document.getElementById('pomodoro-btn');
  let container2 = document.getElementById('container2');
  let crono = document.getElementById('crono');
  
  let minutes = 25; // Cambia el tiempo predeterminado a 25 minutos
  let seconds = 0;
  let time = formatTime(minutes, seconds); // Formatea el tiempo al iniciar
  
  let intervalID; // Variable para almacenar el ID del intervalo
  
  function formatTime(minutes, seconds) {
    // Añade un cero inicial si los minutos o segundos son menores que 10
    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  function startTimer() {
    intervalID = setInterval(function() {
      if (minutes == 0 && seconds == 0) {
        clearInterval(intervalID); // Detiene el intervalo cuando el tiempo llega a 0
        crono.innerHTML = "&nbsp;Timer has finished! Wait 5 minutes and it will restart automatically&nbsp;";
        setTimeout(startAgain, 300000); // Espera 5 minutos (300000 milisegundos) antes de iniciar de nuevo
        return;
      }
      
      if (seconds == 0) {
        seconds = 59;
        minutes--;
      } else {
        seconds--;
      }
  
      crono.innerHTML = formatTime(minutes, seconds); // Actualiza el tiempo en el cronómetro
    }, 1000);
  }
  
  function startAgain() {
    minutes = 25; // Reinicia el tiempo predeterminado a 25 minutos
    seconds = 0;
    crono.innerHTML = formatTime(minutes, seconds); // Reinicia el cronómetro con el tiempo inicial
    startTimer();
  }
  
  btn.addEventListener('click', () => {
    fadeOutAndFadeIn(btn, container2);
    crono.innerHTML = formatTime(minutes, seconds); // Muestra el tiempo inicial en el cronómetro
    startTimer();
  });
  