import { GetCarData } from 'backend/backendFunctions.web'

$w.onReady(function () {
    
    getCars()

    $w("#vctrAllWeather, #vctrCameras, #vctrBody").onMouseIn((event) => {
        const target = event.target.id;
        console.log(target);
        let headingText, bodyText;

        switch (target) {
        case "vctrBody":
            headingText = "Sleak and Modern Design";
            bodyText =
                "Engineering and design meet in one vehicle that drives itself, and impresses wherever it goes. ";
            break;
        case "vctrCameras":
            headingText = "360+ Degrees of Safety";
            bodyText =
                "The Volaso 5T ensures that wherever it drives, safety comes first. Every car comes with patented All Round Vision (ARV) cameras, 360+ degrees and realtime AI tracking.";
            break;
        case "vctrAllWeather":
            headingText = "Any Weather, Any Urban Envrionment";
            bodyText =
                "Rain, shine, indoors and out - Volaso 5T gets there, whereever there is. For larger campuses, add the Volaso self charging station system to ensure that your vehicles never run out of battery";
            break;
        }

        $w("#headingDynamic").text = headingText;
        $w("#txtDynamic").text = bodyText;
        $w("#boxDynamicText").show("fade", { duration: 300 });
    });

    $w("#vctrAllWeather, #vctrCameras, #vctrBody").onMouseOut((event) => {
        $w("#boxDynamicText").hide("fade", { duration: 300 });
    });
});

async function getCars() {
    console.info("Getting car details...")
    try {
        const carsGalleryItems = await GetCarData()
        $w("#rptrGallery").data = carsGalleryItems
        $w("#rptrGallery").onItemReady(($item, itemData, index) => {
            $item("#repeaterHeading").text = itemData.vehicleTitle
            $item("#repeaterText").text = itemData.description
            $item("#repeaterImage").src = itemData.mainImage
            if (!itemData.available) {
                $item("#boxComingSoon").expand()
            }
        });
        console.info("Items added to gallery:", carsGalleryItems)
    } catch (error) {
        console.log(error)
    }

}