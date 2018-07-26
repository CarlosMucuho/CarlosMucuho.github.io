const itemsList = [
    { id: "product-1", name: "Hamburger", price: 5, hash: "e74dc2ab4285fac5fa5a2d17f6e15d57dbd7232a7c5eb7737d7d66ef090c0289", quantity: 1 },
    { id: "product-2", name: "French Fries", price: 3, hash: "475fe611a43d96ebaa5f8298d603d907fe70d1b68f313a14b478bafc41f0960b", quantity: 1 },
    { id: "product-3", name: "Hot dog", price: 5, hash: "0fddc1dc47adf1f88d0afea9cf0748c7dcad698a2ae921ecec81ec7c8334827c", quantity: 1 },
    { id: "product-4", name: "Pizza slice", price: 5, hash: "78836c6b08113de6abcd914712818c1b71a8af27f2312d24fa7331260f4c08c0", quantity: 1 },
    { id: "product-5", name: "Orange juice", price: 2, hash: "5339bebaa813d3bbe62d27df73730c14f634c2d725eb6e9bd414b2ef37227969", quantity: 1 },
    { id: "product-6", name: "Strawberry juice", price: 2, hash: "eb7915d8eb327a3738f6048ee8c650033b5e2366b70763542c3d20111d54755f", quantity: 1 },
    { id: "product-7", name: "Vanilla Ice Cream", price: 2.3, hash: "4faaa3caf2fb01696f558f95c5fd9e64645e2ef331496a41f21aa2b8732e237a", quantity: 1 },
    { id: "product-8", name: "Chocolate Ice Cream", price: 2.3, hash: "84d740cb3d225c81a41c9d0fd1fc76e80d5e7f8526c30b340ba48739c26f6f2b", quantity: 1 }
]
console.log(StellarSdk);
var notifyMethodNr = 0;

var obj = sessionStorage.myObject;
console.log("out if " + obj);
var cartList = [];
if (obj != undefined) {
    console.log("inside if" + obj);
    cartList = JSON.parse(obj);
}
console.log("cart " + cartList);


var getClassArray = document.getElementsByClassName('items');
var divzero = getClassArray[0];
var cartLenght = Object.keys(cartList).length;
var i = 0;
var total = new Decimal(0);



if (obj != undefined) {
    for (i = 0; i < cartLenght; i++) {
        var divCartItemone = document.createElement("div");
        var div = document.createElement("div");
        var productName = cartList[i].name;
        var productId = cartList[i].id;
        var quantity = new Decimal(cartList[i].quantity);
        var productPrice = cartList[i].price + " XLM";
        var temp = new Decimal(cartList[i].price);
        temp = temp.times(quantity)
        console.log("price is : " + temp);
        total = total.plus(temp);
        console.log("total is : " + total);
        div.setAttribute("class", "product");
        div.innerHTML = ' <div class="row">' +
            '   <div class="col-md-3">' +
            '     <img class="img-fluid mx-auto d-block image" src="images/' + productId + '.jpg">' +
            '   </div>' +
            '   <div class="col-md-8">' +
            '     <div class="info">' +
            '       <div class="row">' +
            '         <div class="col-md-4 product-name">' +
            '           <div class="product-name">' +
            '             <a href="#">' + productName + '</a>' +
            '             <div class="product-info">'
            // +'               <div>Display: <span class="value">5 inch</span></div>'
            // +'               <div>RAM: <span class="value">4GB</span></div>'
            // +'              <div>Memory: <span class="value">32GB</span></div>'
            +
            '             </div>' +
            '           </div>' +
            '         </div>' +
            '         <div class="col-md-3 quantity">' +
            '           <label for="quantity">Quantity:</label>' +
            '           <p id="quantity" type="number"  class="form-control ">' + quantity + '</p>' +
            '         </div>' +
            '         <div class="col-md-1 price">' +
            '           <span>x</span>' +
            '         </div>' +
            '         <div class="col-md-4 price">' +
            '           <span>' + productPrice + '</span>' +
            '         </div>' +
            '       </div>' +
            '     </div>' +
            '   </div>' +
            ' </div>'

        divzero.appendChild(div);
    }
}
// divTotalOne.innerHTML = total+ " xlm";
// divTotalTwo.innerHTML = total+ " xlm";
var x = 0;
for (x = 1; x < 3; x++) {
    var divTotal = document.getElementById("total" + x);
    console.log("x is " + x);
    var totalAmount = total + " XLM";
    divTotal.innerHTML = totalAmount;
}

