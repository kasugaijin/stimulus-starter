// src/controllers/clipboard_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['source']
  static classes = [ "supported" ]
  
  copy() {
    navigator.clipboard.writeText(this.sourceTarget.value)
  }

  // Note: The clipboard-write permission name is not supported in Firefox, only Chromium browsers.
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard#using_the_clipboard_api
  connect() {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted") {
        this.element.classList.add(this.supportedClass);
      }
    });
  }
}