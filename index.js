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

var cartList = []; // is a list of items that were added to cart
var i = 0;
var divZero = document.getElementById("grid");
 // WarmLambdaFunctions();


function WarmLambdaFunctions() {

    var xhttp1 = new XMLHttpRequest();
    var xhttp2 = new XMLHttpRequest();


    var url1 = "https://n2wxrgy685.execute-api.us-east-1.amazonaws.com/testing/spgpygenerateqrcode?appId=aa&itemHash="
        + "&itemQuantity=1&notifyMethodNr=aa";


    var url2 = "https://0awnrqg4lg.execute-api.us-east-1.amazonaws.com/Testing/spgconfirmpayment?transactionId=aa"  +
        "&transactionHash=aa";



    xhttp1.onreadystatechange = function() {

        if (this.status == 200) {
            console.log("CreateQR warmed");
        }

    };
    // xhttp1.open("GET", url1, true);
    // // xhttp1.setRequestHeader('x-api-key',"eKtCM7epTu6MAFU7id1Hq61ndmBTEQ8A27LJ7MHH");
    // xhttp1.send();

    xhttp2.onreadystatechange = function() {

        if (this.status == 200) {
            console.log("ConfirmPayment warmed");
        }

    };
    xhttp2.open("GET", url2, true);
    xhttp2.setRequestHeader('x-api-key',"eKtCM7epTu6MAFU7id1Hq61ndmBTEQ8A27LJ7MHH");
    xhttp2.send();

}








for (i = 0; i < 8; i++) {
    var div = document.createElement("div");
    var productName = itemsList[i].name;
    var productId = itemsList[i].id;
    var productPrice = itemsList[i].price + " xlm";

    div.innerHTML = '<div class="product" id="product' + (i + 1) + '"><img class="images ' + productId + '"src="images/' + productId +
        '.jpg"><div class="imgButton" name="' + productId + '">' +
        '<button name="btnAddToCart' + i + '" type="button" class="btn btn-primary btnItem"  value="test">Add to cart</button>' +
        '<button name="btnBuy' + i + '" type="button" class="btn btn-primary btnItem"   value="test">Buy</button>' +
        '</div>' +
        '</div>' +
        '<p class="priceTag">' + productName + '</p>' +
        '<p class="priceTag">' + productPrice + '</p>'
    divZero.appendChild(div);
}

gridButtons = document.getElementsByClassName('btn btn-primary btnItem');
gridButtonItems = [].slice.call(gridButtons);





gridButtonItems.forEach(function(btn) {
    btn.addEventListener('click', function() {
        var name = btn.getAttribute("name")
        console.log(name);
        if (name.includes("btnAddToCart")) {
            var temp = name.replace("btnAddToCart", "");
            var btnId = parseInt(temp);
            AddToCart(btnId);
            flyToCart(btnId);
        } else {
            var temp = name.replace("btnBuy", "");
            var btnId = parseInt(temp);
            AddToCart(btnId);
            SaveCart();
        }


    });
});




function AddToCart(btnId) {

    var cartListLenght = Object.keys(cartList).length;
    var itemIsInTheCart = false;
    var item = itemsList[btnId];
    var i = -1;

    if (cartListLenght > 0) {


        // console.log("id is"+ btnId);
        var found = SearchCart(cartListLenght, item.name);
        // console.log("lenght is "+cartListLenght);
        // console.log(found[0]+" " + found[1]);

        if (found[0]) {
            i = found[1];
            cartList[found[1]].quantity += 1;
            console.log("adding +1 " + item.name);
            itemIsInTheCart = found[0]


        } else {
            cartList.push(item);
            console.log("adding " + item.name);




        }
        console.log(cartList);
    } else {
        console.log("cart is empty");
        console.log(itemsList[btnId]);
        cartList.push(itemsList[btnId]);


    }
    AddItemsToDropDownMenu(i, item, itemIsInTheCart);


}



function SearchCart(cartListLenght, itemName) {
    var x = 0;


    for (x = 0; x < cartListLenght; x++) {
        if (cartList[x].name === itemName) {
            console.log("quantity is " + cartList[x].quantity)
            return [true, x];
        }
    }
    //   console.log("Cart dont have "+ itemName)
    return [false, x];
}


function AddItemsToDropDownMenu(i, item, itemIsInTheCart) {
    console.log("found is " + itemIsInTheCart + "i is " + i);
    if (itemIsInTheCart != true) {
        var divCart = document.getElementById('dropdown-menu');
        console.log("i<0 ");
        var div = document.createElement("div");
        div.innerHTML = '<a id="' + item.name + '"  class="dropdown-item" href="#">' + item.name + '  x ' + '1</a>' +
            '<div class="dropdown-divider"></div>';
        divCart.appendChild(div);
    } else {
        console.log("i >= 0");
        var div = document.getElementById(item.name);
        div.innerHTML = item.name + '  x ' + cartList[i].quantity;
    }

}



function SaveCart() {
    if (Object.keys(cartList).length > 0) {
        sessionStorage.myObject = JSON.stringify(cartList);
        GoToCart();
        console.log("sessionStorage " + sessionStorage.myObject);
    } else {
        alert("Cart is empty");
    }
}






function flyToCart(btnId) {
    var cart = $('.nav-item.dropdown');
    var name = '.images.product-' + (btnId + 1);
    var parentName = "#product" + btnId;
    // var img = document.getElementById(name);
    // imgLoader.src ="images/product-"+btnId+".jpg";

    console.log(name);
    console.log(cart);
    var imgtodrag = $(name).eq(0);

    console.log(imgtodrag);
    // console.log(imageToDrag.tos);
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
            .css({
                'opacity': '0.8',
                'position': 'absolute',
                'height': '150px',
                'width': '150px',
                'z-index': '100'
            })
            .appendTo($('body'))
            .animate({
                'top': cart.offset().top + 10,
                'left': cart.offset().left + 30,
                'width': 45,
                'height': 45
            }, 1000, 'easeInOutExpo');

        setTimeout(function() {
            cart.effect("shake", {
                times: 2
            }, 200);
        }, 1500);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function() {
            $(this).detach()
        });
    }
}




function GoToCart() {
    location.href = "shopping-cart.html";
}