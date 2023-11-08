<script>
export default {
    props: {
        city: {
            type: String,
            required: true,
        },
        peopleontrip: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            possiblePhotos: [],
        }
    },
    methods:{
        deleteTrip(){
            this.$emit("deletetrip")
        },
        goToTrip(){
            this.$emit("gototrip")
        },
        async titlephotogenerator(town) {
        // get photos of town using Google Place Photos API
        let townsearched = town;
        let request = {
            query: townsearched,
            fields: ['photos'],
        };
        let service = new google.maps.places.PlacesService(document.createElement('div'));

        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
            let place = results[0];
            let photos = place.photos;
            if (!photos) {
                return;
            }
            let photoUrls = photos.map(photo => photo.getUrl({ maxWidth: 1280, maxHeight: 853 }));
            this.possiblePhotos = photoUrls;
        }
    });
    },
},
    mounted() {
        this.titlephotogenerator(this.city);
    },
}

</script>

<template>
      <div class="bg-white justify-center p-5 snap-always snap-center text-center rounded-lg flex-none shadow-lg">
        <div class="image justify-center flex">
            <img class="w-56 md:w-64 h-56 md:h-64 "
          :src="possiblePhotos[0]">
        </div>
        
        <h2 class="text-xl m-2">{{city}}</h2>
        <h3 class="text-base">{{peopleontrip}}</h3>
        <div class="justify-center flex">
            <button class="btn btn-neutral ml-7 p-2 text-white btn-xs hover:shadow-lg sm:btn-sm md:btn-md"
          @click="goToTrip()">Go
          to Trip</button>
        <button class="btn btn-neutral ml-7 p-2 text-white btn-xs hover:shadow-lg sm:btn-sm md:btn-md"
          @click="deleteTrip()">Delete Trip</button>
        </div>

      </div>
</template>
