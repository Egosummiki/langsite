<?php

$current_menu = 0;

if(isset($_GET['menu']))
{
    if(is_integer($_GET['menu'])) $current_menu = $_GET['menu'];
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1200, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="style.css">
    <script src="lib/ajax.js"></script>
    <script src="main.js"></script>

    <title>Test language site</title>
</head>
<body onload="onLoad()">
    <div id="main-container">
        <div id="top-bar">
            <div id="menu">
                
                <?php 
                    $menu_items = array("VERBS", "NOUNS", "ADJECTIVES", "ADVERBS", "SANDBOX");
                
                    for($i = 0; $i < count($menu_items); $i++)
                    {
                        if($i == $current_menu)
                        {
                            echo "<div class=\"menu-item-current\" id=\"menu-item-".$i."\">".$menu_items[$i]."</div>";
                        } else
                        {
                            echo "<div class=\"menu-item\" id=\"menu-item-".$i."\">".$menu_items[$i]."</div>";
                        }
                    }
                ?>

            </div>
            <div id="top-bar-line">
            </div>    
        </div>
        <div id="content" onload="onLoadContent()">
                    <?php
                        $file_name = strtolower($menu_items[$current_menu]).".php";

                        if(file_exists($file_name))
                        {
                            require_once($file_name);
                        }
                    
                    ?>
        </div>
        <div id="footer">Mikołaj Bednarek © 2017</div>
    </div>

</body>
</html>