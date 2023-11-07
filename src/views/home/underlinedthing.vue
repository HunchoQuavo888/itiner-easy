<template>
    <body>
        <div class="bg-base-100 h-auto p-3">
        <div id="greeting" class="text-4xl"><h1 class="text-4xl">What we can do for you</h1></div>
        </div>
    </body>
    <div class="bg-base-100">
    </div>
</template>

<script>
</script>

<style scoped>
body{
    display: grid;
    place-items:center;
    height:auto
}

#greeting{
    position:relative;
}
#greeting::after{
    content:'';
    width:100%;
    height:5px;
    background-image:url('../../assets/landingheader/pngegg.png');
    background-position: center;
    position:absolute;
    bottom:1;
    left:0;
}
</style>