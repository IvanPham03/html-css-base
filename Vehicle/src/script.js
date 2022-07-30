filter('all');

function filter(c) {
  var i;
  var column = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < column.length; i++) {
    remove(column[i], "show");
    if (column[i].className.indexOf(c) > -1) add(column[i], "show");
  }
}

function add(element, name) {
  var arr1, arr2, i;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");

  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function remove(element, name) {
    var arr1 = element.className.split(" ");
    var arr2 = name.split(" ");
    var i;
    for(i = 0 ; i < arr2.length; i++){
        while(arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className =  arr1.join(" ");
}



var btnActive = document.getElementsByClassName('btn--items');

var i;
for(i = 0 ; i<btnActive.length; i++){
    btnActive[i].addEventListener('click', function() {
        var currentActive = document.getElementsByClassName('active');
        currentActive[0].className = currentActive[0].className.replace('active', '');
        this.className += " active";
    })

}
