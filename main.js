function onLoad()
{
    for(var i = 0; i < 5; i++)
    {
        let dom = document.getElementById("menu-item-"+i);
        dom.addEventListener("click",(function(id) {return function() {
            let menu_item = document.getElementsByClassName("menu-item-current")[0];
            let menu_item_clicked = document.getElementById("menu-item-"+id);
            menu_item.className = "menu-item";
            menu_item_clicked.className = "menu-item-current";

            ajax(menu_item_clicked.innerText.toLocaleLowerCase() + ".php", "", function(res){
                document.getElementById("content").innerHTML = res;

            });
        };})(i) );
    }
}