(function () {
'use strict';

/**
 * Created by steve on 23/09/2016.
 */

const mapStore$1 = new WeakMap();

class Device {
  constructor(objDescription) {
    mapStore$1.set(this, objDescription);
  }

  get id() {
    return mapStore$1.get(this).id;
  }

  get name() {
    return mapStore$1.get(this).name;
  }

  get type() {
    return mapStore$1.get(this).type;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type
    };
  }
}

/**
 * Created by steve on 23/09/2016.
 */
const mapStore = new WeakMap();

class Room {
  constructor(objDescription) {
    mapStore.set(this, objDescription);
  }

  get id() {
    return mapStore.get(this).id;
  }

  get name() {
    return mapStore.get(this).name;
  }

  get devices() {
    return mapStore.get(this).devices.map(device => new Device(device));
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      devices: this.devices
    };
  }
}

/**
 * Created by steve on 23/09/2016.
 */
const baseUrl = 'http://192.168.1.109:7890';

class DeviceManager {

  constructor() {
    const searchParams = new URLSearchParams(location.search);

    const room = searchParams.get('room');
    const device = searchParams.get('device');
    const command = searchParams.get('command');
    const dimLevel = searchParams.get('dimLevel');

    if (!!room && !!device && !!command) {
      this.execCommand(command, room, device, dimLevel);
    }
  }

  execCommand(command, room, device, dimLevel) {
    navigator.sendBeacon(`${baseUrl}/command`, JSON.stringify({
      command: command,
      room: room,
      device: device,
      dimLevel: dimLevel
    }));
  }

  fetch() {
    const options = {
      mode: 'cors'
    };

    if (this.rooms) {
      return Promise.resolve(this.rooms);
    }

    return window.fetch(`${baseUrl}/devices`, options)
      .then(res => res.json())
      .then((jsonRooms) => {
        this.rooms = jsonRooms.map(room => new Room(room));
        return this.rooms;
      });
  }
}

/**
 * Created by steve on 22/09/2016.
 */
// import BiggerImage from '../components/BiggerImage';
const deviceManager = new DeviceManager();

deviceManager.fetch()
  .then(devices => document.querySelector('#temp').textContent = JSON.stringify(devices, null, 4)) // eslint-disable-line
  .catch(ex => console.error(ex));

/* eslint-disable */

/**********************  TODO - Some UI  *************************/



/*if (!window.customElements) {
 alert('Upgrade your browser to view this page');
 throw new Error('Upgrade your browser to view this page');
 }*/


/*
customElements.define('bigger-img', BiggerImage, {extends: 'img'});


const image = new BiggerImage(15, 20); // pass ctor values like so.
document.body.appendChild(image);

const image2 = new BiggerImage(15, 20); // pass ctor values like so.
image.width = 15;
document.body.appendChild(image2);*/

}());
//# sourceMappingURL=main.js.map
