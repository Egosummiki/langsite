function loadSidemenu()
{
    let sidemenu = document.getElementById("side-menu");
    
    if(sidemenu != null)
    {
        let numItems = sidemenu.childNodes.length;
    
        for(var i = 0; i < numItems; i++)
        {
            let dom = sidemenu.childNodes[i];
            if(dom.className == "side-menu-item" || dom.className == "side-menu-item-selected")
            {
                dom.addEventListener("click", (function(self) {
                    
                    return function() {
                        document.getElementsByClassName("side-menu-item-selected")[0].className = "side-menu-item";
                        self.className = "side-menu-item-selected";

                        ajax(document.getElementsByClassName('menu-item-current')[0].innerText.toLocaleLowerCase()
                        + '/' + self.innerText.toLocaleLowerCase() + '.php', "", function (result) {
                            let inner = document.getElementById("inner");
                            inner.innerHTML = result;
                        });
                    };

                })(dom));

            }
        }
    }
}

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
                loadSidemenu();
            });
        };})(i) );
    }

    loadSidemenu();
}