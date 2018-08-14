 var itemNr = 2;
 var divZero = document.getElementById("row");
 var inputList = [];
 console.log(StellarSdk);
 var btnAdd = document.getElementById("btnAddAnother");
 var btnSave = document.getElementById("btnSave");

 StellarSdk.Network.useTestNetwork();
 var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');


 function AddAnotherProduct() {
     var div = document.createElement("div");
     div.setAttribute("class", "row");
     div.setAttribute("style", "margin-top: 1.2rem;")

     div.innerHTML = '<div class="form-group col-sm-12">' +
         '   <h4 >Product-' + itemNr + '</h4>' +
         '  <label for="card-holder">Product Name</label>' +
         '  <input id="Product Name" name="productName-' + itemNr + ' 1"  type="text" class="form-control ' + itemNr + ' 1"' +
         'placeholder="Product Name" aria-label="Product Name" aria-describedby="basic-addon1">' +
         '  <label for="card-holder">Hash</label>' +
         '  <input id="Product Hash" name="productHash-' + itemNr + '"  type="text" class="form-control ' + itemNr + ' 1"' +
         'placeholder="Product Hash"" aria-label="Hash" aria-describedby="basic-addon1">' +
         ' </div>' +
         ' <div class="form-group col-sm-8">' +
         ' <label for="item-name">Item Name</label>' +
         ' <input id="item-name" type="text" name="productName-' + itemNr + ' 2" class="form-control ' + itemNr + ' 2" placeholder="Item name"' +
         '  aria-label="Item name" aria-describedby="basic-addon1">' +
         ' </div>' +
         ' <div class="form-group col-sm-4">' +
         '   <label for="Amount">Amount</label>' +
         '   <input id="Amount" type="text" name="productName-' + itemNr + ' 3" class="form-control ' + itemNr + ' 3"  placeholder="Amount" ' +
         'aria-label="Card Holder" aria-describedby="basic-addon1">' +
         ' </div>'
     divZero.appendChild(div);
     itemNr += 1;
 }

 var i = 1;
 var data = [];

 function GetAllInputs() {
     var hashField;
     inputList = [];
     if (i < itemNr) {

         var productName = "";
         var itemName = "";
         var amount = "";
         var j = 0;
         for (j = 0; j < 3; j++) {
             var h = j;
             var formNr = h + 1;
             var gridInput = [];

             var m = 0;

             gridInput = document.getElementsByName('productName-' + i + " " + formNr);
             hashField = document.getElementsByName('productHash-' + i);
              console.log("Log"+ i +"  "+hashField[0]);





             var formName = 'form-control ' + i + " " + formNr




             // console.log('form-control ' + i + " " + formNr);



             if (j === 0) {
                 productName = gridInput[0].value;
                 // console.log(i + " productName " + productName);


             } else if (j === 1) {
                 itemName = gridInput[0].value;
                 // console.log(i + " itemName " + itemName);

             } else if (j == 2) {
                 amount = gridInput[0].value;
                 // console.log(i + " amount " + amount);

             }





         }
         var arrayObject = {
             productName: productName,
             itemName: itemName,
             amount: amount
         }
         inputList.push(arrayObject);
         SendToStellar(arrayObject, hashField);


     } else {
         console.log(data);

     }
     i += 1;


 }



 function SendToStellar(arrayObject, hashField) {

     console.log("Sending to stellar");
     var secret = document.getElementById("secretKey").value;
     var destinationId = document.getElementById("receivingKey").value;
     var b = false;
     console.log(secret);
     console.log(destinationId);

     var transaction;
     var productName = arrayObject.productName.toString();
     var amount = arrayObject.amount.toString();
     var itemName = arrayObject.itemName.toString();



     var sourceKeys = StellarSdk.Keypair
         .fromSecret(secret);






     server.loadAccount(destinationId)

         .catch(StellarSdk.NotFoundError, function(error) {
             throw new Error('The destination account does not exist!');
         })

         .then(function() {
             return server.loadAccount(sourceKeys.publicKey());
         })


         .then(function(sourceAccount) {





             transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                 .addOperation(StellarSdk.Operation.payment({
                     destination: destinationId,
                     asset: StellarSdk.Asset.native(),
                     amount: amount
                 }))

                 .addMemo(StellarSdk.Memo.text(productName))
                 .build();

             transaction.sign(sourceKeys);
             console.log("running");

             return server.submitTransaction(transaction);
         })
         .then(function(result) {
             console.log("x is")
             console.log("Success! " + itemName + " ," + productName + " : " + result.hash);
             data.push(result.hash);
               console.log(hashField[0]);
              hashField[0].value=result.hash;

             GetAllInputs();
             // if (i > itemName) {
             //     PutHash();
             // }

         })
         .catch(function(error) {
             console.error('Something went wrong!', error);

         });



 }



 function PutHash() {
     var index = 0;
     for (index = 0; index < data.lenght; index++) {
         var i2 = index + 1;
         var elem = document.getElementsByName('productHash-' + i2);
         elem.value = data[0];

     }
 }




 btnAdd.addEventListener("click", function() {
     AddAnotherProduct();
 });

 btnSave.addEventListener("click", function() {
     GetAllInputs();

 });