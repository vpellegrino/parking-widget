(() => {

    window.customElements.define('parking-widget', class extends HTMLElement {

        constructor() {
            super();

            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(this.fillTemplate().content.cloneNode(true));
        }

        fillTemplate() {
            const templateNode = document.createElement('template');
            templateNode.innerHTML = `      <div id="vendor-area">
                                                <input id="collapsible" class="toggle" type="checkbox">
                                                <div class="toggle-area">
                                                    <label class="vendor-title"></label>
                                                    <label for="collapsible" id="show-hide-title"></label>
                                                </div>
                                                <div class="collapsible-content">
                                                    <div class="vendor-details">
                                                        <img class="vendor-map" alt="parking-map">
                                                        <div class="feature-section">
                                                            <p class="features-title"></p>
                                                            <ul class="feature-list"></ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="parking-slot-area"></div>
                                            <link rel="stylesheet" href="parkingWidget/parkingWidget.css">
                                      `;
            return templateNode;
        }

        set model(model) {
            this.render(model);
        }

        set onSelectionCallback(fn) {
            this._selectionCallback = fn;
        }

        render(model) {
            if (model && model.dictionary && model.vendor && model.parkings) {
                this.renderVendorArea(model.vendor, model.dictionary);
                this.renderParkingSlotArea(model.parkings, model.dictionary);
            }
        }

        renderVendorArea(vendor, dictionary) {
            this.attachEventForShowHideTitle(dictionary);

            this.shadowRoot.querySelector('#show-hide-title').innerHTML = `${dictionary.showDetails}`;
            this.shadowRoot.querySelector('.vendor-title').innerHTML = `${dictionary.bookYourParking} ${vendor.departureAirport}`;
            this.shadowRoot.querySelector('.vendor-map').src = vendor.map;

            this.populateFeatureListSection(vendor, dictionary);
        }

        populateFeatureListSection(vendor, dictionary) {
            if (vendor.features && Array.isArray(vendor.features)) {
                this.shadowRoot.querySelector('.features-title').innerHTML = `${dictionary.featuresTitle}`;

                let featureList = this.shadowRoot.querySelector('.feature-list');
                vendor.features.forEach(feature => {
                    let featureNode = this.shadowRoot.ownerDocument.createElement("LI");
                    featureNode.innerText = feature;
                    featureList.appendChild(featureNode);
                });
            }
        }

        attachEventForShowHideTitle(dictionary) {
            this.shadowRoot
                .querySelector('#collapsible')
                .addEventListener('change', (event) => {
                    if (event.target.checked) {
                        this.shadowRoot.querySelector('#show-hide-title').innerHTML = `${dictionary.hideDetails}`;
                    } else {
                        this.shadowRoot.querySelector('#show-hide-title').innerHTML = `${dictionary.showDetails}`;
                    }
                });
        }

        renderParkingSlotArea(parkingList, dictionary) {
            let parkingSlotList = this.shadowRoot.querySelector('#parking-slot-area');
            parkingList.forEach(parking => {
                parkingSlotList.appendChild(this.populateParkingSlotNode(parking, dictionary));
            });
        }

        populateParkingSlotNode(parking, dictionary) {
            let parkingSlotNode = this.shadowRoot.ownerDocument.createElement("parking-slot");

            parkingSlotNode.setAttribute('parkingId', parking.id);
            parkingSlotNode.setAttribute('indoor', parking.indoor ? dictionary.indoorSpace : dictionary.outdoorSpace);
            parkingSlotNode.setAttribute('insurance', parking.insurance ? dictionary.insuranceIncluded : dictionary.insuranceExcluded);
            parkingSlotNode.setAttribute('price', parking.price);
            this.attachParkingSlotSelectionEvent(parkingSlotNode, parking);

            return parkingSlotNode;
        }

        attachParkingSlotSelectionEvent(parkingSlotNode, parking) {
            parkingSlotNode.addEventListener('click', e => {
                if (typeof this._selectionCallback === "function") {
                    this._selectionCallback(parking);
                }
            });
        }

    });

})();
