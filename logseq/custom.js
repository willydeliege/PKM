const embeddedpages = document.getElementsByClassName("embed-page");
const embeddedpagesObserver = new MutationObserver(function onMutated(){
    Array.prototype.map.call(embeddedpages, (div)=>{
        if (div.dataset.foldable) return;

        div.querySelector(".embed-page .mr-3").addEventListener("click", function onClicked(e){
            const classList = div.classList;
            if (!classList.contains("unfolded")) classList.add("unfolded");
            else classList.remove("unfolded");
        });

        div.dataset.foldable = "true";
    });
});
embeddedpagesObserver.observe(document.getElementById("app-container"), {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"]
});
