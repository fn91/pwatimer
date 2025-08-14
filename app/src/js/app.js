import { LitElement, css, html } from "lit";
import * as TimerComponent from "../../node_modules/@drkedrkedjon/timer/dist/index.js";
import * as logo from "../images/TimerPWA-logos_transparent.png";

export class App extends LitElement {
  static styles = css`
    .main-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .inner-container {
      width: clamp(16rem, 90vw, 42rem);
    }
    .logo-timerpwa {
      max-width: 21rem;
      margin: 0 auto;
      display: block;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.customElements.define("timer-component", TimerComponent);
  }

  render() {
    return html`
      <main class="main-container">
        <div class="inner-container">
          <img
            class="logo-timerpwa"
            src="${logo.default}"
            alt="TimerPWA logo"
          />
          <timer-component
            doubledigits
            reverse
            shorttimer
            btnreset
            btnplay
            btnpause
          ></timer-component>
        </div>
      </main>
    `;
  }
}
