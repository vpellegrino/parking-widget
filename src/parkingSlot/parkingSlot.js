(() => {
    window.customElements.define('parking-slot', class extends HTMLElement {

        connectedCallback() {
            this.innerHTML = `
                               <ul>
                                   <li class="parking-slot-indoor">${this.getAttribute('indoor')}</li>
                                   <li class="parking-slot-insurance">${this.getAttribute('insurance')}</li>
                                   <li class="parking-slot-price">${this.getAttribute('price')}</li>
                               </ul>
                            `;
        }

    });
})();