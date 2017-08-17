const containerElement = document.getElementById('container');
const buttonElements = document.getElementsByTagName('button');

const slider = {
  imgHand: [ 'img/img0.jpg', 'img/img1.jpg' ], // active and inactive images
  imgDeck: [ 'img/img2.jpg', 'img/img3.jpg', 'img/img4.jpg', 'img/img5.jpg'],

  initialize: function() {
    containerElement.firstChild.setAttribute('src', slider.imgHand[0]); // place first image
    containerElement.childNodes[1].setAttribute('src', slider.imgHand[1]);
    containerElement.childNodes[1].style.opacity = 0;
    setTimeout( function() {
      slider.fadeIn();
      slider.fadeOut();
      slider.play();
    }, 5000);
  },

  play: function() {
    console.log(`HAND: ${this.imgHand} --- DECK: ${this.imgDeck}`);

    interval = setInterval( function() { // begins movement
      slider.showNext();
    }, 5000);

    buttonElements[0].onclick = () => {
      slider.showPrev();
    }

    buttonElements[1].onclick = () => {
      slider.showNext();
    }

    containerElement.addEventListener('mouseover', () => { // pauses
      this.pause();
    });
    containerElement.addEventListener('mouseout', () => { // replays
      this.play();
    });
  },

  pause: function() {
    clearInterval(interval);
  },

  fadeIn: function() {
    let img = containerElement.childNodes[1];
    if (img.style.opacity < 1) {
      setTimeout( function() {
        img.style.opacity = img.style.opacity * 1 + .01;
        slider.fadeIn();
      }, 30);
    }
  },

  fadeOut: function() {
    let img = containerElement.firstChild;
    if (img.style.opacity > 0) {
      setTimeout( function() {
        img.style.opacity = img.style.opacity * 1 - .01;
        slider.fadeOut();
      }, 30);
    }
  },

  showPrev: function() {
    this.imgHand.push( this.imgDeck[this.imgDeck.length - 1]);
    this.imgDeck.pop();

    this.imgDeck.unshift( this.imgHand[0] );
    this.imgHand.shift();
    console.log(`HAND: ${this.imgHand} --- DECK: ${this.imgDeck}`);

    let prevElement = document.createElement('img');
    prevElement.setAttribute('src', slider.imgHand[0]);
    prevElement.style.opacity = 0;
    containerElement.appendChild(prevElement);

    // this.pause();
    // setTimeout( function() { slider.play(); }, 10000);
  },

  showNext: function() {
    this.imgHand.push( this.imgDeck[0] );
    this.imgDeck.shift();
    containerElement.removeChild(containerElement.firstChild);

    this.imgDeck.push( this.imgHand[0] );
    this.imgHand.shift();

    let nextElement = document.createElement('img');
    nextElement.setAttribute('src', slider.imgHand[0]);
    nextElement.style.opacity = 0;
    containerElement.appendChild(nextElement);

    this.fadeOut();
    this.fadeIn();

    console.log(`HAND: ${this.imgHand} --- DECK: ${this.imgDeck}`);
  }
}

slider.initialize();