function GetCartItems() {
    cartList = JSON.parse(sessionStorage.myObject);
}



function SaveCart() {
    sessionStorage.myObject = JSON.stringify(cartList);
    console.log("sessionStorage " + sessionStorage.myObject);
}



function GenerateQrCode() {



    document.getElementById("demo").innerHTML = "Please wait ...";

    var to = "";
    var data = "";
    var tId = "";

    var xhttp = new XMLHttpRequest();
    var y = 0;
    var i = 0
    var itemsHash = [];
    var itemsQuantity = [];
    for (i = 0; i < cartLenght; i++) {
        itemsHash.push(cartList[i].hash);
        itemsQuantity.push(cartList[i].quantity);
    }



    // Here we are not sending the amount to the server, 
    // because any user can edit this document and replace the amount.

    // But if we send the hash we got when storing the product details 
    // in the ledger we ensure that the amount is valid because only
    // the owner of the  account used to send the transaction
    // can create the trasanctions.


    var appId = "25061975";
    var hash = itemsHash.toString();
    var quantity = itemsQuantity.toString();



    var url = "https://gjrbh73zr7.execute-api.us-east-1.amazonaws.com/Testing/spggenerateqrcode?appId=" + appId + "&itemHash=" +
        hash + "&itemQuantity=" + quantity+"&notifyMethodNr="+notifyMethodNr.toString();





    xhttp.onreadystatechange = function() {

        if (this.status == 200) {
            // {"memoId":"P2018627522567784806","remainingTime":"34452"}
            if (this.responseText !== "") {
                var obj = JSON.parse(this.responseText);
                document.getElementById("demo").innerHTML = " transactionId:" + obj.transactionId + " duration: " + obj.duration + " ms";

                tId = String(obj.transactionId);
                amount = String(obj.amount);
                to = String(obj.destination);


                data = tId + "/" + amount + "/" + to;
                if (obj.transactionId !== null && y > 0) {






                    jQuery('#qrcode').qrcode({ width: 180, height: 180, text: data });

                    if(notifyMethodNr===0){
                        ListenForConfirmationWithPusher(obj.transactionId);
                    }else{
                        ListenForConfirmationWithStellar(obj.transactionId);
                    }
                    
                    

                }
                y++;
            }
        }

    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('x-api-key',"eKtCM7epTu6MAFU7id1Hq61ndmBTEQ8A27LJ7MHH");
    xhttp.send();

    SaveCart();
}


var btnGenerate = document.getElementById("btnGenerateQr");

btnGenerate.addEventListener('click', function() {
    GenerateQrCode();

});



function ListenForConfirmationWithPusher(transactionId) {

    Pusher.logToConsole = true;
    var room = 'f34be8d0ab5fe201cd6e';
    var pusher = new Pusher(room, {
        wsHost: 'ws.pusherapp.com',
        httpHost: 'sockjs.pusher.com',
        encrypted: true
    });
    tId = String(obj.transactionId);
    var channel = pusher.subscribe(transactionId + '-channel');
    channel.bind('my-event', function(data) {
        //   alert(data.message);
        location.href = "confirmation.html"

    });
}





function ListenForConfirmationWithStellar(transactionId) {
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    var accountId = 'GDT22UIAFVVQOENQD3PHFKBTEUE4XBCXSWQVYTKVWBY2CIAGKUAK6AW5';

    // Create an API call to query transactions involving the account.
    var trasanctions = server.transactions().forAccount(accountId);


    trasanctions.stream({
        onmessage: function(payment) {



            if (payment.source_account === accountId) {
                return;
            }

            console.log(JSON.stringify(payment));
            if (payment.memo === transactionId) {
                location.href = "confirmation.html";
            }
        },

        onerror: function(error) {
            console.error('Error in payment stream');
        }
    });


}

function ChooseNotifyMethod(nr){
    notifyMethodNr = nr;
    console.log(notifyMethodNr);
}