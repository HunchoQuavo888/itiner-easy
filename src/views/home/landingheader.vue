<template>
    <section class="bg-gradient-to-b from-blue-200 to-base-100 dark:bg-gray-900">
    <div class="grid w-screen px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-8">
            <h1 class="max-w-3xl mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-blue-600">Welcome to Itiner-easy.</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                <div class="font-extrabold text-3xl  [text-wrap:balance] bg-clip-text text-transparent bg-slate-800">
                    Want to go to anywhere in 
                    <span class="text-indigo-600 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                        <ul class="block animate-text-slide text-left leading-tight [&_li]:block">
                            <li>Asia<span class="text-black">?</span></li>
                            <li>Africa <span class="text-black">?</span></li>
                            <li>America <span class="text-black">?</span></li>
                            <li>Europe <span class="text-black">?</span></li>
                            <li>Oceania <span class="text-black">?</span></li>
                            <li aria-hidden="true">Asia</li>
                        </ul>
                    </span>
                    <span><h2 class="text-2xl">We've got you covered.</h2></span>
                </div>
            </p>
    
        </div>
        <div class="hidden lg:mt-0 lg:col-span-4 lg:flex">
            <img src="../../assets/landingheader/journey.svg" class="h-96 w-auto">
        </div>                
    </div>
</section>
    <!-- <header class="bg-gradient-to-b from-blue-200 to-base-100">
      <div class="text-center">
        <div class="container px-4 mx-auto">
          <div class="max-w-4xl mx-auto text-center">
            <span class="font-semibold text-blue-600 uppercase tracking-widest">TRAVELLING MADE EASY</span>
            <h2 class="mt-8 mb-6 text-4xl lg:text-5xl font-bold text-blue-600">Welcome to Itiner-easy!</h2>
            <div class="text-center relative flex flex-col justify-center">
                <div class="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-slate-800">Want to go to anywhere in 
                    <span class="text-indigo-600 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                        <ul class="block animate-text-slide text-left leading-tight [&_li]:block">
                            <li>Asia<span class="text-black">?</span></li>
                            <li>Africa <span class="text-black">?</span></li>
                            <li>America <span class="text-black">?</span></li>
                            <li>Europe <span class="text-black">?</span></li>
                            <li>Oceania <span class="text-black">?</span></li>
                            <li aria-hidden="true">Asia</li>
                        </ul>
                    </span>
                </div>
                <div class="text-3xl mt-10">
                    <h2>We got you.</h2>
                </div>
            </div>
        </div>
    </div>
    </div>

     
</header> -->


    <!-- <body> -->
        <!-- <section>
        <div id="content" class=" h-96 flex flex-col justify-center text-center font-inter antialiased">
        <div class="justify-center flex left-24 z-20 drop-shadow-md text-white">
            
        </div>
        <div class="w-full mt-20 max-w-6xl grid grid-cols-1 md:grid-cols-3 mx-auto px-4 md:px-6 py-24">
            <div class="image items-center md:col-span-1">
                <img src="../../assets/landingheader/journey.svg">
            </div>
            <div class="text-center relative flex flex-col justify-center md:col-span-2">
                    <div class="absolute top-13 bottom-96 left-36 w-24 h-24 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>
                    <div class="absolute top-20 bottom-48 left-48 w-24 h-24 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-4000"></div>
                    <div class="absolute top-20 bottom-96 left-72 w-24 h-24 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>
                <div class="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-slate-800">Want to go to anywhere in 
                    <span class="text-indigo-600 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                        <ul class="block animate-text-slide text-left leading-tight [&_li]:block">
                            <li>Asia<span class="text-black">?</span></li>
                            <li>Africa <span class="text-black">?</span></li>
                            <li>America <span class="text-black">?</span></li>
                            <li>Europe <span class="text-black">?</span></li>
                            <li>Oceania <span class="text-black">?</span></li>
                            <li aria-hidden="true">Asia</li>
                        </ul>
                    </span>
                </div>
                <div class="text-3xl mt-10">
                    <h2>We got you.</h2>
                </div>
            </div>
        </div>
    </div>
    </section> 
    </body> -->
</template>

<style scoped>
/* body{
    margin:0;
    padding:0;
}

@media (min-width: 1024px) {
    section{
    position:relative;
    width:100%;
    height:80vh;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
}

section:before{
    content:'';
    position:absolute;
    top:0;
    bottom:0;
    width:100%;
    height:80%;
    background: linear-gradient(180deg,#bfdbfe,#bae6fd,#bfdbfe);
    border-radius: 0 0 50% 70%/0 0 100% 100%;
    transform:scaleX(1.5);
    transform:rotateX('30deg')
}
}

#content{
    position:relative;
    z-index:1;
    margin: 0 auto;
    max-width: 900px;
    text-align: center;
    bottom:30px
}

@media (max-width: 768px) {
    section{
    position:relative;
    width:100%;
    height:fit-content;
    display:flex;
    background: linear-gradient(180deg,#bfdbfe,#bae6fd,#bfdbfe);
    border-radius: 0 0 0 0/0 0 0 0;

}
    section:before{
    content:'';
    position:absolute;
}
} */
</style>