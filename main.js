const timer = document.getElementById("timer");
const mst = document.getElementById("mst");
const btn_pause = document.getElementById("pause");
let lasttime = 0;
let started = false;
let paused = false;

class Timer {

  constructor() {
    this.ms = 0;
    this.ss = 0;
    this.mm = 0;
    this.hour = 0;
  }
  update(deltatime) {
    
    if (this.ms >= 1000) {
      this.ms = 0;
      this.ss++;
    } else this.ms += deltatime ;

    if (this.ss >= 60) {
      this.ss = 0;
      this.ms = 0;
      this.mm++;
    }

    if (this.mm >= 60) {
      this.mm = 0;
      this.ss = 0;
      this.hour++;
    }    
    timer.innerHTML = formar2digit(this.hour) + ":" + formar2digit(this.mm) + ":" + formar2digit(this.ss);
    mst.innerHTML = (this.ms/10).toFixed();
  }

  clear() {
    this.ms = 0;
    this.ss = 0;
    this.mm = 0;
    this.hour = 0;
    started = false;
    paused = false;
    timer.innerHTML = formar2digit(this.hour) + ":" + formar2digit(this.mm) + ":" + formar2digit(this.ss);
    mst.innerHTML = this.ms.toFixed()/10
  }
}

function pause() {
  if(started && !paused) {
    paused = true;
    cancelAnimationFrame(animationId);
    btn_pause.innerHTML = "Resume";
  } else if (started && paused) {
    paused = false;
    btn_pause.innerHTML = "Pause";
    startRunner(0);
  }
}

const t = new Timer();

function clearTimer() {
  if(started) {
    t.clear();
    cancelAnimationFrame(animationId);
    btn_pause.innerHTML = "Pause"; 
  }
}

function startRunner(timestamp) {
  const deltatime = timestamp - lasttime;
  t.update(deltatime);
  lasttime = timestamp;
  animationId = requestAnimationFrame(startRunner);
}

function startTimer() {
  if (started === false) {
    started = true;
    startRunner(0)
  }
}

function formar2digit(num, digit = 2) {
  var nums = num + ""
  let zeros = ""
  for(let i = nums.length; i < digit; i++) {
    zeros+="0"
  }
  return zeros+num
}
