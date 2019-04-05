describe("Given ParkingSlot component", () => {

    let parkingSlotElement;

    beforeEach(() => {
        document.body.innerHTML = "";
        parkingSlotElement = document.createElement("parking-slot");
    });

    describe("When filling one of its attributes", () => {

        it("Then it renders in the DOM only the expected attribute value", () => {
            const expectedValue = "test";

            parkingSlotElement.setAttribute('indoor',  expectedValue);
            document.body.appendChild(parkingSlotElement);

            expect(document.querySelector(".parking-slot-indoor")).toBeDefined();
            expect(document.querySelector(".parking-slot-indoor").innerHTML).toEqual(expectedValue);
            expect(document.querySelector(".parking-slot-insurance")).toBeDefined();
            expect(document.querySelector(".parking-slot-insurance").innerHTML).toEqual("null");
            expect(document.querySelector(".parking-slot-price")).toBeDefined();
            expect(document.querySelector(".parking-slot-price").innerHTML).toEqual("null");
        });

    });

    describe("When filling all its attributes", () => {

        it("Then it renders in the DOM all expected attributes values", () => {
            const expectedIndoorValue = "indoor";
            const expectedInsuranceValue = "insurance";
            const expectedPriceValue = "price";

            parkingSlotElement.setAttribute('indoor',  expectedIndoorValue);
            parkingSlotElement.setAttribute('insurance',  expectedInsuranceValue);
            parkingSlotElement.setAttribute('price',  expectedPriceValue);

            document.body.appendChild(parkingSlotElement);

            expect(document.querySelector(".parking-slot-indoor")).toBeDefined();
            expect(document.querySelector(".parking-slot-indoor").innerHTML).toEqual(expectedIndoorValue);
            expect(document.querySelector(".parking-slot-insurance")).toBeDefined();
            expect(document.querySelector(".parking-slot-insurance").innerHTML).toEqual(expectedInsuranceValue);
            expect(document.querySelector(".parking-slot-price")).toBeDefined();
            expect(document.querySelector(".parking-slot-price").innerHTML).toEqual(expectedPriceValue);
        });

    });

    describe("When no attribute is filled", () => {

        it("Then it leaves the template as is", () => {
            document.body.appendChild(parkingSlotElement);

            expect(document.querySelector(".parking-slot-indoor")).toBeDefined();
            expect(document.querySelector(".parking-slot-indoor").innerHTML).toEqual("null");
            expect(document.querySelector(".parking-slot-insurance")).toBeDefined();
            expect(document.querySelector(".parking-slot-insurance").innerHTML).toEqual("null");
            expect(document.querySelector(".parking-slot-price")).toBeDefined();
            expect(document.querySelector(".parking-slot-price").innerHTML).toEqual("null");
        });

    });

});
