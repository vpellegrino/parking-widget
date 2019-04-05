describe("Given ParkingWidget component", () => {

    let parkingWidgetElement;

    const mockedModel = {
        "vendor": { "name": "Alitalia", "departureAirport": "Verona", "map": "http://url", "features": ["a_feature"]},
        "parkings": [{"id": "123", "indoor": false, "insurance": false, "price": "13.56 EUR"}],
        "dictionary":{ "bookYourParking":"Prenota il tuo parcheggio a", "featuresTitle":"Sono inclusi i seguenti servizi:",
                        "indoorSpace":"Posto auto coperto", "outdoorSpace":"Posto auto scoperto", "insuranceIncluded":"Assicurazione inclusa",
                        "insuranceExcluded":"Assicurazione esclusa"}
    };

    beforeEach(() => {
        document.body.innerHTML = "";
        parkingWidgetElement = document.createElement("parking-widget");
    });

    describe("When setting widget model", () => {

        beforeEach(() => {
            parkingWidgetElement.model = mockedModel;
            document.body.appendChild(parkingWidgetElement);
        });

        it("Then the vendor area is correctly filled", () => {
            expect(parkingWidgetElement.shadowRoot.querySelector('.vendor-title')).toBeDefined();
            expect(parkingWidgetElement.shadowRoot.querySelector('.vendor-title').textContent).toEqual(`Prenota il tuo parcheggio a Verona`);
            expect(parkingWidgetElement.shadowRoot.querySelector('.vendor-map')).toBeDefined();
            expect(parkingWidgetElement.shadowRoot.querySelector('.vendor-map').getAttribute("src")).toEqual(`http://url`);
            expect(parkingWidgetElement.shadowRoot.querySelector('.features-title')).toBeDefined();
            expect(parkingWidgetElement.shadowRoot.querySelector('.features-title').textContent).toEqual(`Sono inclusi i seguenti servizi:`);
        });

        it("Then the feature list is correctly enumerated", () => {
            expect(parkingWidgetElement.shadowRoot.querySelector('.feature-list')).toBeDefined();
            expect(parkingWidgetElement.shadowRoot.querySelector('.feature-list').hasChildNodes()).toBeTruthy();
            expect(parkingWidgetElement.shadowRoot.querySelector('.feature-list').childNodes.length).toEqual(1);
            expect(parkingWidgetElement.shadowRoot.querySelector('.feature-list').childNodes[0].textContent).toEqual("a_feature");
        });

        it("Then the parking slot nodes are correctly built", () => {
            expect(parkingWidgetElement.shadowRoot.querySelector('#parking-slot-area')).toBeDefined();
            expect(parkingWidgetElement.shadowRoot.querySelector('#parking-slot-area').hasChildNodes()).toBeTruthy();
            expect(parkingWidgetElement.shadowRoot.querySelector('#parking-slot-area').childNodes.length).toEqual(1);
            expect(parkingWidgetElement.shadowRoot.querySelector('#parking-slot-area').childNodes[0].getAttribute("parkingId")).toEqual("123");
            expect(parkingWidgetElement.shadowRoot.querySelector('#parking-slot-area').childNodes[0].getAttribute("indoor")).toEqual("Posto auto scoperto");
            expect(parkingWidgetElement.shadowRoot.querySelector('#parking-slot-area').childNodes[0].getAttribute("insurance")).toEqual("Assicurazione esclusa");
            expect(parkingWidgetElement.shadowRoot.querySelector('#parking-slot-area').childNodes[0].getAttribute("price")).toEqual("13.56 EUR");
        });

    });

    describe("When setting a selection callback function", () => {

        const fn = jasmine.createSpy();

        beforeEach(() => {
            parkingWidgetElement.model = mockedModel;
            parkingWidgetElement.onSelectionCallback = fn;
            document.body.appendChild(parkingWidgetElement);
        });

        it("Then, on selection, that function is invoked", () => {
            parkingWidgetElement.shadowRoot.querySelector('#parking-slot-area').childNodes[0].click();
            expect(fn).toHaveBeenCalled();
        });

    });

    describe("When no widget model is set", () => {

        beforeEach(() => {
            document.body.appendChild(parkingWidgetElement);
        });

        it("Then the vendor area is not filled", () => {
            expect(parkingWidgetElement.shadowRoot.querySelector('.vendor-title')).toBeDefined();
            expect(parkingWidgetElement.shadowRoot.querySelector('.vendor-title').textContent).toEqual(``);
            expect(parkingWidgetElement.shadowRoot.querySelector('.vendor-map')).toBeDefined();
            expect(parkingWidgetElement.shadowRoot.querySelector('.vendor-map').getAttribute("src")).toEqual(null);
            expect(parkingWidgetElement.shadowRoot.querySelector('.features-title')).toBeDefined();
            expect(parkingWidgetElement.shadowRoot.querySelector('.features-title').textContent).toEqual(``);
        });

        it("Then the feature list is empty", () => {
            expect(parkingWidgetElement.shadowRoot.querySelector('.feature-list')).toBeDefined();
            expect(parkingWidgetElement.shadowRoot.querySelector('.feature-list').hasChildNodes()).toBeFalsy();
        });

        it("Then the parking slot nodes are never built", () => {
            expect(parkingWidgetElement.shadowRoot.querySelector('#parking-slot-area')).toBeDefined();
            expect(parkingWidgetElement.shadowRoot.querySelector('#parking-slot-area').hasChildNodes()).toBeFalsy();
        });

    });

});
