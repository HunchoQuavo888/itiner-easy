<template>
    <div class="card w-96 bg-blue-300">
  <figure class="px-10 pt-10">
    <img src="{{  }}" alt="">
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">{{ restaurantname }}</h2>
    <h3>{{restaurantaddress}}</h3>
    <div>
        <div>
        {{ dollarSigns(pricelevel) }}
        </div>
        <div>
        {{ ratingStars(rating) }}
        </div>
    </div>
    <div class="card-actions flex justify-center">
        <button class="btn" @click="showLocation(eatery,eatery)">Where is it?</button>
        <button class="btn" @click="displaydirectionsonmap(eateryOrigin, eateryDestination)">How do I get there?</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: {
        showLocation: {
            type: Function,
            required: true,
        },
        displaydirectionsonmap: {
            type: Function,
            required: true,
        },
        eatery: {
            type: Object,
            required: true,
        },
        eateryOrigin: {
            type: Object,
            required: true,
        },
        eateryDestination: {
            type: Object,
            required: true,
        },
        restaurantname: {
            type: String,
            required: true,
        },
        restaurantaddress: {
            type: String,
            required: true,
        },
        pricelevel: {
            type: Number,
            required: false,
        },
        rating:{
            type: Number,
            required: true,
        }, 


    },
    methods:{
        dollarSigns(priceLevel) {
            if (priceLevel>0){
                return '💰'.repeat(parseInt(priceLevel));
            }
            else{
                return '💰'
            } 
        },
        ratingStars(rating) {
          return '⭐'.repeat(parseInt(rating)) + '☆'.repeat(5-parseInt(rating));
        }
    }

};
</script>