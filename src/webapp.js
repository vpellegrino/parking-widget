document.addEventListener('DOMContentLoaded', () => {

    function updateCart(chartItem) {
        if (chartItem) {
            document.querySelector("#total-cart").innerHTML = chartItem.price;
        }
    }

    fetch('assets/model.json').then(response => {
        return response.json();
    }).then(widgetModel => {
        let myParkingWidget = document.querySelector("#my-parking-widget");

        myParkingWidget.model = widgetModel;
        myParkingWidget.onSelectionCallback = updateCart;
    }).catch(err => {
        console.error(err);
    });

});
