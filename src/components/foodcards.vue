<template>
    <div class="card w-96 bg-base-100 shadow-xl">
  <figure class="px-10 pt-10">
    <img src={{link}} class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">{{ restaurantname }}</h2>
    <h3>{{restaurantaddress}}</h3>
    <div class="grid grid-cols-2">
        <div class="leftcol">
        {{ dollarSigns(priceLevel) }}
        </div>
        <div class="rightcol">
        {{ ratingStars(rating) }}
        </div>
    </div>
    <div class="card-actions">
      <button class="btn btn-primary">Getting there</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: {
        link: {
            type: String,
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
            required: true,
        },
        rating:{
            type: Number,
            required: true,
        }
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
          return '⭐'.repeat(parseInt(rating));
        }
    }

};
</script>