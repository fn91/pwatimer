import { LitElement, html, css } from "lit";
import "./timer-display.js";

export default class TimerComponent extends LitElement {
  static styles = css`
    .timer-container {
      display: flex;
      flex-direction: column;
      margin-block: 3rem;
      background-color: var(--text-color);
      color: var(--neutral-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
    }
    h3 {
      text-align: center;
      margin-block: 0;
      color: var(--primary-color);
    }

    .btn-container,
    .configurator {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 1rem;
    }
    .configurator-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .configurator {
      align-items: flex-end;
      margin-block: 1rem;
    }
    .configurator > * {
      margin-block: 0;
    }
    .configurator > input {
      width: 6rem;
      border: none;
      text-align: center;
      border-bottom: 1px solid black;
      font-size: 1rem;
    }
    button {
      background-color: var(--primary-color);
      padding: 0.6rem 1.3rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease-in-out;
    }
    button:hover {
      scale: 1.03;
      box-shadow: 0 0 0.5rem var(--primary-color);
    }
  `;

  static properties = {
    shorttimer: { type: Boolean },
    btnpause: { type: Boolean },
    btnplay: { type: Boolean },
    btnreset: { type: Boolean },
    reverse: { type: Boolean },
    autoreset: { type: Boolean },
    autostart: { type: Boolean },
    start: { type: Number },
    limit: { type: Number },
    doubledigits: { type: Boolean },
    playDisabled: { type: Boolean },
    pauseDisabled: { type: Boolean },
    resetDisabled: { type: Boolean },
  };

  constructor() {
    super();
    this.shorttimer = false;
    this.btnpause = false;
    this.btnplay = false;
    this.btnreset = false;
    this.reverse = false;
    this.autoreset = false;
    this.autostart = false;
    this.start = 90;
    this.limit = 20;
    this.doubledigits = false;
    this.playDisabled = false;
    this.pauseDisabled = true;
    this.resetDisabled = false;
  }
  // Lo que ocurre cuando se conecta el componente al DOM
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("timer-end", this.alertTimerEnd);
    window.addEventListener("timer-autostart", this.autoPlayTimer);
    window.addEventListener("reset", this.alertTimerReset);
    window.addEventListener("play", this.alertPlayTimer);
    window.addEventListener("pause", this.alertPauseTimer);
    this.soundComponent = this.querySelector("sound-component");
  }
  // Lo que ocurre cuando se desconecta el componente al DOM
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("timer-end", this.timerEnd);
    window.removeEventListener("timer-autostart", this.autoPlayTimer);
    window.removeEventListener("reset", this.alertTimerReset);
    window.removeEventListener("play", this.alertPlayTimer);
    window.removeEventListener("pause", this.alertPauseTimer);
  }
  // Cuando queremos acceder al DOM que todavía no se ha renderizado
  updated() {
    this.alert = this.shadowRoot.getElementById("alert");
  }
  // Funciones que se ejecutan cuando se dispara un evento alertas
  autoPlayTimer = () => {
    this.playDisabled = true;
    this.pauseDisabled = false;
  };
  alertTimerEnd = (event) => {
    if (this.autoreset) {
      return;
    }
    this.alert.textContent = event.detail.message;
    this.playDisabled = false;
    this.pauseDisabled = true;
    // Aqui va ejecucion de sonido
    if (this.soundComponent) this.soundComponent.playSound();
  };
  alertTimerReset = (event) => {
    this.alert.textContent = event.detail.message;
    this.playDisabled = false;
    this.pauseDisabled = true;
  };
  alertPlayTimer = (event) => {
    this.alert.textContent = event.detail.message;
  };
  alertPauseTimer = () => {
    this.alert.textContent = "Timer paused";
  };
  // Funciones que se ejecutan cuando se dispara un evento botones
  playTimer = () => {
    const event = new CustomEvent("play", {
      detail: {
        message: "Timer started",
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this.playDisabled = true;
    this.pauseDisabled = false;
  };
  pauseTimer = () => {
    const event = new CustomEvent("pause", {
      detail: {
        message: "Timer paused",
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this.playDisabled = false;
    this.pauseDisabled = true;
  };
  resetTimer = () => {
    const event = new CustomEvent("reset", {
      detail: {
        message: "Timer reset",
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this.playDisabled = false;
    this.pauseDisabled = true;
  };
  configSecondsTimer = () => {
    const seconds = this.shadowRoot.getElementById("seconds-config").value;
    // const oldStart = this.start;
    this.start = Number(seconds);
    // this.requestUpdate("start", oldStart);
    // console.log(this.start);
    // console.log(oldStart);
  };

  render() {
    return html`
      <div class="timer-container">
        <h3 id="alert">Timer</h3>
        <slot></slot>
        <timer-display
          .reverse=${this.reverse}
          .autoreset=${this.autoreset}
          .autostart=${this.autostart}
          .start=${this.start}
          .limit=${this.limit}
          .doubledigits=${this.doubledigits}
          .shorttimer=${this.shorttimer}
        ></timer-display>

        <div class="btn-container">
          ${this.btnpause
            ? html`<button
                ?disabled=${this.pauseDisabled}
                @click=${this.pauseTimer}
              >
                Pause
              </button>`
            : ""}
          ${this.btnplay
            ? html`<button
                ?disabled=${this.playDisabled}
                @click=${this.playTimer}
              >
                Play
              </button>`
            : ""}
          ${this.btnreset
            ? html`<button
                ?disabled=${this.resetDisabled}
                @click=${this.resetTimer}
              >
                Reset
              </button>`
            : ""}
        </div>
        <div class="configurator-container">
          <div class="configurator">
            <h4>Configure</h4>
            <input
              type="number"
              min="1"
              max="3600"
              id="seconds-config"
              value=${this.start}
            />
            <h4>seconds</h4>
          </div>
          <button
            id="config-btn"
            @click=${this.configSecondsTimer}
          >
            Save time
          </button>
        </div>
      </div>
    `;
  }
}

// customElements.define("timer-component", TimerComponent);
