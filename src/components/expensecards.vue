<script>
export default {
    props: {
        itemDesc: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        TransfereeName: {
            type: String,
            required: true,
        },
        ExpenseType: {
           type:String,
           required:true,
        }
    },
    methods:{
        deletetrip(){
            this.$emit("button-clicked")
        }
    }

};
</script>

<template>
    <div class="card bg-white rounded-md mt-3 ml-3 mr-3 gap-1 grid grid-cols-12">
              <!-- icon -->
              <div class="rectangle col-span-1 flex w-10 bg-gray-300 h-10 rounded-lg justify-center items-center">
                <img class="w-7 h-auto" src="../assets/expenses/food.png" v-if="ExpenseType=='Food and Drinks'">
                <img class="w-7 h-auto" src="../assets/expenses/accomodation.png" v-if="ExpenseType=='Accomodation'">
                <img class="w-7 h-auto" src="../assets/expenses/activities.png" v-if="ExpenseType=='Activities'">
                <img class="w-7 h-auto" src="../assets/expenses/attractions.png" v-if="ExpenseType=='Attractions'">
                <img class="w-7 h-auto" src="../assets/expenses/flighttickets.png" v-if="ExpenseType=='Flight'">
                <img class="w-7 h-auto" src="../assets/expenses/transport.png" v-if="ExpenseType=='Transportation'">
                <img class="w-7 h-auto" src="../assets/expenses/groceries.png" v-if="ExpenseType=='Groceries'">
                <img class="w-7 h-auto" src="../assets/expenses/others.png" v-if="ExpenseType=='Miscellaneous'">
              </div>
              <!-- description -->
              <div class=" col-span-5 flex justify-center items-center">
                <h2 class="text-xl">{{itemDesc}}</h2>
              </div>
              <div class="col-span-4">
                <div class="subheader">
                  <h2 class="text-lg">${{price}}</h2>
                  <h3 class="text-sm">Paid by {{TransfereeName}}</h3>
                </div>
              </div>
              
              
              
                <div class="flex justify-right items-right col-span-1">
                  <button class="btn" @click="deletetrip">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                  </button>
                </div>
              </div>

</template>