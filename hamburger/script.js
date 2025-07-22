function onClickMenu(){
    document.getElementById("menu").classList.toggle("icon") //jab toggle hoga eak class icon add ho jayga jaha menu hai.
    document.getElementById("nav").classList.toggle("change") //jaha id nav h.ai waha class ho jayga change
}


// TO VIEW MORE FOOD-ITEM WHEN CLICKED.
const viewMore = document.querySelector(".section3 .view-more")
viewMore.addEventListener("click" , function(e){
    e.preventDefault();
    const hidden = document.querySelectorAll(".hidden-item");

    if(this.textContent === "View More")
    {
        hidden.forEach(function(items)
        {
            items.classList.remove("hidden-item");
            
            items.classList.add("show-item"); //added becz to identify hidden class items. for view less working.
            
            items.classList.add("x");  //will height0,opacity0 of all extra item
            
            setTimeout(function() 
            {
                items.classList.add("animate");// Add animate class to extra item for increase visibility by height and opacity
            }, 10); 
        });

        this.textContent = "View Less";
    }
    else{
        const show = document.querySelectorAll(".show-item");
        show.forEach(function(items){
            setTimeout(function(){
                items.classList.add("hidden-item");
            },250)
            items.classList.remove("animate"); //this will remove all animation whch include height and opacity.
        });
        this.textContent = "View More";
    }
})