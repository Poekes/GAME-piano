class Game {
  constructor() {
    this.stop = false; // game berjalan atau tidak (true/false)
    this.waktu = 0; // waktu loop
    this.kecepatan = 5; // kecepatan gerak blok
    this.boxGameHeight = document.getElementById("box-game").clientHeight;
    this.blok = {
      // blok on play ground
      box: [],
      count: 0, // items blok
    };

    //?? starting game loop (init)
    this.start_game = () => {
      this._time();
      this.loop();
      if (this.stop) {
        return "game stoped";
      }
      requestAnimationFrame(this.start_game);
    };
  }

  //!! function inti
  loop() {
    this.spawnBlok();
    document.querySelector("h1 small").textContent =
      this.waktu + " | " + this.blok.count;

    if (this.waktu % 500 == 0) {
      this.kecepatan += 0.5;
    }
  }
  //!! function inti

  //**  Setup game start \\
  start() {
    this.stop = false;
    this.start_game();
  }
  _time() {
    this.waktu++;
  }
  cleartime() {
    this.waktu = 0;
  }
  gameStop() {
    this.stop = true; // reset
  }
  //!! Setup game end \\

  //** FITURE PIANO TURUN  \\
  level() {} // nantian gapapa
  spawnBlok() {
    const spBlok = 40 - Math.floor(this.kecepatan);
    if (this.waktu % spBlok == 0) {
      const r_baris = Math.floor(Math.random() * 4) + 1;
      const payload_blok = {
        id: "#", // id
        y: -180, // posisi atas
        h: 150, // ukuran panjang
        batas: false, // jika sudah mencapai batas bawah maka true
        stateClick: false, // state ketika sudah di click
      };
      this.blok.count++;
      payload_blok.id = this.blok.count;
      this.blok.box.push(payload_blok);

      // create dom
      document
        .getElementById(`baris_${r_baris}`)
        .appendChild(this.createDomBlok(payload_blok));
    }

    this.runBlok();
  }
  runBlok() {
    this.blok.box.forEach((value, index) => {
      const blok = document.getElementById(value.id);

      if (this.blok.box[index].batas != true && blok != null) {
        this.blok.box[index].y += this.kecepatan;

        blok.style.top = this.blok.box[index].y + "px"; // b
      }
      if (
        this.blok.box[index].batas != true &&
        parseInt(blok.style.top) >= this.boxGameHeight + 1
      ) {
        // cek apakah blok sudah keluar batas bawah dan ga keliatan
        this.blok.box[index].batas = true;
        // blok.remove();
      } else {
      }
    });

    //hapus blok sudah batas nya
    if (this.waktu % 150 == 0) {
      const blok = document.querySelectorAll(".pin");
      blok.forEach((v, i) => {
        if (parseInt(blok[i].style.top) >= this.boxGameHeight + 1) {
          v.remove();
        }
      });
    }
  }

  createDomBlok(payload) {
    const div = document.createElement("div");
    div.className = "pin";
    div.id = payload.id;
    div.style.top = payload.y + "px";
    div.style.height = payload.h + "px";

    return div;
  }
  //!! FITURE PIANO TURUN  \\

  // * FITURE TIMER \\
  calculation_timer() {
    const time = this.waktu;
    if (time % 50) {
    }
  }
  parse_timer() {}
  // ! FITURE TIMER \\
}

const game = new Game();

// game.start();
